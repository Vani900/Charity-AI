/**
 * seed.js — Pre-test user seeder for CharityAI Selenium Suite
 *
 * Seeds donor, NGO, and admin test accounts directly via the backend REST API
 * BEFORE the browser tests run. This avoids UI form brittleness entirely.
 */

'use strict';

const http = require('http');
const config = require('./config');

// Backend API base (strip /api if already in base, always use port 5000)
const API_BASE = 'http://localhost:5000/api';

/**
 * Make an HTTP POST request with JSON body.
 * Returns { ok, status, body }
 */
function httpPost(url, data) {
  return new Promise((resolve) => {
    const body = JSON.stringify(data);
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => (responseBody += chunk));
      res.on('end', () => {
        resolve({ ok: res.statusCode < 400, status: res.statusCode, body: responseBody });
      });
    });

    req.on('error', (e) => {
      resolve({ ok: false, status: 0, body: e.message });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ ok: false, status: 0, body: 'Request timed out' });
    });

    req.write(body);
    req.end();
  });
}

/**
 * Attempt to register one user. Ignores "already exists" (duplicate) errors.
 */
async function seedUser({ name, email, password, phone, address, role }) {
  const result = await httpPost(`${API_BASE}/auth/register`, {
    name, email, password, phone, address, role,
  });

  if (result.ok) {
    console.log(`   ✅ Seeded: ${role} <${email}>`);
    return true;
  }

  // Parse response to check for duplicate
  let parsed;
  try { parsed = JSON.parse(result.body); } catch { parsed = { message: result.body }; }

  const msg = (parsed.message || '').toLowerCase();
  if (result.status === 409 || msg.includes('already') || msg.includes('duplicate') || msg.includes('exists')) {
    console.log(`   ℹ️  Already exists: ${role} <${email}> — OK`);
    return true;
  }

  console.warn(`   ⚠️  Could not seed ${role} <${email}>: HTTP ${result.status} — ${parsed.message || result.body}`);
  return false;
}

/**
 * Seed all three test users. Called once before the Selenium tests begin.
 */
async function seedAllUsers() {
  console.log('\n📦 Seeding test users via backend API...');

  const users = [
    {
      name: config.DONOR_NAME,
      email: config.DONOR_EMAIL,
      password: config.DONOR_PASSWORD,
      phone: '9876543210',
      address: 'Chennai, Tamil Nadu',
      role: 'donor',
    },
    {
      name: config.NGO_NAME,
      email: config.NGO_EMAIL,
      password: config.NGO_PASSWORD,
      phone: '9876599999',
      address: 'Mumbai, Maharashtra',
      role: 'ngo',
    },
    {
      name: 'Admin User',
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASSWORD,
      phone: '9000000001',
      address: 'Bangalore, Karnataka',
      role: 'admin',
    },
  ];

  let allOk = true;
  for (const user of users) {
    const ok = await seedUser(user);
    if (!ok) allOk = false;
  }

  if (allOk) {
    console.log('   ✅ All test users ready.\n');
  } else {
    console.log('   ⚠️  Some users could not be seeded — tests may still work if accounts already exist.\n');
  }

  return allOk;
}

module.exports = { seedAllUsers };

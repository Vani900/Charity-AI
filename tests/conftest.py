"""
conftest.py – Shared fixtures for CharityAI Selenium E2E Tests
"""

import pytest
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

from utils.reporter import TestReporter

# ─── Global Settings ────────────────────────────────────────────
BASE_URL = "http://localhost:5173"

# Shared test credentials
DONOR_EMAIL    = "selenium_donor@charityai.test"
DONOR_PASSWORD = "Test@1234"
DONOR_NAME     = "Selenium Donor"

NGO_EMAIL      = "selenium_ngo@charityai.test"
NGO_PASSWORD   = "Test@1234"
NGO_NAME       = "Selenium NGO"

ADMIN_EMAIL    = "admin@charityai.test"
ADMIN_PASSWORD = "Admin@1234"

# ─── Fixtures ───────────────────────────────────────────────────

@pytest.fixture(scope="session")
def reporter():
    """Session-level reporter – one Excel file per full test run."""
    r = TestReporter()
    yield r
    r.save()

@pytest.fixture(scope="session")
def driver():
    """Session-level Chrome WebDriver (headless option available)."""
    chrome_options = Options()
    # Uncomment below line to run headless (no browser window)
    # chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1440,900")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])

    drv = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()),
        options=chrome_options,
    )
    drv.implicitly_wait(8)
    drv.set_page_load_timeout(30)
    yield drv
    drv.quit()

@pytest.fixture(autouse=True)
def slow_down():
    """Small pause between steps for visual clarity."""
    yield
    time.sleep(0.4)

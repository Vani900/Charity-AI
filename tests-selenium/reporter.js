/**
 * reporter.js — Excel Report Generator for CharityAI Selenium E2E Suite
 *
 * Generates a multi-sheet Excel workbook containing:
 *  - Sheet 1: Executive Summary (KPIs, module breakdown, pie chart data)
 *  - Sheet 2: Detailed Test Results (all test records with colour coding)
 *  - Sheet 3: Failed Tests Only (quick failure analysis)
 *  - Sheet 4: Performance Analysis (execution time breakdown by module)
 */

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, 'results');
const SCREENSHOTS_DIR = path.join(RESULTS_DIR, 'screenshots');

if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// ─── Colour Palette (ARGB) ────────────────────────────────────────────────
const C = {
  HEADER_BG:    'FF0F2942',
  HEADER_FG:    'FFFFFFFF',
  ACCENT_BLUE:  'FF1B6CA8',
  PASS_BG:      'FFDCFCE7',
  PASS_FG:      'FF15803D',
  FAIL_BG:      'FFFEE2E2',
  FAIL_FG:      'FFB91C1C',
  SKIP_BG:      'FFFEF9C3',
  SKIP_FG:      'FF92400E',
  ALT_ROW:      'FFF0F6FF',
  SECTION_BG:   'FFEEF3FB',
  WHITE:        'FFFFFFFF',
  BORDER:       'FFD0D7DE',
  GOLD:         'FFCA8A04',
};

const THIN_BORDER = {
  top:    { style: 'thin', color: { argb: C.BORDER } },
  left:   { style: 'thin', color: { argb: C.BORDER } },
  bottom: { style: 'thin', color: { argb: C.BORDER } },
  right:  { style: 'thin', color: { argb: C.BORDER } },
};

const MEDIUM_BORDER = {
  top:    { style: 'medium', color: { argb: C.HEADER_BG } },
  left:   { style: 'medium', color: { argb: C.HEADER_BG } },
  bottom: { style: 'medium', color: { argb: C.HEADER_BG } },
  right:  { style: 'medium', color: { argb: C.HEADER_BG } },
};

const MODULE_COLORS = {
  Auth:          'FFEDE9FE',
  Donor:         'FFDBEAFE',
  NGO:           'FFD1FAE5',
  Admin:         'FFFEE2E2',
  'Edge Cases':  'FFFCE7F3',
};

const MODULES = ['Auth', 'Donor', 'NGO', 'Admin', 'Edge Cases'];

// ─── Helper: Style a header row cell ────────────────────────────────────

function styleHeader(cell, text, { bgColor = C.HEADER_BG, fgColor = C.HEADER_FG, size = 10, align = 'center' } = {}) {
  cell.value = text;
  cell.font = { name: 'Calibri', bold: true, size, color: { argb: fgColor } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };
  cell.alignment = { horizontal: align, vertical: 'middle', wrapText: true };
  cell.border = THIN_BORDER;
}

function styleDataCell(cell, value, {
  bgColor = C.WHITE,
  fgColor = 'FF1A1A2E',
  align = 'left',
  bold = false,
  size = 9,
  wrap = true,
} = {}) {
  cell.value = value;
  cell.font = { name: 'Calibri', bold, size, color: { argb: fgColor } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };
  cell.alignment = { horizontal: align, vertical: 'middle', wrapText: wrap };
  cell.border = THIN_BORDER;
}

// ─── Main Reporter Class ─────────────────────────────────────────────────

class SeleniumReporter {
  constructor() {
    this.records = [];
    this.suiteStartTime = Date.now();
    this._idCounter = 1;

    const ts = new Date()
      .toISOString()
      .replace(/T/, '_')
      .replace(/\..+/, '')
      .replace(/:/g, '');

    this.outputPath = path.join(RESULTS_DIR, `CharityAI_Selenium_Report_${ts}.xlsx`);
    this.latestPath = path.join(RESULTS_DIR, 'CharityAI_Selenium_Report_Latest.xlsx');
  }

  /**
   * Record a test execution result.
   *
   * @param {string} module        - Module name (Auth|Donor|NGO|Admin|Edge Cases)
   * @param {string} flowStep      - Sub-flow step name
   * @param {string} testName      - Short name for the test case
   * @param {string} description   - Detailed test description
   * @param {string} expected      - Expected outcome
   * @param {string} actual        - Actual outcome or error message
   * @param {'PASS'|'FAIL'|'SKIP'} status
   * @param {number} duration      - Duration in seconds
   * @param {string} [error='']    - Error message if FAIL
   * @param {string} [screenshot=''] - Absolute path to failure screenshot
   */
  record(module, flowStep, testName, description, expected, actual, status, duration, error = '', screenshot = '') {
    const testId = `SEL-${String(this._idCounter++).padStart(3, '0')}`;
    this.records.push({
      testId,
      module,
      flowStep,
      testName,
      description,
      expected,
      actual,
      status: status.toUpperCase(),
      duration: parseFloat(duration.toFixed(2)),
      error,
      screenshot: screenshot ? path.relative(RESULTS_DIR, screenshot) : '',
      timestamp: new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
    });
  }

  // ─── Public: Save Workbook ──────────────────────────────────────────────

  async save() {
    const wb = new ExcelJS.Workbook();
    wb.creator = 'CharityAI Selenium Suite';
    wb.created = new Date();
    wb.modified = new Date();

    this._buildSummarySheet(wb);
    this._buildDetailsSheet(wb);
    this._buildFailuresSheet(wb);
    this._buildPerformanceSheet(wb);

    await wb.xlsx.writeFile(this.outputPath);
    await wb.xlsx.writeFile(this.latestPath);

    console.log('\n\x1b[32m✅ Excel Report Generated Successfully!\x1b[0m');
    console.log(`   📁 Timestamped : ${this.outputPath}`);
    console.log(`   📁 Latest Link : ${this.latestPath}\n`);

    return this.outputPath;
  }

  // ─── Sheet 1: Executive Summary ─────────────────────────────────────────

  _buildSummarySheet(wb) {
    const ws = wb.addWorksheet('📊 Executive Summary');
    ws.views = [{ showGridLines: false }];

    const total   = this.records.length;
    const passed  = this.records.filter(r => r.status === 'PASS').length;
    const failed  = this.records.filter(r => r.status === 'FAIL').length;
    const skipped = this.records.filter(r => r.status === 'SKIP').length;
    const passRate = total ? ((passed / total) * 100).toFixed(1) : '0.0';
    const totalDuration = this.records.reduce((s, r) => s + r.duration, 0).toFixed(1);
    const wallTime = ((Date.now() - this.suiteStartTime) / 1000).toFixed(1);

    const runDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    // Column widths
    ['A','B','C','D','E','F','G','H','I','J','K'].forEach((col, i) => {
      ws.getColumn(col).width = [3,20,3,20,3,20,3,20,3,20,3][i];
    });

    // ── Title Banner ─────────────────────────────────────────────────────
    ws.mergeCells('B2:J2');
    const title = ws.getCell('B2');
    title.value = '🌟 CharityAI — Selenium WebDriver End-to-End Test Report';
    title.font = { name: 'Calibri', bold: true, size: 20, color: { argb: C.HEADER_FG } };
    title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.HEADER_BG } };
    title.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(2).height = 46;

    ws.mergeCells('B3:J3');
    const sub = ws.getCell('B3');
    sub.value = `Generated: ${runDate}   |   Framework: Selenium WebDriver 4.x (Node.js)   |   App: http://localhost:5173   |   Total Wall-Time: ${wallTime}s`;
    sub.font = { name: 'Calibri', italic: true, size: 10, color: { argb: 'FF555555' } };
    sub.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.SECTION_BG } };
    sub.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(3).height = 22;

    // ── KPI Cards Row ────────────────────────────────────────────────────
    ws.getRow(5).height = 20;
    ws.getRow(6).height = 40;

    const kpis = [
      { col: 'B', label: '📋 Total Tests',  val: total,       bg: 'FFDBEAFE', fg: C.ACCENT_BLUE },
      { col: 'D', label: '✅ Passed',       val: passed,      bg: C.PASS_BG,  fg: C.PASS_FG },
      { col: 'F', label: '❌ Failed',       val: failed,      bg: C.FAIL_BG,  fg: C.FAIL_FG },
      { col: 'H', label: '⏭️ Skipped',      val: skipped,     bg: C.SKIP_BG,  fg: C.SKIP_FG },
      { col: 'J', label: '📈 Pass Rate',    val: `${passRate}%`, bg: 'FFDCFCE7', fg: C.PASS_FG },
    ];

    kpis.forEach(kpi => {
      const lbl = ws.getCell(`${kpi.col}5`);
      lbl.value = kpi.label;
      lbl.font = { name: 'Calibri', bold: true, size: 10, color: { argb: kpi.fg } };
      lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: kpi.bg } };
      lbl.alignment = { horizontal: 'center', vertical: 'bottom' };
      lbl.border = MEDIUM_BORDER;

      const val = ws.getCell(`${kpi.col}6`);
      val.value = kpi.val;
      val.font = { name: 'Calibri', bold: true, size: 24, color: { argb: kpi.fg } };
      val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: kpi.bg } };
      val.alignment = { horizontal: 'center', vertical: 'middle' };
      val.border = MEDIUM_BORDER;
    });

    // Additional metrics row
    ws.getRow(8).height = 28;
    ws.mergeCells('B8:J8');
    const metricsCell = ws.getCell('B8');
    metricsCell.value = `⏱️ Total Test Duration: ${totalDuration}s   |   Avg per Test: ${total ? (totalDuration / total).toFixed(2) : '0'}s   |   Suite Wall-Time: ${wallTime}s`;
    metricsCell.font = { name: 'Calibri', bold: false, size: 11, color: { argb: C.ACCENT_BLUE } };
    metricsCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F6FF' } };
    metricsCell.alignment = { horizontal: 'center', vertical: 'middle' };
    metricsCell.border = THIN_BORDER;

    // ── Module Breakdown Table ────────────────────────────────────────────
    ws.getRow(10).height = 22;
    const modTableHeaders = ['Module', 'Total', '✅ Pass', '❌ Fail', '⏭ Skip', 'Pass Rate', 'Avg Duration (s)'];
    modTableHeaders.forEach((h, idx) => {
      styleHeader(ws.getCell(10, idx + 2), h, { size: 10 });
    });

    let curRow = 11;
    MODULES.forEach(mod => {
      const recs = this.records.filter(r => r.module === mod);
      if (!recs.length) return;

      const mPass  = recs.filter(r => r.status === 'PASS').length;
      const mFail  = recs.filter(r => r.status === 'FAIL').length;
      const mSkip  = recs.filter(r => r.status === 'SKIP').length;
      const mRate  = ((mPass / recs.length) * 100).toFixed(1);
      const mAvg   = (recs.reduce((s, r) => s + r.duration, 0) / recs.length).toFixed(2);
      const bg     = MODULE_COLORS[mod] || C.WHITE;

      ws.getRow(curRow).height = 22;
      const rowData = [mod, recs.length, mPass, mFail, mSkip, `${mRate}%`, mAvg];
      rowData.forEach((val, idx) => {
        const cell = ws.getCell(curRow, idx + 2);
        styleDataCell(cell, val, { bgColor: bg, align: 'center', bold: idx === 0, size: 10 });
      });
      curRow++;
    });

    // ── Legend ────────────────────────────────────────────────────────────
    curRow += 2;
    ws.getRow(curRow).height = 20;
    ws.getCell(`B${curRow}`).value = 'Status Legend';
    ws.getCell(`B${curRow}`).font = { name: 'Calibri', bold: true, size: 11, color: { argb: C.HEADER_BG } };
    curRow++;

    [
      { lbl: 'PASS — Test executed and verified successfully',   bg: C.PASS_BG, fg: C.PASS_FG },
      { lbl: 'FAIL — Test assertion failed or element not found', bg: C.FAIL_BG, fg: C.FAIL_FG },
      { lbl: 'SKIP — Test skipped (marked or dependency issue)', bg: C.SKIP_BG, fg: C.SKIP_FG },
    ].forEach(leg => {
      const cell = ws.getCell(`B${curRow}`);
      styleDataCell(cell, leg.lbl, { bgColor: leg.bg, fgColor: leg.fg, bold: true, size: 9 });
      ws.getRow(curRow).height = 18;
      curRow++;
    });
  }

  // ─── Sheet 2: Detailed Test Results ─────────────────────────────────────

  _buildDetailsSheet(wb) {
    const ws = wb.addWorksheet('📋 Test Details');
    ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 1, showGridLines: false }];

    const columns = [
      { header: 'Test ID',       key: 'testId',      width: 10 },
      { header: 'Module',        key: 'module',      width: 13 },
      { header: 'Flow Step',     key: 'flowStep',    width: 26 },
      { header: 'Test Name',     key: 'testName',    width: 32 },
      { header: 'Description',   key: 'description', width: 48 },
      { header: 'Expected',      key: 'expected',    width: 40 },
      { header: 'Actual Result', key: 'actual',      width: 40 },
      { header: 'Status',        key: 'status',      width: 10 },
      { header: 'Duration (s)',  key: 'duration',    width: 13 },
      { header: 'Error / Notes', key: 'error',       width: 42 },
      { header: 'Screenshot',    key: 'screenshot',  width: 28 },
      { header: 'Timestamp',     key: 'timestamp',   width: 22 },
    ];

    ws.columns = columns;
    ws.getRow(1).height = 28;
    ws.getRow(1).eachCell(cell => {
      styleHeader(cell, cell.value, { size: 10 });
    });

    this.records.forEach((rec, index) => {
      const rowIndex = index + 2;
      const row = ws.getRow(rowIndex);
      row.height = 34;

      let rowBg = rowIndex % 2 === 0 ? C.ALT_ROW : C.WHITE;
      if (rec.status === 'FAIL') rowBg = C.FAIL_BG;
      if (rec.status === 'SKIP') rowBg = C.SKIP_BG;

      columns.forEach((col, ci) => {
        const cell = row.getCell(ci + 1);
        const centered = ['testId','module','status','duration','timestamp'].includes(col.key);

        if (col.key === 'status') {
          const statusBg = rec.status === 'PASS' ? C.PASS_BG : rec.status === 'FAIL' ? C.FAIL_BG : C.SKIP_BG;
          const statusFg = rec.status === 'PASS' ? C.PASS_FG : rec.status === 'FAIL' ? C.FAIL_FG : C.SKIP_FG;
          const icon = rec.status === 'PASS' ? '✅ PASS' : rec.status === 'FAIL' ? '❌ FAIL' : '⏭ SKIP';
          styleDataCell(cell, icon, { bgColor: statusBg, fgColor: statusFg, align: 'center', bold: true, size: 9 });
        } else if (col.key === 'module') {
          const modBg = MODULE_COLORS[rec.module] || C.WHITE;
          styleDataCell(cell, rec[col.key], { bgColor: modBg, align: 'center', bold: true, size: 9 });
        } else if (col.key === 'screenshot' && rec.screenshot) {
          cell.value = {
            text: path.basename(rec.screenshot),
            hyperlink: `./screenshots/${path.basename(rec.screenshot)}`,
          };
          cell.font = { name: 'Calibri', size: 9, color: { argb: 'FF0D6EFD' }, underline: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          cell.border = THIN_BORDER;
        } else {
          styleDataCell(cell, rec[col.key], {
            bgColor: rowBg,
            align: centered ? 'center' : 'left',
            size: 9,
          });
        }
      });
    });

    // Auto-filter on header row
    ws.autoFilter = {
      from: { row: 1, column: 1 },
      to:   { row: 1, column: columns.length },
    };
  }

  // ─── Sheet 3: Failures Only ──────────────────────────────────────────────

  _buildFailuresSheet(wb) {
    const ws = wb.addWorksheet('🔴 Failures');
    ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 2, showGridLines: false }];

    const failures = this.records.filter(r => r.status === 'FAIL');

    // Banner
    ws.mergeCells('A1:H1');
    const banner = ws.getCell('A1');
    banner.value = `❌ Failed Tests — ${failures.length} Failure(s) Detected`;
    banner.font = { name: 'Calibri', bold: true, size: 14, color: { argb: C.HEADER_FG } };
    banner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB91C1C' } };
    banner.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(1).height = 32;

    if (failures.length === 0) {
      ws.mergeCells('A3:H3');
      const noFail = ws.getCell('A3');
      noFail.value = '🎉 All tests passed! No failures recorded.';
      noFail.font = { name: 'Calibri', bold: true, size: 14, color: { argb: C.PASS_FG } };
      noFail.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.PASS_BG } };
      noFail.alignment = { horizontal: 'center', vertical: 'middle' };
      ws.getRow(3).height = 40;
      return;
    }

    const columns = [
      { header: 'Test ID',      key: 'testId',      width: 10 },
      { header: 'Module',       key: 'module',      width: 14 },
      { header: 'Test Name',    key: 'testName',    width: 32 },
      { header: 'Description',  key: 'description', width: 45 },
      { header: 'Expected',     key: 'expected',    width: 38 },
      { header: 'Error Detail', key: 'error',       width: 55 },
      { header: 'Duration (s)', key: 'duration',    width: 13 },
      { header: 'Screenshot',   key: 'screenshot',  width: 28 },
    ];

    ws.columns = columns;
    ws.getRow(2).height = 26;
    ws.getRow(2).eachCell(cell => {
      styleHeader(cell, cell.value, { bgColor: 'FFB91C1C', size: 10 });
    });

    failures.forEach((rec, index) => {
      const rowIndex = index + 3;
      const row = ws.getRow(rowIndex);
      row.height = 36;

      columns.forEach((col, ci) => {
        const cell = row.getCell(ci + 1);
        if (col.key === 'module') {
          styleDataCell(cell, rec.module, { bgColor: MODULE_COLORS[rec.module] || C.WHITE, bold: true, align: 'center', size: 9 });
        } else if (col.key === 'error') {
          styleDataCell(cell, rec.error, { bgColor: C.FAIL_BG, fgColor: C.FAIL_FG, size: 9, wrap: true });
        } else if (col.key === 'screenshot' && rec.screenshot) {
          cell.value = { text: path.basename(rec.screenshot), hyperlink: `./screenshots/${path.basename(rec.screenshot)}` };
          cell.font = { name: 'Calibri', size: 9, color: { argb: 'FF0D6EFD' }, underline: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.FAIL_BG } };
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
          cell.border = THIN_BORDER;
        } else {
          const centered = ['testId', 'duration'].includes(col.key);
          styleDataCell(cell, rec[col.key], { bgColor: index % 2 === 0 ? C.FAIL_BG : 'FFFEE9E9', align: centered ? 'center' : 'left', size: 9 });
        }
      });
    });

    ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: 2, column: columns.length } };
  }

  // ─── Sheet 4: Performance Analysis ──────────────────────────────────────

  _buildPerformanceSheet(wb) {
    const ws = wb.addWorksheet('⚡ Performance');
    ws.views = [{ showGridLines: false }];

    // Banner
    ws.mergeCells('A1:G1');
    const banner = ws.getCell('A1');
    banner.value = '⚡ Test Execution Performance Analysis';
    banner.font = { name: 'Calibri', bold: true, size: 14, color: { argb: C.HEADER_FG } };
    banner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.HEADER_BG } };
    banner.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(1).height = 32;

    // Column widths
    ['A','B','C','D','E','F','G'].forEach((col, i) => {
      ws.getColumn(col).width = [10,32,14,14,14,14,24][i];
    });

    // Header row
    const perfHeaders = ['Test ID', 'Test Name', 'Module', 'Duration (s)', 'Status', 'Relative Speed', 'Timestamp'];
    ws.getRow(2).height = 24;
    perfHeaders.forEach((h, i) => {
      styleHeader(ws.getCell(2, i + 1), h, { size: 10 });
    });

    // Sort all records by duration descending
    const sorted = [...this.records].sort((a, b) => b.duration - a.duration);
    const maxDur = sorted.length ? sorted[0].duration : 1;

    sorted.forEach((rec, index) => {
      const rowIndex = index + 3;
      const row = ws.getRow(rowIndex);
      row.height = 22;

      const pct = ((rec.duration / maxDur) * 100).toFixed(0);
      const speed = rec.duration < 2 ? '🟢 Fast' : rec.duration < 5 ? '🟡 Medium' : '🔴 Slow';
      const rowData = [
        rec.testId,
        rec.testName,
        rec.module,
        rec.duration,
        rec.status === 'PASS' ? '✅ PASS' : rec.status === 'FAIL' ? '❌ FAIL' : '⏭ SKIP',
        `${speed} (${pct}% of max)`,
        rec.timestamp,
      ];

      const statusFg = rec.status === 'PASS' ? C.PASS_FG : rec.status === 'FAIL' ? C.FAIL_FG : C.SKIP_FG;
      const rowBg = index % 2 === 0 ? C.ALT_ROW : C.WHITE;

      rowData.forEach((val, ci) => {
        const cell = row.getCell(ci + 1);
        const opts = { bgColor: rowBg, align: ci === 0 || ci === 2 || ci === 4 ? 'center' : 'left', size: 9 };
        if (ci === 4) opts.fgColor = statusFg;
        if (ci === 3) opts.bold = true;
        styleDataCell(cell, val, opts);
      });
    });

    // ── Per-Module Performance Summary ────────────────────────────────────
    let summaryRow = sorted.length + 5;
    ws.getRow(summaryRow).height = 24;
    ws.mergeCells(`A${summaryRow}:G${summaryRow}`);
    const sumTitle = ws.getCell(`A${summaryRow}`);
    sumTitle.value = 'Per-Module Performance Summary';
    sumTitle.font = { name: 'Calibri', bold: true, size: 12, color: { argb: C.ACCENT_BLUE } };
    sumTitle.alignment = { horizontal: 'center', vertical: 'middle' };
    sumTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C.SECTION_BG } };
    summaryRow++;

    const modSumHeaders = ['Module', 'Tests', 'Total Duration (s)', 'Avg Duration (s)', 'Min (s)', 'Max (s)', 'Pass Rate'];
    ws.getRow(summaryRow).height = 24;
    modSumHeaders.forEach((h, i) => {
      styleHeader(ws.getCell(summaryRow, i + 1), h, { size: 10 });
    });
    summaryRow++;

    MODULES.forEach(mod => {
      const recs = this.records.filter(r => r.module === mod);
      if (!recs.length) return;

      const total = recs.reduce((s, r) => s + r.duration, 0);
      const avg   = (total / recs.length).toFixed(2);
      const min   = Math.min(...recs.map(r => r.duration)).toFixed(2);
      const max   = Math.max(...recs.map(r => r.duration)).toFixed(2);
      const rate  = `${((recs.filter(r => r.status === 'PASS').length / recs.length) * 100).toFixed(1)}%`;

      const rowData = [mod, recs.length, total.toFixed(2), avg, min, max, rate];
      const bg = MODULE_COLORS[mod] || C.WHITE;
      ws.getRow(summaryRow).height = 22;
      rowData.forEach((val, i) => {
        styleDataCell(ws.getCell(summaryRow, i + 1), val, { bgColor: bg, align: 'center', bold: i === 0, size: 9 });
      });
      summaryRow++;
    });
  }
}

module.exports = SeleniumReporter;

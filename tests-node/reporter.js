const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, 'results');
const SCREENSHOTS_DIR = path.join(RESULTS_DIR, 'screenshots');

// Ensure directories exist
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Color Constants (ARGB format for exceljs: AARRGGBB)
const C_HEADER_BG = 'FF1E3A5F';   // Dark Navy
const C_HEADER_FG = 'FFFFFFFF';   // White
const C_PASS_BG   = 'FFDCFCE7';   // Light green
const C_PASS_FG   = 'FF166534';   // Dark green
const C_FAIL_BG   = 'FFFEE2E2';   // Light red
const C_FAIL_FG   = 'FF991B1B';   // Dark red
const C_SKIP_BG   = 'FFFEF3C7';   // Light amber
const C_SKIP_FG   = 'FF92400E';   // Dark amber
const C_ROW_ALT   = 'FFF0F6FF';   // Alternating light blue tint

const MODULE_COLORS = {
  Auth:  'FFEDE9FE',
  Donor: 'FFDBEAFE',
  NGO:   'FFD1FAE5',
  Admin: 'FFFEE2E2',
  'Edge Cases': 'FFFCE7F3'
};

const BORDER_COLOR = 'FFD0D7DE';
const THIN_BORDER = {
  top: { style: 'thin', color: { argb: BORDER_COLOR } },
  left: { style: 'thin', color: { argb: BORDER_COLOR } },
  bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
  right: { style: 'thin', color: { argb: BORDER_COLOR } }
};

class TestReporter {
  constructor() {
    this.records = [];
    this.counter = 1;
    const ts = new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '');
    this.outputPath = path.join(RESULTS_DIR, `CharityAI_TestReport_Node_${ts}.xlsx`);
    this.latestPath = path.join(RESULTS_DIR, `CharityAI_TestReport_Node.xlsx`);
  }

  /**
   * Record a test result
   * @param {string} module 
   * @param {string} flowStep 
   * @param {string} testName 
   * @param {string} description 
   * @param {string} expected 
   * @param {string} actual 
   * @param {'PASS'|'FAIL'|'SKIP'} status 
   * @param {number} duration Seconds
   * @param {string} error 
   * @param {string} screenshot Path
   */
  record(module, flowStep, testName, description, expected, actual, status, duration, error = '', screenshot = '') {
    this.records.push({
      testId: `TC-${String(this.counter++).padStart(3, '0')}`,
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
      timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    });
  }

  async save() {
    const wb = new ExcelJS.Workbook();
    
    // 1. Build Summary Sheet
    this._buildSummarySheet(wb);
    
    // 2. Build Details Sheet
    this._buildDetailsSheet(wb);

    // Save specific run file
    await wb.xlsx.writeFile(this.outputPath);
    // Copy/Save as latest file for easy access
    await wb.xlsx.writeFile(this.latestPath);

    console.log(`\n\x1b[32m✅ Excel report generated successfully:\x1b[0m`);
    console.log(`   Detailed Run: ${this.outputPath}`);
    console.log(`   Latest Link : ${this.latestPath}\n`);

    return this.outputPath;
  }

  _buildSummarySheet(wb) {
    const ws = wb.addWorksheet('📊 Summary');
    ws.views = [{ showGridLines: false }];

    const total = this.records.length;
    const passed = this.records.filter(r => r.status === 'PASS').length;
    const failed = this.records.filter(r => r.status === 'FAIL').length;
    const skipped = this.records.filter(r => r.status === 'SKIP').length;
    const passRate = total ? ((passed / total) * 100).toFixed(1) : '0.0';
    const runDate = new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // B2:J2 -> Title Banner
    ws.mergeCells('B2:J2');
    const titleCell = ws.getCell('B2');
    titleCell.value = 'CharityAI — Selenium Node.js End-to-End Test Report';
    titleCell.font = { name: 'Calibri', bold: true, size: 18, color: { argb: C_HEADER_FG } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C_HEADER_BG } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(2).height = 40;

    // B3:J3 -> Metadata Sub-header
    ws.mergeCells('B3:J3');
    const subCell = ws.getCell('B3');
    subCell.value = `Generated: ${runDate}   |   Framework: Selenium WebDriver (Node.js)   |   App: http://localhost:5173`;
    subCell.font = { name: 'Calibri', italic: true, size: 10, color: { argb: 'FF444444' } };
    subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEEF3FB' } };
    subCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(3).height = 20;

    // KPI Cards: B5 (Total), D5 (Passed), F5 (Failed), H5 (Pass Rate)
    const kpis = [
      { col: 'B', label: 'Total Tests', val: total, fg: C_HEADER_BG, bg: 'FFDBEAFE' },
      { col: 'D', label: '✅ Passed', val: passed, fg: C_PASS_FG, bg: C_PASS_BG },
      { col: 'F', label: '❌ Failed', val: failed, fg: C_FAIL_FG, bg: C_FAIL_BG },
      { col: 'H', label: 'Pass Rate', val: `${passRate}%`, fg: 'FF92400E', bg: 'FFFEF3C7' }
    ];

    ws.getRow(5).height = 20;
    ws.getRow(6).height = 28;

    kpis.forEach(kpi => {
      // Label row
      const cellLbl = ws.getCell(`${kpi.col}5`);
      cellLbl.value = kpi.label;
      cellLbl.font = { name: 'Calibri', bold: true, color: { argb: kpi.fg }, size: 10 };
      cellLbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: kpi.bg } };
      cellLbl.alignment = { horizontal: 'center', vertical: 'bottom' };
      cellLbl.border = THIN_BORDER;

      // Value row
      const cellVal = ws.getCell(`${kpi.col}6`);
      cellVal.value = kpi.val;
      cellVal.font = { name: 'Calibri', bold: true, color: { argb: kpi.fg }, size: 20 };
      cellVal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: kpi.bg } };
      cellVal.alignment = { horizontal: 'center', vertical: 'top' };
      cellVal.border = THIN_BORDER;

      // Format column widths for spacing
      ws.getColumn(kpi.col).width = 16;
      // Also set width of columns in-between
      const nextColCharCode = kpi.col.charCodeAt(0) + 1;
      ws.getColumn(String.fromCharCode(nextColCharCode)).width = 4;
    });

    // B8: Section Title
    const sectionTitle = ws.getCell('B8');
    sectionTitle.value = 'Module Breakdown';
    sectionTitle.font = { name: 'Calibri', bold: true, size: 12, color: { argb: C_HEADER_BG } };
    ws.getRow(8).height = 22;

    // B9:G9: Table Headers
    const tableHeaders = ['Module', 'Total Tests', 'Pass', 'Fail', 'Skip', 'Pass Rate'];
    tableHeaders.forEach((h, idx) => {
      const cell = ws.getCell(9, idx + 2); // starts from B (column 2)
      cell.value = h;
      cell.font = { name: 'Calibri', bold: true, color: { argb: C_HEADER_FG }, size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C_HEADER_BG } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = THIN_BORDER;
      ws.getColumn(idx + 2).width = idx === 0 ? 16 : 12;
    });
    ws.getRow(9).height = 24;

    // Calculate per-module stats
    const modules = ['Auth', 'Donor', 'NGO', 'Admin', 'Edge Cases'];
    let curRow = 10;

    modules.forEach(mod => {
      const recs = this.records.filter(r => r.module === mod);
      const modTotal = recs.length;
      if (modTotal === 0) return; // skip module if no tests run
      
      const modPass = recs.filter(r => r.status === 'PASS').length;
      const modFail = recs.filter(r => r.status === 'FAIL').length;
      const modSkip = recs.filter(r => r.status === 'SKIP').length;
      const modRate = modTotal ? ((modPass / modTotal) * 100).toFixed(1) : '0.0';

      const modBg = MODULE_COLORS[mod] || 'FFFFFFFF';
      const rowData = [mod, modTotal, modPass, modFail, modSkip, `${modRate}%`];
      
      ws.getRow(curRow).height = 20;
      rowData.forEach((val, idx) => {
        const cell = ws.getCell(curRow, idx + 2);
        cell.value = val;
        cell.font = { name: 'Calibri', size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: modBg } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = THIN_BORDER;
      });
      curRow++;
    });

    // Add status legend below
    curRow += 2;
    ws.getCell(`B${curRow}`).value = 'Status Legend';
    ws.getCell(`B${curRow}`).font = { name: 'Calibri', bold: true, size: 11, color: { argb: C_HEADER_BG } };
    ws.getRow(curRow).height = 20;
    curRow++;

    const legends = [
      { lbl: 'PASS', bg: C_PASS_BG, fg: C_PASS_FG },
      { lbl: 'FAIL', bg: C_FAIL_BG, fg: C_FAIL_FG },
      { lbl: 'SKIP', bg: C_SKIP_BG, fg: C_SKIP_FG }
    ];

    legends.forEach(leg => {
      const cell = ws.getCell(`B${curRow}`);
      cell.value = leg.lbl;
      cell.font = { name: 'Calibri', bold: true, color: { argb: leg.fg }, size: 9 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: leg.bg } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = THIN_BORDER;
      ws.getRow(curRow).height = 18;
      curRow++;
    });
  }

  _buildDetailsSheet(wb) {
    const ws = wb.addWorksheet('📋 Test Details');
    
    // Freeze the first row and hide grid lines
    ws.views = [{ state: 'frozen', xSplit: 0, ySplit: 1, showGridLines: false }];

    const headers = [
      { header: 'Test ID', key: 'testId', width: 10 },
      { header: 'Module', key: 'module', width: 12 },
      { header: 'Flow Step', key: 'flowStep', width: 24 },
      { header: 'Test Name', key: 'testName', width: 30 },
      { header: 'Description', key: 'description', width: 45 },
      { header: 'Expected Result', key: 'expected', width: 38 },
      { header: 'Actual Result', key: 'actual', width: 38 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Duration (s)', key: 'duration', width: 13 },
      { header: 'Error / Notes', key: 'error', width: 38 },
      { header: 'Screenshot', key: 'screenshot', width: 28 },
      { header: 'Timestamp', key: 'timestamp', width: 20 }
    ];

    ws.columns = headers;
    ws.getRow(1).height = 26;

    // Header styling
    ws.getRow(1).eachCell((cell) => {
      cell.font = { name: 'Calibri', bold: true, color: { argb: C_HEADER_FG }, size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: C_HEADER_BG } };
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = THIN_BORDER;
    });

    // Data rows
    this.records.forEach((record, index) => {
      const rowIndex = index + 2;
      const row = ws.getRow(rowIndex);
      row.height = 32;

      // Color row background depending on status or alternate coloring
      let rowBg = 'FFFFFFFF';
      if (record.status === 'FAIL') {
        rowBg = C_FAIL_BG;
      } else if (record.status === 'SKIP') {
        rowBg = C_SKIP_BG;
      } else if (rowIndex % 2 === 0) {
        rowBg = C_ROW_ALT;
      }

      headers.forEach((h, colIndex) => {
        const cell = row.getCell(colIndex + 1);
        cell.value = record[h.key];
        cell.font = { name: 'Calibri', size: 9 };
        cell.border = THIN_BORDER;
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
        
        // Alignment
        const isCenteredCol = ['testId', 'module', 'status', 'duration', 'timestamp'].includes(h.key);
        cell.alignment = {
          horizontal: isCenteredCol ? 'center' : 'left',
          vertical: 'middle',
          wrapText: true
        };

        // Specific style modifications
        if (h.key === 'status') {
          let fgColor = 'FF000000';
          if (record.status === 'PASS') fgColor = C_PASS_FG;
          if (record.status === 'FAIL') fgColor = C_FAIL_FG;
          if (record.status === 'SKIP') fgColor = C_SKIP_FG;
          
          cell.font = { name: 'Calibri', bold: true, size: 9, color: { argb: fgColor } };
          // Keep background custom status bg
          const statusBg = record.status === 'PASS' ? C_PASS_BG : (record.status === 'FAIL' ? C_FAIL_BG : C_SKIP_BG);
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: statusBg } };
        } else if (h.key === 'module') {
          const modBg = MODULE_COLORS[record.module] || 'FFFFFFFF';
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: modBg } };
          cell.font = { name: 'Calibri', bold: true, size: 9 };
        } else if (h.key === 'screenshot' && record.screenshot) {
          // Add screenshot hyperlink
          cell.value = {
            text: path.basename(record.screenshot),
            hyperlink: `./screenshots/${path.basename(record.screenshot)}`
          };
          cell.font = { name: 'Calibri', size: 9, color: { argb: 'FF0D6EFD' }, underline: true };
        }
      });
    });
  }
}

module.exports = TestReporter;

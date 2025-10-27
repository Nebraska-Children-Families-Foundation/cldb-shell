/**
 * Parse SQL INSERT statements and convert to JSON files
 * This script reads the statewide_plan_data.sql file and extracts data into separate JSON files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SQL_FILE = path.join(__dirname, '../info/statewide_plan_data.sql');
const OUTPUT_DIR = path.join(__dirname, '../src/data/statewide-plan');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read SQL file
const sqlContent = fs.readFileSync(SQL_FILE, 'utf8');

// Parse INSERT statements
function parseInserts(sql) {
  const tables = {};

  // Match INSERT statements with multi-line support
  const insertPattern = /INSERT INTO public\.(\w+)\s*\(([^)]+)\)\s*VALUES\s*(.+?);/gs;

  let match;
  while ((match = insertPattern.exec(sql)) !== null) {
    const tableName = match[1];
    const columns = match[2].split(',').map(c => c.trim());
    const valuesString = match[3];

    // Initialize table if not exists
    if (!tables[tableName]) {
      tables[tableName] = [];
    }

    // Parse VALUES - handle multiple rows
    const valueRows = parseValues(valuesString);

    valueRows.forEach(valueArray => {
      const row = {};
      columns.forEach((col, idx) => {
        row[col] = valueArray[idx];
      });
      tables[tableName].push(row);
    });
  }

  return tables;
}

// Parse VALUES section - handles NULL, quoted strings, UUIDs, numbers, booleans
function parseValues(valuesString) {
  const rows = [];

  // Split by '), (' to get individual rows
  const rowMatches = valuesString.split(/\),\s*\(/);

  rowMatches.forEach(rowStr => {
    // Clean up leading/trailing parentheses
    rowStr = rowStr.replace(/^\(/, '').replace(/\)$/, '').trim();

    const values = [];
    let current = '';
    let inQuote = false;
    let i = 0;

    while (i < rowStr.length) {
      const char = rowStr[i];

      if (char === "'" && (i === 0 || rowStr[i-1] !== '\\')) {
        inQuote = !inQuote;
        current += char;
      } else if (char === ',' && !inQuote) {
        values.push(parseValue(current.trim()));
        current = '';
      } else {
        current += char;
      }

      i++;
    }

    // Push last value
    if (current.trim()) {
      values.push(parseValue(current.trim()));
    }

    if (values.length > 0) {
      rows.push(values);
    }
  });

  return rows;
}

// Parse individual value - converts to appropriate type
function parseValue(valueStr) {
  // NULL
  if (valueStr === 'NULL') {
    return null;
  }

  // Quoted string (remove quotes and unescape)
  if (valueStr.startsWith("'") && valueStr.endsWith("'")) {
    return valueStr.slice(1, -1).replace(/''/g, "'");
  }

  // Boolean
  if (valueStr === 'true') return true;
  if (valueStr === 'false') return false;

  // Number
  if (/^-?\d+$/.test(valueStr)) {
    return parseInt(valueStr, 10);
  }
  if (/^-?\d+\.\d+$/.test(valueStr)) {
    return parseFloat(valueStr);
  }

  // Default: return as string
  return valueStr;
}

// Main execution
console.log('Parsing SQL file...');
const tables = parseInserts(sqlContent);

// List of tables we want to export
const tablesToExport = [
  'goal',
  'objective',
  'strategy',
  'nc_actionstep',
  'community_actionstep',
  'system_partner_commitments',
  'ncff_strategy_priority',
  'collab_strategy_priority',
  'partner_strategy_priority',
  'ncff_team',
  'community_collab',
  'system_partners'
];

// Write JSON files
tablesToExport.forEach(tableName => {
  if (tables[tableName]) {
    const outputFile = path.join(OUTPUT_DIR, `${tableName}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(tables[tableName], null, 2));
    console.log(`✓ Created ${tableName}.json (${tables[tableName].length} records)`);
  } else {
    console.log(`⚠ Table ${tableName} not found in SQL file`);
  }
});

console.log('\nSummary:');
console.log(`Total tables parsed: ${Object.keys(tables).length}`);
Object.entries(tables).forEach(([name, data]) => {
  console.log(`  ${name}: ${data.length} records`);
});

console.log('\n✓ SQL parsing complete!');

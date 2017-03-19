#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sortSchema = require('./sortSchema');

const files = process.argv.slice(2);

files.forEach(fileName => {
  const filePath = path.resolve(fileName);

  try {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileData);
    const sortedSchema = sortSchema(json);
    fs.writeFile(filePath, JSON.stringify(sortedSchema, null, 2));
  }
  catch (err) {
    console.error(`Failed to sort ${fileName}`);
    console.error(err);
  }
});

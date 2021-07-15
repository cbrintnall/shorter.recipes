const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');

const basePackagePath = path.resolve(__dirname, '..', 'package.json');
const functionsPath = path.resolve(__dirname, '..', 'functions');
const copiedPackagePath = path.resolve(functionsPath, 'package.json');

// Create functions dir if doesn't exist yet
if (!fs.existsSync('functions')){
    fs.mkdirSync('functions');
    console.log('Created functions directory')
}

if (!fs.existsSync(copiedPackagePath)) {
    fs.copyFileSync(basePackagePath, copiedPackagePath);
    console.log('Copied package.json')
}

exec('yarn install', { cwd: functionsPath }, err => {
    console.log('Setup done');
    console.log(err)
})
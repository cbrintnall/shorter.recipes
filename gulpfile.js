const { exec, spawn } = require("child_process");
const { parallel } = require("gulp");
const path = require('path');
const chalk = require('chalk');

const frontendFolder = "frontend-src"
const firebaseCommandBase = "firebase"
const frontendCommandBase = "npm"
const outputPadAmount = 20;

const firebaseEmulatorsStart = cb => {
    const emulators = spawn(firebaseCommandBase, [ "emulators:start" ], { shell: true })

    emulators.stdout.on("data", data => {
        console.log(_formatProcessOutput(data, false, firebaseCommandBase));
    })

    emulators.stderr.on("data", data => {
        console.log(_formatProcessOutput(data, true, firebaseCommandBase));
    })

    emulators.on("close", code => {
        console.log(_formatProcessOutput(data, false, firebaseCommandBase));
        cb();
    })

    emulators.on("error", error => {
        cb(new Error(error));
    })
}

const frontendStart = cb => {
    const compiler = spawn(frontendCommandBase, [ "start" ], { shell: true, cwd: path.join(__dirname, frontendFolder) })

    compiler.stdout.on("data", data => {
        console.log(_formatProcessOutput(data, false, frontendCommandBase));
    })

    compiler.stderr.on("data", data => {
        console.info(_formatProcessOutput(data, true, frontendCommandBase));
    })

    compiler.on("close", code => {
        console.log(_formatProcessOutput(data, true, frontendCommandBase));
        cb();
    })

    compiler.on("error", error => {
        cb(new Error(error));
    })
}

const _formatProcessOutput = (data, err = false, who = undefined) => {
    const prefix = !err ? chalk.underline.green("STDOUT") : chalk.bold.redBright("STDERR");
    const whom = who ? ` (${who})` : "";

    return data.toString()
        .split("\n")
        .filter(line => !!line)
        .map(line => `${prefix}${whom}| ${line}`.padStart(outputPadAmount, ' '))
        .join("\n")
}

exports.dev = parallel(frontendStart, firebaseEmulatorsStart)
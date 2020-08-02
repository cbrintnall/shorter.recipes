const { exec, spawn } = require("child_process");
const { parallel, series } = require("gulp");
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

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

const buildFrontend = cb => {
    const compileFrontend = spawn("npm", [ "run", "build" ], { shell: true, cwd: path.join(__dirname, frontendFolder) })

    compileFrontend.stdout.on("data", data => {
        console.log(_formatProcessOutput(data, false, "build"));
    })

    compileFrontend.stderr.on("data", data => {
        console.info(_formatProcessOutput(data, true, "build"));
    })

    compileFrontend.on("close", code => {
        fs.renameSync(path.join(__dirname, frontendFolder, "build"), path.join(__dirname, "build"))
        cb();
    })

    compileFrontend.on("error", error => {
        cb(new Error(error));
    })
}

const firebaseDeploy = cb => {
    const deploy = spawn(firebaseCommandBase, [ "deploy" ], { shell: true })

    deploy.stdout.on("data", data => {
        console.log(_formatProcessOutput(data, false, "build"));
    })

    deploy.stderr.on("data", data => {
        console.info(_formatProcessOutput(data, true, "build"));
    })

    deploy.on("close", code => {
        cb();
    })

    deploy.on("error", error => {
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
exports.build = buildFrontend
exports.deploy = series(buildFrontend, firebaseDeploy)
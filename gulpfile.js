const { spawn, exec } = require("child_process");
const { parallel, series } = require("gulp");
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');

const frontendFolder = "frontend-src"
const firebaseCommandBase = "firebase"
const outputPadAmount = 20;

const firebaseEmulatorsStart = cb => {
    const emulators = spawn(firebaseCommandBase, [ "emulators:start" ], { shell: true })

    process.on('SIGINT', () => {
        emulators.kill()
    })

    emulators.stdout.on("data", data => {
        console.log(_formatProcessOutput(data, false, firebaseCommandBase));
    })

    emulators.stderr.on("data", data => {
        console.log(_formatProcessOutput(data, true, firebaseCommandBase));
    })

    emulators.on("message", msg => console.log(msg))

    emulators.on("close", data => {
        console.log(_formatProcessOutput(data, false, firebaseCommandBase));
        cb();
    })

    emulators.on("error", error => {
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

const _watchCommand = (command, args, cb, options = {}) => {
    const deploy = spawn(command, args, { shell: true })

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

// Must be ran as admin on Windows.
exports.setup = series(
    cb => {
        const basePackagePath = path.resolve(__dirname, 'package.json');
        const functionsPath = path.resolve(__dirname, 'functions');
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

        exec('yarn install', { cwd: path.resolve(__dirname, 'functions') }, err => {
            console.log('Setup done');
            console.log(err)
            cb()
        })
    }
)

exports.dev = parallel(
    cb => _watchCommand("yarn", ["watch:client"], cb),
    cb => _watchCommand("yarn", ["watch:server"], cb),
    firebaseEmulatorsStart
)
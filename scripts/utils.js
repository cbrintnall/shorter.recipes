const { spawn } = require("child_process");
const chalk = require('chalk')

const outputPadAmount = 20;

const watchCommand = (command, args, options = {}) => {
  const deploy = spawn(command, args, { shell: true })

  deploy.stdout.on("data", data => {
      console.log(_formatProcessOutput(data, false, "build"));
  })

  deploy.stderr.on("data", data => {
      console.info(_formatProcessOutput(data, true, "build"));
  })

  deploy.on("close", code => {
  })

  deploy.on("error", error => {
  })

  return deploy;
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

module.exports = {
  watchCommand
}
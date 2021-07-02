const cfg = require('./config.json');
const fs = require('fs');
const path = require('path')
const { execSync } = require('child_process');
const chalk = require('chalk');
const { exit } = require('process');

const [ env, project ] = process.argv.slice(2);

const steps = [
  {
    name: 'Set firebase project',
    step: config => {
      if (!project) {
        throw new Error('No project to deploy to, please pass the project name as the second arg (following the environment)')
      }

      console.log(`Using project ${project}`);

      execSync(`npx firebase use ${project}`);
    }
  },
  {
    name: 'Build client bundle',
    step: config => {
      const serverBuildCommand = config.clientBuild;

      execSync(`yarn ${serverBuildCommand}`)
    }
  },
  {
    name: 'Build server bundle',
    step: config => {
      const serverBuildCommand = config.serverBuild;

      execSync(`yarn ${serverBuildCommand}`)
    }
  },
  {
    name: 'Copy package.json for functions',
    step: config => {
      const filePath = path.resolve(__dirname, '..', 'package.json')
      const desiredPath = path.resolve(__dirname, '..', 'functions', 'package.json')

      console.log(`Copying from ${filePath} to ${desiredPath}`);

      const file = require(filePath)

      fs.writeFileSync(desiredPath, JSON.stringify(file))
    }
  },
  {
    name: 'Deploy hosting',
    step: config => {
      execSync(`npx firebase deploy --only hosting`, { shell: true, stdio: 'inherit' });
    }
  },
  {
    name: 'Deploy function',
    step: config => {
      execSync(`npx firebase deploy --only functions`, { shell: true, stdio: 'inherit' });
    }
  }
]

steps.forEach(step => {
  console.log(`${chalk.bgYellowBright('Running')}: ${step.name}`);

  try {
    // Execute the actual work
    step.step(cfg["deploy"][env || 'development'])
  } catch (err) {
    console.error(`${chalk.bgRed('Error')}: ${err}`);
    exit(1);
  }

  console.log(`${chalk.bgGreen('Done')}: ${step.name}`);
})
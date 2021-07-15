const { watchCommand } = require('./utils');

const processes = []
const commands = [
  "watch:client",
  "watch:server",
  "emulators"
]

const killAll = () => {
  console.log('Process died, killing all.')

  processes.forEach(proc => {
    proc.removeAllListeners();
    proc.kill('SIGTERM');
    
    process.exit(1);
  })
}

commands.forEach(cmd => {
  const process = watchCommand("yarn", [cmd]);

  processes.push(process);

  process.on('exit', () => {
    killAll()
  })
})
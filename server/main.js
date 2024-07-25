const argv = require('./boot/argv');
const configer = require('./boot/configer');
const serverManager = require('./control/server-manager');

serverManager.on(serverManager.SERVER_STATES[1], ()=> {serverManager.prepare(argv)});



configer.loadConfig().then(config => {
  global.config = config
  console.log(global.config);
    });

setInterval(()=>{}, 1000);

// const { exec } = require('child_process');

// exec('sudo -s', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
// });

async function main() {
  // global.config = 
}


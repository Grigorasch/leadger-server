const yargs = require("yargs");

module.exports = argv = yargs
  .option("config", {
    alias: "c",
    description: "Specify the path to the config file",
    type: "string",
  })
  .option("manual", {
    alias: "m",
    description: "Specify  the config file in JSON string format",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

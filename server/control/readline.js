const readlineEmitter = {
  line(input) {
    switch (input.trim()) {
      case 'stop':

      case 'start':

      default:
    }
  },

  close() {
    process.exits(0);
  }
}

process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down gracefully.");
  serverShutDown();
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down gracefully.");
  serverShutDown();
});


module.exports = readlineEmitter;
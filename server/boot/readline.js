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

module.exports = readlineEmitter;
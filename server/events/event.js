class Event {
  constructor(name, { target, previousEvent, EventEmitter } = {}) {
    this.name = name;
    this.date = new Date();
    if (target !== undefined) this.target = target;
    if (previousEvent !== undefined) this.previousEvent = previousEvent;
    EventEmitter?.emit(name, this);
  }
}

module.exports = Event;

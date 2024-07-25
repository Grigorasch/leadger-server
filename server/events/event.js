/**
 * Класс, представляющий событие.
 */
class Event {
  /**
   * Создает экземпляр Event.
   * @param {string} name - Имя события.
   * @param {Object} [options={}] - Дополнительные параметры.
   * @param {Object} [options.target] - Объект цели события.
   * @param {Event} [options.previousEvent] - Предыдущее событие.
   * @param {EventEmitter} [options.EventEmitter] - Экземпляр EventEmitter для генерации события.
   */
  constructor(name, { target, previousEvent, EventEmitter } = {}) {
    this.name = name;
    this.date = new Date();
    if (target !== undefined) this.target = target;
    if (previousEvent !== undefined) this.previousEvent = previousEvent;
    EventEmitter?.emit(name, this);
  }
}

module.exports = Event;

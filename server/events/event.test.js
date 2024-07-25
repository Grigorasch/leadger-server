const Event = require("./event");

// Класс события Event
describe("Event", () => {
  let event;

  // Перед каждым тестом создаем новый экземпляр Event
  beforeEach(() => {
    event = new Event("Тестовое Событие");
  });

  // Тестирование создания экземпляра с полем name
  test("должен создать экземпляр Event с полем name", () => {
    expect(event).toBeInstanceOf(Event);
    expect(event.name).toBe("Тестовое Событие");
    expect(Math.abs(event.date - new Date()) < 1000).toBe(true);
  });

  // Тестирование с использованием EventEmitter
  test("должен вызвать событие с использованием EventEmitter", (done) => {
    const EventEmitter = require("events");
    const emitter = new EventEmitter();

    emitter.on("Тестовое Событие", (testEvent) => {
      expect(testEvent.name).toBe(event.name);
      expect(Math.abs(event.date - testEvent.date) < 1000).toBe(true);
      done();
    });

    event = new Event("Тестовое Событие", { EventEmitter: emitter });
  });
});

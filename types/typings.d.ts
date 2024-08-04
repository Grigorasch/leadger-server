// typings.d.ts

// Module 'configer'
/**
 * Модуль 'configer' предоставляет функции для загрузки и сохранения конфигураций.
 */
declare module 'configer' {

  /**
   * Тип Config, содержащий параметры конфигурации.
   */
  export type Config = {
    port: number;
    host: string;
    autostart: boolean;
    db: {
      host: string;
      port: number;
      name: string;
      user: string;
      password: string;
    };
    ssl: {
      privateKey: string;
      certificate: string;
      ca: string;
    };
    jwt: {
      alg: string;
      secret: {
        key: string;
        strt: string;
        exp: string;
      };
    };
    log: {
      enabled: boolean;
      level: string[];
      file: string;
    };
  };

  /**
   * Объект configer для работы с конфигурациями.
   */
  export const configer: {
    /**
     * Загружает конфигурацию из указанного файла и объединяет её с
     * конфигурацией по умолчанию и ручными настройками.
     *
     * @param path - Путь к файлу конфигурации.
     * @param manualConfig - Ручные настройки конфигурации.
     * @returns - Промис, резолвящийся в объект Config.
     */
    loadConfig(path?: string, manualConfig?: Partial<Config>): Promise<Config>;

    /**
     * Сохраняет конфигурацию в указанный файл.
     *
     * @param path - Путь к файлу для сохранения конфигурации.
     * @param config - Конфигурация для сохранения.
     * @returns - Промис, резолвящийся после сохранения.
     */
    saveConfig(path?: string, config: Config): Promise<void>;
  };
}

// Module 'logger'
/**
 * Модуль 'logger' предоставляет функции для логирования с различными уровнями.
 */
declare module 'logger' {
  /**
   * Объект logger с методами для различных уровней логирования.
   */
  export const logger: {
    /**
     * Логгирование информационного сообщения.
     */
    info: (message?: string) => void;

    /**
     * Логгирование предупреждающего сообщения.
     */
    warning: (message?: string) => void;

    /**
     * Логгирование сообщения об ошибке.
     */
    error: (message?: string) => void;

    /**
     * Логгирование отладочного сообщения.
     */
    debug: (message?: string) => void;
  };

  /**
   * Создание логгера с указанным уровнем.
   *
   * @param level - Используемый уровень логирования.
   * @returns - Настроенный экземпляр логгера.
   */
  export const createLogger: (level: string) => any;
}

// Module 'event'
/**
 * Модуль 'event' предоставляет класс для работы с событиями.
 */
declare module 'event' {

  /**
   * Интерфейс параметров для создания события.
   */
  interface EventOptions {
    target?: any;
    previousEvent?: Event;
    EventEmitter?: any;
  }

  /**
   * Класс, представляющий событие.
   */
  export default class Event {
    /**
     * Создает экземпляр Event.
     *
     * @param name - Имя события.
     * @param options - Дополнительные параметры.
     */
    constructor(name: string, options?: EventOptions);
    name: string;
    date: Date;
    target?: any;
    previousEvent?: Event;
  }
}

// Module 'server-manager'
/**
 * Модуль 'server-manager' предоставляет класс для управления сервером.
 */
declare module 'server-manager' {
  import { EventEmitter } from 'node:events';

  /**
   * Класс ServerManager для управления состоянием сервера и другой логикой.
   */
  class ServerManager extends EventEmitter {
    /**
     * Возможные состояния сервера.
     */
    SERVER_STATES: {
      [key: number]: string;
    };

    constructor();
    state: string;
    connectDB(): Promise<void>;
    httpsServerStart(): Promise<void>;
    httpServerStart(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    serverShutDown(): void;
  }

  /**
   * Экземпляр ServerManager для глобального использования.
   */
  const serverManager: ServerManager;
  export default serverManager;
}

// Re-export common modules for easier access
/**
 * Модуль 'common' для повторного экспорта общих модулей для упрощения доступа.
 */
declare module 'common' {
  export * from 'configer';
  export * from 'logger';
  export * from 'event';
  export * from 'server-manager';
}

/**
 * Генерирует полезную нагрузку JWT для запроса.
 * @param {Object} req - Объект запроса.
 * @returns {Payload} Полезная нагрузка JWT.
 */
declare function generatePayload(req: Request): { iss: string; sub: string; exp: number; iat: number; };
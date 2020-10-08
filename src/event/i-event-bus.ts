
export interface IEventBus {

  dispatchEvent(name: string, payload?: any|any[]): void;

  waitForEvent(name: string): Promise<any>;

  addEventListener(name: string, callback: Function): void;

  removeEventListener(name: string, callback: Function): void;

  destroy(): void;
}

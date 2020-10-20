export type Callback = (payload?: any) => void;

export interface IEventBus {
  dispatchEvent(name: string, payload?: unknown): void;

  waitForEvent(name: string): Promise<any>;

  addEventListener(name: string, callback: Callback): void;

  removeEventListener(name: string, callback: Callback): void;

  destroy(): void;
}

import { IEventBus, Callback } from './i-event-bus';

export abstract class EventAware implements IEventBus {
  protected _event?: IEventBus;

  protected set event(event: IEventBus) {
    this._event = event;
  }

  protected get event(): IEventBus {
    if (!this._event) {
      throw new Error(`No event bus was set yet`);
    }
    return this._event;
  }

  public waitForEvent(eventName: string): Promise<any> {
    return this.event.waitForEvent(eventName);
  }

  public addEventListener(eventName: string, callback: Callback): void {
    this.event.addEventListener(eventName, callback);
  }

  public removeEventListener(eventName: string, callback: Callback): void {
    this.event.removeEventListener(eventName, callback);
  }

  public dispatchEvent(name: string, payload?: unknown): void {
    this.event.dispatchEvent(name, payload);
  }

  public destroy(): void {
    this.event.destroy();
  }
}

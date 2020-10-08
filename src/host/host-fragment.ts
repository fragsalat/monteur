import { IEventBus } from '../event/i-event-bus';

export abstract class HostFragment {

  protected _event?: IEventBus;

  protected constructor(protected fragmentId: number, protected url: string) { }

  protected set event(event: IEventBus) {
    this._event = event;
  }

  protected get event(): IEventBus {
    if (!this._event) {
      throw new Error(`The fragment ${this.fragmentId} has not been initialized yet`);
    }
    return this._event;
  }

  public abstract initializeAt(target: Element, configCb?: (defaults: any) => any): Promise<void>;

  public waitForEvent(eventName: string): Promise<any|any[]> {
    return this.event.waitForEvent(eventName);
  }

  public addEventListener(eventName: string, callback: (payload: any) => void): void {
    this.event.addEventListener(eventName, callback);
  }

  public removeEventListener(eventName: string, callback: (payload: any) => void): void {
    this.event.removeEventListener(eventName, callback);
  }

  public destroy(): void {
    this.event.destroy()
  }
}

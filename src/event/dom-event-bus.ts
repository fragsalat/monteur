import { debug } from '../debug';
import { IEventBus, Callback } from './i-event-bus';

export class DomEventBus implements IEventBus {
  private events: { [eventName: string]: Callback[] } = {};

  constructor(private fragmentId: number, private isHost: boolean) {}

  private log(...messages: any[]): void {
    debug(this.isHost ? 'Host' : `Fragment ${this.fragmentId}`, ...messages);
  }

  private handleEvent = (event: Event): void => {
    const eventName = (event as CustomEvent).detail.eventName;
    this.log(`received event '${eventName}':`, (event as CustomEvent).detail.payload);
    // No listener bound for this event
    if (!(eventName in this.events)) {
      return;
    }

    this.events[eventName].forEach((callback) => {
      callback((event as CustomEvent).detail.payload);
    });
  };

  public waitForEvent(eventName: string, timeoutMs = 5000): Promise<any> {
    this.log(`waits for event '${eventName}'`);

    return new Promise((resolve, reject) => {
      const removeListener = () => {
        this.removeEventListener(eventName, handler);
        clearTimeout(timeout);
      };
      const handler = (payload: any) => {
        removeListener();
        resolve(payload);
      };
      this.addEventListener(eventName, handler);
      // Unbind listener when event is not sent
      const timeout = setTimeout(() => {
        removeListener();
        reject(`Event ${eventName} was never sent`);
      }, timeoutMs);
    });
  }

  public dispatchEvent(eventName: string, payload?: unknown): void {
    this.log(`dispatched event '${eventName}':`, payload);

    const event = new CustomEvent(`monteur-${this.isHost ? 'host' : 'fragment'}-${this.fragmentId}`, {
      detail: { eventName, payload },
      bubbles: false,
    });
    window.dispatchEvent(event);
  }

  public addEventListener(eventName: string, callback: Callback): void {
    // Start listening for events from fragments
    if (!Object.keys(this.events).length) {
      window.addEventListener(`monteur-${this.isHost ? 'fragment' : 'host'}-${this.fragmentId}`, this.handleEvent);
    }
    if (eventName in this.events) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  public removeEventListener(eventName: string, callback: Callback): void {
    // Remove event listener from active list
    const index = Array.isArray(this.events[eventName]) && this.events[eventName].indexOf(callback);
    if (index !== false && index >= 0) {
      this.events[eventName].splice(index, 1);
      // Clear event from list
      if (!this.events[eventName].length) {
        delete this.events[eventName];
      }
      // Remove event listener, no callback is registered anymore
      if (!Object.keys(this.events).length) {
        window.removeEventListener(`monteur-${this.isHost ? 'fragment' : 'host'}-${this.fragmentId}`, this.handleEvent);
      }
    } else {
      console.warn(`Attempt to remove event listener for '${eventName}' while no listener is registered`);
    }
  }

  public destroy(): void {
    window.removeEventListener(`monteur-${this.isHost ? 'fragment' : 'host'}-${this.fragmentId}`, this.handleEvent);
    this.events = {};
  }
}

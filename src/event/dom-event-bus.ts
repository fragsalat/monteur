import { IEventBus, Callback } from './i-event-bus';

export class DomEventBus implements IEventBus {
  private events: { [eventName: string]: Callback[] };

  constructor(private container: Element) {
    this.events = {};
  }

  private handleEvent = (event: Event): void => {
    if (!(event.type in this.events)) {
      console.warn(
        `Potential memory leak. A listener for '${event.type}' is still bound while there is no callback registered`
      );
    }

    this.events[event.type].forEach((callback) => {
      callback((event as CustomEvent).detail);
    });
  };

  public waitForEvent(eventName: string): Promise<any> {
    return new Promise((resolve) => {
      const removeListener = () => {
        this.removeEventListener(eventName, handler);
        clearTimeout(timeout);
      };
      const handler = (event: CustomEvent) => {
        removeListener();
        resolve(event.detail);
      };
      this.addEventListener(eventName, handler);
      // Unbind listener when event is not sent
      const timeout = setTimeout(() => {
        removeListener();
        console.warn(`Event ${eventName} was never sent`);
      }, 5000);
    });
  }

  public dispatchEvent(eventName: string, payload?: unknown): void {
    const event = new CustomEvent(eventName, { detail: payload, bubbles: false });
    this.container.dispatchEvent(event);
  }

  public addEventListener(eventName: string, callback: Callback): void {
    if (eventName in this.events) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [];
      this.container.addEventListener(eventName, this.handleEvent);
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
        // Remove event listener, no callback is registered anymore
        this.container.removeEventListener(eventName, this.handleEvent, true);
      }
    } else {
      console.warn(`Attempt to remove event listener for '${eventName}' while no listener is registered`);
    }
  }

  public destroy(): void {
    Object.keys(this.events).forEach((eventName: string) => {
      this.container.removeEventListener(eventName, this.handleEvent, true);
    });

    this.events = {};
  }
}

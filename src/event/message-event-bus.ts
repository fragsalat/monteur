import { IEventBus } from './i-event-bus';

type Payload = any|any[]

type Message = {
  name: string,
  fragmentId: number,
  payload: Payload
};

export class MessageEventBus implements IEventBus {

  private events: {[eventName: string]: Function[]};

  /**
   * A window can only bind listeners to itself but post to other windows.
   * E.g. Host -> listen on window, post on iframe.contentWindow | Fragment -> listen on window, post of window.top
   * @param readWindow Will be always window
   * @param writeWindow Will be iframe.contentWindow or window.top
   * @param fragmentId Used to identify identify fragments on host window
   */
  constructor(public fragmentId: number, private readWindow: Window, private writeWindow: WindowProxy|null) {
    this.events = {};
    this.readWindow.addEventListener('message', this.handleMessage);
  }

  /**
   * Handle message events on readWindow and dispatch the payload to all listeners
   * @param event
   */
  private handleMessage = (event: MessageEvent<Message>) => {
    // Multiple fragments may posting to the host, check if this event should be handled here
    if (this.fragmentId && this.fragmentId !== event.data.fragmentId) {
      return;
    }
    if (event.data.name in this.events) {
      this.events[event.data.name].forEach(callback => callback(event.data.payload));
    }
  }

  /**
   * Wait a specific time for an event to be posted on readWindow
   * @param eventName
   * @param timeoutMs
   */
  public waitForEvent(eventName: string, timeoutMs: number = 5000): Promise<any> {
    return new Promise(resolve => {
      let timeout: number;
      const removeListener = () => {
        this.removeEventListener(eventName, handler);
        clearTimeout(timeout);
      };
      const handler = (payload: Payload) => {
        removeListener();
        resolve(payload);
      };
      this.addEventListener(eventName, handler);
      // Unbind listener when event is not sent
      timeout = setTimeout(() => {
        removeListener();
        console.warn(`Event ${eventName} was never sent`);
      }, timeoutMs);
    });
  }

  public dispatchEvent(eventName: string, payload?: any|any[]): void {
    if (!this.writeWindow) {
      throw new Error('Write window is not defined');
    }
    this.writeWindow.postMessage({name: eventName, fragmentId: this.fragmentId, payload}, '*');
  }

  public addEventListener(eventName: string, callback: (payload: any|any[]) => void): void {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  }

  public removeEventListener(eventName: string, callback: (payload: any|any[]) => void): void {
    // Remove event listener from active list
    const index = Array.isArray(this.events[eventName]) && this.events[eventName].indexOf(callback);
    if (index !== false && index >= 0) {
      this.events[eventName].splice(index, 1);
      // Clear event from list
      if (!this.events[eventName].length) {
        delete this.events[eventName];
      }
    }
  }

  public destroy() {
    this.events = {};
    this.readWindow.removeEventListener('message', this.handleMessage);
  }
}

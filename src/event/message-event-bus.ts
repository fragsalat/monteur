import { debug } from '../debug';
import { IEventBus, Callback } from './i-event-bus';

type Payload = any | any[];

type Message = {
  name: string;
  fragmentId: number;
  payload: Payload;
};

export class MessageEventBus implements IEventBus {
  private events: { [eventName: string]: Callback[] };

  /**
   * A window can only bind listeners to itself but post to other windows.
   * E.g. Host -> listen on window, post on iframe.contentWindow | Fragment -> listen on window, post of window.parent
   * @param readWindow Will be always window
   * @param writeWindow Will be iframe.contentWindow or window.parent
   * @param fragmentId Used to identify identify fragments on host window
   */
  constructor(public fragmentId: number, private readWindow: Window, private writeWindow: WindowProxy | null) {
    this.events = {};
    this.readWindow.addEventListener('message', this.handleMessage);
  }

  /**
   * Debug logs a message
   * @param messages Parts of the messages
   * @private
   */
  private log(...messages: any[]): void {
    debug(this.writeWindow === window.parent ? `Fragment ${this.fragmentId}` : 'Host', ...messages);
  }

  /**
   * Handle message events on readWindow and dispatch the payload to all listeners
   * @param event
   */
  private handleMessage = (event: MessageEvent<string>) => {
    let data: Message;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      // This event is likely not from monteur
      return;
    }
    this.log(`received event '${data.name}':`, data.payload);
    // Multiple fragments may posting to the host, check if this event should be handled here
    if (this.fragmentId && this.fragmentId !== data.fragmentId) {
      return;
    }
    if (data.name in this.events) {
      this.events[data.name].forEach((callback) => callback(data.payload));
    }
  };

  /**
   * Wait a specific time for an event to be posted on readWindow
   * @param eventName
   * @param timeoutMs
   */
  public waitForEvent(eventName: string, timeoutMs = 5000): Promise<any> {
    this.log(`waits for event '${eventName}'`);

    return new Promise((resolve, reject) => {
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
      const timeout = setTimeout(() => {
        removeListener();
        reject(`Event ${eventName} was never sent`);
      }, timeoutMs);
    });
  }

  public dispatchEvent(eventName: string, payload?: unknown): void {
    if (!this.writeWindow) {
      throw new Error('Write window is not defined');
    }

    this.log(`dispatched event '${eventName}':`, payload);

    const message = JSON.stringify({ name: eventName, fragmentId: this.fragmentId, payload });
    this.writeWindow.postMessage(message, '*');
  }

  public addEventListener(eventName: string, callback: Callback): void {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
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
    }
  }

  public destroy(): void {
    this.events = {};
    this.readWindow.removeEventListener('message', this.handleMessage);
  }
}

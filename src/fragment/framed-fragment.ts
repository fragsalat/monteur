import { MessageEventBus } from '../event/message-event-bus';
import { IFragment, IFragmentStatic } from './i-fragment';

export const FramedFragment: IFragmentStatic = class implements IFragment {

  static isFragment() {
    return window.location !== window.top.location && !isNaN(parseInt(window.name, 10));
  }

  static async initialize(defaultOptions: any, configCb: (config: any) => void|Promise<void>): Promise<void> {
    const fragmentId = parseInt(window.name, 10);
    const event = new MessageEventBus(fragmentId, window, window.top);

    event.dispatchEvent('ready-for-init', defaultOptions || {});

    const config = await event.waitForEvent('initialize');

    await configCb(config);

    event.dispatchEvent('initialized');
  }
}

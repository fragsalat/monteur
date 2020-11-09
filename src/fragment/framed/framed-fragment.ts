import { EventAware } from '../../event/event-aware';
import { MessageEventBus } from '../../event/message-event-bus';
import { IFragmentStatic, IFragment } from '../i-fragment';

export const FramedFragment: IFragmentStatic = class extends EventAware implements IFragment {
  private interval?: number;

  static isFragment(): boolean {
    return window.location !== window.top.location && !isNaN(parseInt(window.name, 10));
  }

  public async initialize(defaultOptions: unknown, initCb: (config: unknown) => void | Promise<void>): Promise<void> {
    // Remove unnecessary horizontal scroll bar as iframe height will be scaled with the content
    document.body.style.overflowY = 'hidden';

    const fragmentId = parseInt(window.name, 10);
    this.event = new MessageEventBus(fragmentId, window, window.top);

    this.event.dispatchEvent('ready-for-init', defaultOptions || {});

    const config = await this.event.waitForEvent('initialize');

    await initCb(config);

    this.event.dispatchEvent('initialized');
    this.checkResize();
  }

  private checkResize() {
    let height = 0;
    this.interval = setInterval(() => {
      // Get height of <html> or <body>.
      // <html> should include margins and paddings may applied to body and is preferred
      const newHeight = document.querySelector('html')?.scrollHeight || document.body.scrollHeight;
      if (height !== newHeight) {
        height = newHeight;
        this.event.dispatchEvent('resize', newHeight);
      }
    }, 10);
  }

  public destroy(): void {
    super.destroy();
    clearInterval(this.interval);
  }
};

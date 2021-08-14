import { EventAware } from '../../event/event-aware';
import { MessageEventBus } from '../../event/message-event-bus';
import { IFragmentStatic, IFragment } from '../i-fragment';

export const FramedFragment: IFragmentStatic = class extends EventAware implements IFragment {
  private interval?: number;
  public url?: string;

  static isFragment(): boolean {
    return window.location !== window.top.location && !isNaN(parseInt(window.name, 10));
  }

  public async initialize(
    defaultOptions: unknown,
    initCb: (config: unknown, container: Element) => void | Promise<void>
  ): Promise<void> {
    const fragmentId = parseInt(window.name, 10);
    this.event = new MessageEventBus(fragmentId, window, window.top);

    this.event.dispatchEvent('ready-for-init', defaultOptions || {});

    const { url, config } = await this.event.waitForEvent('initialize');
    // Host tells us under which url we got loaded
    this.url = url;

    await initCb(config, document.body);

    this.event.dispatchEvent('initialized');

    this.checkResize();
    this.addEventListener('disable-resize', this.disableResize);
  }

  private checkResize() {
    // Remove unnecessary horizontal scroll bar as iframe height will be scaled with the content
    document.body.style.overflowY = 'hidden';

    let height = 0;
    this.interval = setInterval(() => {
      // Get sum of heights of all body children + margins on html and body tag
      const html = document.querySelector('html');
      const htmlMarginTop = html ? parseInt(window.getComputedStyle(html).marginTop, 10) : 0;
      const bodyMarginTop = parseInt(window.getComputedStyle(document.body).marginTop, 10);
      const bodyHeight = Array.from(document.body.children).reduce((height, el) => height + el.scrollHeight, 0);
      const newHeight = htmlMarginTop + bodyMarginTop + bodyHeight;

      if (height !== newHeight) {
        height = newHeight;
        this.event.dispatchEvent('resize', newHeight);
      }
    }, 10);
  }

  /**
   * Clears the interval to check and notify document height
   */
  private disableResize = () => {
    // Allow iframe window to scroll
    document.body.style.overflowY = 'auto';
    clearInterval(this.interval);
  };

  public destroy(): void {
    super.destroy();
    clearInterval(this.interval);
  }
};

import { configureDebugMode } from '../../debug';
import { DomEventBus } from '../../event/dom-event-bus';
import { EventAware } from '../../event/event-aware';
import { IFragmentStatic, IFragment } from '../i-fragment';

function getFragmentId(): number | undefined {
  const fragmentId = document.currentScript?.parentElement?.getAttribute('data-monteur-fragment-id');
  if (fragmentId) {
    return parseInt(fragmentId, 10);
  }
  return;
}

function isDebugEnabled(): boolean {
  return document.currentScript?.parentElement?.hasAttribute('data-monteur-debug') || false;
}

export const UnframedFragment: IFragmentStatic = class extends EventAware implements IFragment {
  public url?: string;
  public container?: Element;

  static isFragment(): boolean {
    return !!getFragmentId();
  }

  constructor(public destroyCb?: (container: Element) => void) {
    super();
  }

  public async initialize(
    defaultOptions: unknown,
    initCb: (config: unknown, container: Element) => void | Promise<void>
  ): Promise<void> {
    configureDebugMode(isDebugEnabled());
    const fragmentId = getFragmentId();
    if (!fragmentId) {
      throw new Error('Can not initialize fragment because missing fragment id');
    }
    this.event = new DomEventBus(fragmentId, false);

    this.event.dispatchEvent('ready-for-init', defaultOptions || {});

    const { url, config } = await this.event.waitForEvent('initialize');
    // Host tells us under which url we got loaded
    this.url = url;
    this.container = document.currentScript?.parentElement as Element;

    await initCb(config, this.container);

    this.event.dispatchEvent('initialized');
  }

  destroy(): void {
    super.destroy();
    if (this.destroyCb && this.container) {
      this.destroyCb(this.container);
    }
  }
};

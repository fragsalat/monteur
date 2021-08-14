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

export const UnframedFragment: IFragmentStatic = class extends EventAware implements IFragment {
  public url?: string;

  static isFragment(): boolean {
    return !!getFragmentId();
  }

  public async initialize(
    defaultOptions: unknown,
    initCb: (config: unknown, container: Element) => void | Promise<void>
  ): Promise<void> {
    const fragmentId = getFragmentId();
    if (!fragmentId) {
      throw new Error('Can not initialize fragment because missing fragment id');
    }
    this.event = new DomEventBus(fragmentId, false);

    this.event.dispatchEvent('ready-for-init', defaultOptions || {});

    const { url, config } = await this.event.waitForEvent('initialize');
    // Host tells us under which url we got loaded
    this.url = url;

    await initCb(config, document.currentScript?.parentElement as Element);

    this.event.dispatchEvent('initialized');
  }
};

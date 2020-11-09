import { ILoadFragmentStrategy } from '../i-load-fragment-strategy';
import { FramedFragment } from './framed-fragment';

export class LoadFramedFragmentStrategy implements ILoadFragmentStrategy {
  public async initializeAt(
    fragmentId: number,
    target: Element,
    url: string,
    configCb?: (defaults: any) => any
  ): Promise<FramedFragment> {
    const frame = document.createElement('iframe');
    frame.style.width = '100%';
    frame.style.border = 'none';
    frame.scrolling = 'auto';
    frame.name = fragmentId.toString(10);
    frame.src = url;
    target.appendChild(frame);

    const fragment = new FramedFragment(fragmentId, target, frame);

    // Start handshake
    const event = await fragment.waitForEvent('ready-for-init');

    let config = {};
    if (typeof configCb === 'function') {
      config = configCb(event.detail || {});
    } else if (event.detail) {
      config = { ...event.detail };
    }

    // Initialize fragment and pass config to it
    fragment.dispatchEvent('initialize', config);

    await fragment.waitForEvent('initialized');

    return fragment;
  }
}

import { ILoadFragmentStrategy } from '../i-load-fragment-strategy';
import { FramedHostFragment } from './framed-host-fragment';

export class LoadFramedFragmentStrategy implements ILoadFragmentStrategy {
  public async initializeAt(
    fragmentId: number,
    target: Element,
    url: string,
    configCb?: (defaults: any) => any,
    debug = false
  ): Promise<FramedHostFragment> {
    const frame = document.createElement('iframe');
    frame.style.width = '100%';
    frame.style.border = 'none';
    frame.scrolling = 'auto';
    frame.name = fragmentId.toString(10);
    frame.src = url;
    frame.allow = 'clipboard-read; clipboard-write';
    if (debug) {
      frame.setAttribute('data-monteur-debug', '1');
    }
    target.appendChild(frame);

    const fragment = new FramedHostFragment(fragmentId, target, frame);
    await fragment.initialize(url, configCb);
    return fragment;
  }
}

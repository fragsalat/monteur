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
    frame.allow = 'clipboard-read; clipboard-write';
    target.appendChild(frame);

    const fragment = new FramedFragment(fragmentId, target, frame);
    await fragment.initialize(url, configCb);
    return fragment;
  }
}

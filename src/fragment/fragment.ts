import { Callback } from '../event/i-event-bus';
import { FramedFragment } from './framed/framed-fragment';
import { IFragment } from './i-fragment';

let fragment: IFragment;

class FragmentWrapper implements IFragment {
  isFragment(): boolean {
    return FramedFragment.isFragment();
  }

  async initialize(defaultOptions: any, initCb: (config: any) => void | Promise<void>): Promise<void> {
    if (FramedFragment.isFragment()) {
      fragment = new FramedFragment();
    } else {
      fragment = new FramedFragment();
    }
    await fragment.initialize(defaultOptions, initCb);
  }

  addEventListener(name: string, callback: Callback): void {
    if (!fragment) {
      return;
    }
    fragment.addEventListener(name, callback);
  }

  removeEventListener(name: string, callback: Callback): void {
    if (!fragment) {
      return;
    }
    fragment.removeEventListener(name, callback);
  }

  dispatchEvent(name: string, payload?: unknown): void {
    if (!fragment) {
      return;
    }
    fragment.dispatchEvent(name, payload);
  }

  waitForEvent(name: string): Promise<any> {
    if (!fragment) {
      return Promise.reject();
    }
    return fragment.waitForEvent(name);
  }

  destroy(): void {
    fragment.destroy();
  }
}

export const Fragment = new FragmentWrapper();

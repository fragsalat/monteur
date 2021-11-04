import { configureDebugMode } from '../debug';
import { LoadFramedFragmentStrategy } from './framed/load-framed-fragment-strategy';
import { HostFragment } from './host-fragment';
import { ILoadFragmentStrategy } from './i-load-fragment-strategy';
import { LoadUnframedFragmentStrategy } from './unframed/load-unframed-fragment-strategy';

declare global {
  interface Window {
    fragmentCounter: number;
  }
}

type ConfigCallback = (defaultOptions: unknown) => Record<string, unknown>;

export class Host {
  /**
   * To be called from host application to render a fragment into a specific place
   * @param target Target element to put the fragment in
   * @param fragmentUrl Url to the fragment. Should resolve to the index.html
   * @param configCb Will get the defaults from the fragment and have to return initialization / configuration data
   * @param framed Either the fragment will be loaded via iframe or via html
   * @param debug If true events will be logged to console
   */
  static renderFragment(
    target: Element,
    fragmentUrl: string,
    configCb: ConfigCallback,
    framed = true,
    debug = false
  ): Promise<HostFragment> {
    configureDebugMode(debug);

    window.fragmentCounter = window.fragmentCounter || 1;
    let strategy: ILoadFragmentStrategy;
    if (framed) {
      strategy = new LoadFramedFragmentStrategy();
    } else {
      strategy = new LoadUnframedFragmentStrategy();
    }
    return strategy.initializeAt(window.fragmentCounter++, target, fragmentUrl, configCb, debug);
  }
}

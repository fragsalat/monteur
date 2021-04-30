import { ILoadFragmentStrategy } from '../i-load-fragment-strategy';
import { UnframedFragment } from './unframed-fragment';

export class LoadUnframedFragmentStrategy implements ILoadFragmentStrategy {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  public initializeAt(
    _fragmentId: number,
    _target: Element,
    _url: string,
    _configCb?: (defaults: any) => any
  ): Promise<UnframedFragment> {
    return Promise.reject('Not yet implemented');
  }
}

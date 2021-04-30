import { HostFragment } from './host-fragment';

export interface ILoadFragmentStrategy {
  initializeAt(
    fragmentId: number,
    target: Element,
    url: string,
    configCb?: (defaults: any) => any,
    permissions?: string
  ): Promise<HostFragment>;
}

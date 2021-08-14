import { IEventBus } from '../event/i-event-bus';

export interface IFragmentStatic {
  new (): IFragment;
  isFragment(): boolean;
}

export interface IFragment extends IEventBus {
  url?: string;

  initialize(
    defaultOptions: unknown,
    initCb: (config: unknown, container: Element) => void | Promise<void>
  ): Promise<void>;
}

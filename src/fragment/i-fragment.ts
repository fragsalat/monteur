import { IEventBus } from '../event/i-event-bus';

export interface IFragmentStatic {
  new (destroyCb?: (container: Element) => void): IFragment;
  isFragment(): boolean;
}

export interface IFragment extends IEventBus {
  url?: string;
  container?: Element;
  destroyCb?: (container: Element) => void;

  initialize(
    defaultOptions: unknown,
    initCb: (config: unknown, container: Element) => void | Promise<void>,
    destroyCb?: (container: Element) => void
  ): Promise<void>;
}

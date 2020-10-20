import { IEventBus } from '../event/i-event-bus';

export interface IFragmentStatic {
  new (): IFragment;
  isFragment(): boolean;
}

export interface IFragment extends IEventBus {
  initialize(defaultOptions: unknown, initCb: (config: unknown) => void | Promise<void>): Promise<void>;
}

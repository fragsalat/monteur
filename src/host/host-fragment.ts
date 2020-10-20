import { EventAware } from '../event/event-aware';

export abstract class HostFragment extends EventAware {
  public constructor(protected fragmentId: number, protected target: Element) {
    super();
  }
}

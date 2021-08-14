import { DomEventBus } from '../../event/dom-event-bus';
import { HostFragment } from '../host-fragment';

export class UnframedFragment extends HostFragment {
  public constructor(protected fragmentId: number, protected target: Element) {
    super(fragmentId, target);

    this.event = new DomEventBus(this.fragmentId, true);
  }
}

import { MessageEventBus } from '../../event/message-event-bus';
import { HostFragment } from '../host-fragment';

export class FramedFragment extends HostFragment {

  private readonly frame: HTMLIFrameElement;

  constructor(protected fragmentId: number, protected url: string) {
    super(fragmentId, url);

    this.frame = document.createElement('iframe');
    this.frame.style.width = '100%';
    this.frame.style.border = 'none';
    this.frame.name = fragmentId.toString(10);
    this.frame.src = this.url;
  }

  /**
   * Creates an IFrame inside target element, load specified fragment and
   * perform initialization handshake to pass configuration to fragment.
   * @param target Element to render the IFrame at
   * @param configCb
   */
  public async initializeAt(target: Element, configCb?: (defaults: any) => any): Promise<void> {
    target.appendChild(this.frame);

    this.event = new MessageEventBus(this.fragmentId, window, this.frame.contentWindow);
    // Fragment will notify host about actual height to improve responsiveness
    this.event.addEventListener('resize', this.handleResize);

    // Start handshake
    const event = await this.event.waitForEvent('ready-for-init');

    let config = {};
    if (typeof configCb === 'function') {
      config = configCb(event.detail || {});
    } else if (event.detail) {
      config = {...event.detail};
    }

    // Initialize fragment and pass config to it
    this.event.dispatchEvent('initialize', config);

    await this.event.waitForEvent('initialized');
  }

  private handleResize = (newHeight: number) => {
    this.frame.style.height = `${newHeight}px`;
  }
}

import { MessageEventBus } from '../../event/message-event-bus';
import { HostFragment } from '../host-fragment';

export class FramedFragment extends HostFragment {
  public constructor(protected fragmentId: number, protected target: Element, protected frame: HTMLIFrameElement) {
    super(fragmentId, target);

    this.event = new MessageEventBus(this.fragmentId, window, this.frame.contentWindow);
    // Fragment will notify host about actual height to improve responsiveness
    this.event.addEventListener('resize', this.handleResize);
  }

  /**
   * Sets a fixed height to the iframe and removes automatic scaling
   * @param height Value of CSS property height
   */
  public setHeight(height: string): void {
    this.frame.style.height = height;
    // Notify fragment about stopping to check for resizing
    this.event.dispatchEvent('disable-resize');
  }

  private handleResize = (newHeight: number) => {
    this.frame.style.height = `${newHeight}px`;
  };

  public destroy(): void {
    this.target.removeChild(this.frame);
  }
}

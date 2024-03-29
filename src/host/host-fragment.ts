import { EventAware } from '../event/event-aware';

export abstract class HostFragment extends EventAware {
  public constructor(protected fragmentId: number, protected target: Element) {
    super();
  }

  public async initialize(url: string, configCb?: (defaultOptions?: any) => any): Promise<void> {
    // Start handshake. Ready for init event can take a bit longer when loading bigger fragments
    const event = await this.waitForEvent('ready-for-init', 60000);

    let config = {};
    if (typeof configCb === 'function') {
      config = configCb(event.detail || {});
    } else if (event.detail) {
      config = { ...event.detail };
    }

    // Initialize fragment and pass config to it
    this.dispatchEvent('initialize', { url, config });

    await this.waitForEvent('initialized');
  }

  destroy(): void {
    this.dispatchEvent('destroy');
    super.destroy();
    // Clear target container to enable re-render
    while (this.target.children.length) {
      this.target.removeChild(this.target.children[0]);
    }
  }
}

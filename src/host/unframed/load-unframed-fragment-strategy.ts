import { ILoadFragmentStrategy } from '../i-load-fragment-strategy';
import { HtmlLoader } from './html-loader';
import { ScriptExecutor } from './script-executor';
import { UnframedFragment } from './unframed-fragment';

export class LoadUnframedFragmentStrategy implements ILoadFragmentStrategy {
  scriptExecutor = new ScriptExecutor();

  /* eslint-disable @typescript-eslint/no-unused-vars */
  public async initializeAt(
    fragmentId: number,
    target: Element,
    url: string,
    configCb?: (defaults: any) => any
  ): Promise<UnframedFragment> {
    const baseUrl = url.replace(/^(.*)\/$/, '$1');
    // Add fragment id for later event based communication
    target.setAttribute('data-monteur-fragment-id', fragmentId.toString());
    // Fetch and parse html
    const html = await HtmlLoader.loadHtml(baseUrl);
    // Move relevant elements into DOM
    this.copyElements(html, target);
    // Execute java scripts
    this.scriptExecutor.executeScripts();

    const fragment = new UnframedFragment(fragmentId, target);
    await fragment.initialize(baseUrl, configCb);
    return fragment;
  }

  private copyElements(html: HTMLHtmlElement, target: Element): void {
    this.appendFiltered(html.querySelectorAll('link[rel="stylesheet"]'), document.querySelector('head') as Element);
    this.appendFiltered(html.querySelectorAll('script'), target);
    this.appendFiltered(html.querySelectorAll('body > *') || html.children, target);
  }

  private appendFiltered(source: NodeListOf<Element>, target: Element): void {
    const holder = document.createDocumentFragment();
    source.forEach((child) => {
      // Filter out unwanted elements
      if ('monteur-ignore' in (child as HTMLElement).dataset) {
        return;
      }
      const hashCode = this.hashCode(child.outerHTML);
      // Todo: implement proper duplicate check with host and fragment html
      if (target.querySelector(`[data-monteur-id="${hashCode}"]`)) {
        return;
      }

      child.setAttribute('data-monteur-id', hashCode);
      holder.appendChild(child);
    });

    this.scriptExecutor.registerScripts(holder);
    target.appendChild(holder);
  }

  /**
   * Java's hashCode function https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
   * @param source
   * @private
   */
  private hashCode(source: string): string {
    let hash = 0;
    if (source.length == 0) return hash.toString();
    for (let i = 0; i < source.length; i++) {
      const char = source.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }
}

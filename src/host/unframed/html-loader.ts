export class HtmlLoader {
  private static fetchResource(url: string) {
    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.addEventListener('load', () => {
        if (xhr.status < 400) {
          resolve(xhr.responseText);
        } else {
          reject(`Failed to load fragment: ${xhr.statusText}`);
        }
      });
      xhr.addEventListener('error', () => {
        reject(`Failed to load fragment: ${xhr.statusText}`);
      });
      xhr.send();
    });
  }

  private static makeUrlsAbsolute(url: string, html: string) {
    // Make resource urls absolute
    const absolute = (resourceUrl: string) => {
      if (!resourceUrl || resourceUrl.startsWith('http')) {
        return resourceUrl;
      }
      if (resourceUrl.startsWith('/')) {
        return url + resourceUrl;
      }
      return `${url}/${resourceUrl}`;
    };
    // Replace relative urls with absolute ones
    const replacer = (_: string, prefix: string, resourceUrl: string, suffix: string) => {
      return prefix + absolute(resourceUrl) + suffix;
    };

    html = html.replace(/(<link.*?href=['"])([^'"]*?)(['"])/gi, replacer);
    html = html.replace(/(src=['"])([^'"]*?)(['"])/gi, replacer);

    return html;
  }

  public static async loadHtml(url: string): Promise<HTMLHtmlElement> {
    let html = await this.fetchResource(url);
    html = this.makeUrlsAbsolute(url, html);

    // Parse html into dom tree. DOMParser was not used because of it's browser support
    const dom = document.createElement('html');
    dom.innerHTML = html;

    return dom;
  }
}

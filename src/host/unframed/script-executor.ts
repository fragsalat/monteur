/**
 * Fragments are loaded via http request and parsed into dom tree. Browsers disable script execution for these action
 * so that scripts never get executed. These class registers available scripts in a container and executes them by
 * creating a new script copy and replace the old script with the new one which have script execution flag enabled.
 * https://www.w3.org/TR/DOM-Parsing/#widl-DOMParser-parseFromString-Document-DOMString-str-SupportedType-type
 */
export class ScriptExecutor {
  scripts: HTMLScriptElement[] = [];

  /**
   * Get all script tags in the container and register it for execution
   * @param container
   */
  registerScripts(container: DocumentFragment): void {
    container.querySelectorAll('script').forEach((script) => {
      this.scripts.push(script);
    });
  }

  /**
   * Execute registered scripts by creating a copy of the existing script which has script execution flag enabled
   */
  executeScripts(): void {
    const nextScript = this.scripts.shift();
    if (!nextScript) {
      return;
    }
    // Create a copy of the script
    const newScript = document.createElement('script');
    for (let i = 0; i < nextScript.attributes.length; i++) {
      newScript.setAttribute(nextScript.attributes[i].name, nextScript.attributes[i].value);
    }
    newScript.innerHTML = nextScript.innerHTML;
    // To ensure execution order we add them sequentially to the dom once the previous is loaded and execution started
    // Otherwise scripts might be executed while the previous is still loading. Even though in the web async = false is
    // promised to solve this, it seems like it doesn't when adding the scripts with a document fragment.
    newScript.onload = () => this.executeScripts();
    // Replace the original script with the new script to trigger execution
    nextScript.parentNode?.replaceChild(newScript, nextScript);
    // Load event isn't fired when the script has nothing to load
    if (!newScript.src) {
      this.executeScripts();
    }
  }
}

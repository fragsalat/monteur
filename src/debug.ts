let debugEnabled = false;

export function configureDebugMode(enabled: boolean): void {
  debugEnabled = enabled;
}

export function debug(...args: any[]): void {
  if (debugEnabled) {
    console.debug('[MONTEUR]', ...args);
  }
}

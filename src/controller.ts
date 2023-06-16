import { Capacitor } from '@capacitor/core';

import type { SafeAreaType } from './index';
import { SafeArea } from './index';

class SafeAreaController {
  async injectCSSVariables(): Promise<void> {
    this.addStatusBarHeight();
    this.addSafeAreaVariables();
  }

  async addStatusBarHeight(): Promise<void> {
    const { height } = await SafeArea.getStatusBarHeight();

    const elStyle = document.documentElement.style;
    elStyle.setProperty('--status-bar-height', `${height}px`);
  }

  async addSafeAreaVariables(): Promise<void> {
    const safeAreaInset = await SafeArea.getSafeAreaInsets();
    for (const inset in safeAreaInset) {
      const elStyle = document.documentElement.style;
      switch (Capacitor.getPlatform()) {
        case 'android':
        case 'ios':
          {
            elStyle.setProperty(
              `--safe-area-inset-${inset}`,
              `${safeAreaInset[inset as keyof SafeAreaType]}px`,
            );
          }
          break;
        default:
          {
            elStyle.setProperty(`--safe-area-inset-${inset}`, '0px');
          }
          break;
      }
    }
  }
}

export default SafeAreaController;

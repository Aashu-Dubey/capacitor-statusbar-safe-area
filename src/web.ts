import { WebPlugin } from '@capacitor/core';

import type { SafeAreaPlugin, SafeAreaType } from './definitions';

export class SafeAreaWeb extends WebPlugin implements SafeAreaPlugin {
  async getStatusBarHeight(): Promise<{ height: number }> {
    return { height: 0 };
  }

  async getSafeAreaInsets(): Promise<SafeAreaType> {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
}

import { registerPlugin } from '@capacitor/core';

import { SafeAreaController } from './controller';
import type { SafeAreaPlugin, SafeAreaHTMLProps } from './definitions';
import { SafeAreaElement, registerSafeAreaElement } from './element';

const SafeArea = registerPlugin<SafeAreaPlugin>('SafeArea', {
  web: () => import('./web').then(m => new m.SafeAreaWeb()),
});

const controller = new SafeAreaController();

export * from './definitions';
export { SafeArea };
export { controller as SafeAreaController };
export { SafeAreaElement, registerSafeAreaElement };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    export interface IntrinsicElements {
      'safe-area': SafeAreaHTMLProps;
    }
  }
}

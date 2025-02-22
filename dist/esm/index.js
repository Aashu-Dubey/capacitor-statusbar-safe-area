import { registerPlugin } from '@capacitor/core';
import { SafeAreaController } from './controller';
import { registerSafeAreaElement } from './element';
const SafeArea = registerPlugin('SafeArea', {
    web: () => import('./web').then(m => new m.SafeAreaWeb()),
});
const controller = new SafeAreaController();
export * from './definitions';
export { SafeArea };
export { controller as SafeAreaController };
export { registerSafeAreaElement };
//# sourceMappingURL=index.js.map
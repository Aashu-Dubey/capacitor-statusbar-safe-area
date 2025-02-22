import { SafeAreaController } from './controller';
import type { SafeAreaPlugin, SafeAreaHTMLProps } from './definitions';
import { registerSafeAreaElement } from './element';
declare const SafeArea: SafeAreaPlugin;
declare const controller: SafeAreaController;
export * from './definitions';
export { SafeArea };
export { controller as SafeAreaController };
export { registerSafeAreaElement };
declare global {
    export namespace JSX {
        interface IntrinsicElements {
            'safe-area': SafeAreaHTMLProps;
        }
    }
}

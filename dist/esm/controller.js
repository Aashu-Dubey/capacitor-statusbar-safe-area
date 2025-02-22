import { Capacitor } from '@capacitor/core';
import { SafeArea } from './index';
export class SafeAreaController {
    async injectCSSVariables() {
        this.addStatusBarHeight();
        this.addSafeAreaVariables();
    }
    async addStatusBarHeight() {
        const { height } = await SafeArea.getStatusBarHeight();
        const elStyle = document.documentElement.style;
        elStyle.setProperty('--status-bar-height', `${height}px`);
    }
    async addSafeAreaVariables() {
        const safeAreaInset = await SafeArea.getSafeAreaInsets();
        for (const inset in safeAreaInset) {
            const elStyle = document.documentElement.style;
            switch (Capacitor.getPlatform()) {
                case 'android':
                case 'ios':
                    {
                        elStyle.setProperty(`--safe-area-inset-${inset}`, `${safeAreaInset[inset]}px`);
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
//# sourceMappingURL=controller.js.map
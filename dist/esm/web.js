import { WebPlugin } from '@capacitor/core';
export class SafeAreaWeb extends WebPlugin {
    async getStatusBarHeight() {
        return { height: 0 };
    }
    async getSafeAreaInsets() {
        return { top: 0, bottom: 0, left: 0, right: 0 };
    }
}
//# sourceMappingURL=web.js.map
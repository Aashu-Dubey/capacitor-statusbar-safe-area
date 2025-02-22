import { WebPlugin } from '@capacitor/core';
import type { SafeAreaPlugin, SafeAreaInset } from './definitions';
export declare class SafeAreaWeb extends WebPlugin implements SafeAreaPlugin {
    getStatusBarHeight(): Promise<{
        height: number;
    }>;
    getSafeAreaInsets(): Promise<SafeAreaInset>;
}

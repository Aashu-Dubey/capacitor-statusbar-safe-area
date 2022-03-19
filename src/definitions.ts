export interface SafeAreaPlugin {
  /**
   * Get the Status bar height on Android and iOS, and on Web it returns 0.
   *
   */
  getStatusBarHeight(): Promise<{ height: number }>;

  /**
   * Get the Safe area insets for Android and iOS, and on Web it returns 0 for all.
   *
   */
  getSafeAreaInsets(): Promise<SafeAreaType>;
}

export interface SafeAreaType {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

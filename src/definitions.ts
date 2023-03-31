export interface SafeAreaPlugin {
  /**
   * Get the Status bar height on Android and iOS, and on Web it returns 0.
   */
  getStatusBarHeight(): Promise<{ height: number }>;

  /**
   * Get the Safe area insets for Android and iOS, and on Web it returns 0 for all.
   */
  getSafeAreaInsets(): Promise<SafeAreaType>;
}

export interface SafeAreaType {
  /**
   * Safe Area inset value at top.
   */
  top: number;
  /**
   * Safe Area inset value at bottom.
   */
  bottom: number;
  /**
   * Safe Area inset value at left.
   */
  left: number;
  /**
   * Safe Area inset value at right.
   */
  right: number;
}

export interface SafeAreaHTMLProps {
  /**
   * Whether to apply safe area insets as `padding` or `margin`.
   *
   * default `padding`.
   */
  mode: 'padding' | 'margin';
  /**
   * Specify the edges you want to apply safe area padding on, separated by comma.
   *
   * For example, to apply padding only on top, left and right, `edges="top,left,right"`.
   *
   * default to all edges.
   */
  edges: string;
}

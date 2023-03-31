import { Capacitor } from '@capacitor/core';

import type { SafeAreaType } from './index';
import { SafeArea } from './index';

class SafeAreaElement extends HTMLElement {
  mode: 'padding' | 'margin';
  edges?: string;

  constructor() {
    super();

    this.mode = 'padding';
    // Create a shadow root
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.renderElement();
  }

  static get observedAttributes() {
    return ['mode', 'edges'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }
    (this as any)[name] = newValue;
    this.renderElement();
  }

  async renderElement() {
    if (this.shadowRoot) {
      const safeAreaInset = await SafeArea.getSafeAreaInsets();

      const isMargin = this.mode === 'margin';
      const edges = this.edges?.split(',').map(item => item.trim());

      const insets = {
        top: edges && !edges?.includes('top') ? 0 : safeAreaInset.top,
        bottom: edges && !edges?.includes('bottom') ? 0 : safeAreaInset.bottom,
        left: edges && !edges?.includes('left') ? 0 : safeAreaInset.left,
        right: edges && !edges?.includes('right') ? 0 : safeAreaInset.right,
      };

      this.shadowRoot.innerHTML = `
        <style>
          #wrapper {
            ${isMargin ? 'margin' : 'padding'}-top: ${insets.top}px;
            ${isMargin ? 'margin' : 'padding'}-bottom: ${insets.bottom}px;
            ${isMargin ? 'margin' : 'padding'}-left: ${insets.left}px;
            ${isMargin ? 'margin' : 'padding'}-right: ${insets.right}px;
          }
        </style>
        <div id="wrapper">
          <slot></slot>
        </div>
      `;
    }
  }
}

if (!customElements.get('safe-area'))
  customElements.define('safe-area', SafeAreaElement);

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

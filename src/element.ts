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

  connectedCallback(): void {
    this.renderElement();
  }

  static get observedAttributes(): string[] {
    return ['mode', 'edges'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
    (this as any)[name] = newValue;
    this.renderElement();
  }

  async renderElement(): Promise<void> {
    if (this.shadowRoot) {
      const safeAreaInset = await SafeArea.getSafeAreaInsets();

      const isMargin = this.mode === 'margin';
      const edges = this.edges?.split(',').map((item) => item.trim());

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

export const registerSafeAreaElement = (): void => {
  if (!customElements.get('safe-area')) customElements.define('safe-area', SafeAreaElement);
};

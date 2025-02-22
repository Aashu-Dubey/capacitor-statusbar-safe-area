import { SafeArea } from './index';
class SafeAreaElement extends HTMLElement {
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
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[name] = newValue;
        this.renderElement();
    }
    async renderElement() {
        var _a;
        if (this.shadowRoot) {
            const safeAreaInset = await SafeArea.getSafeAreaInsets();
            const isMargin = this.mode === 'margin';
            const edges = (_a = this.edges) === null || _a === void 0 ? void 0 : _a.split(',').map(item => item.trim());
            const insets = {
                top: edges && !(edges === null || edges === void 0 ? void 0 : edges.includes('top')) ? 0 : safeAreaInset.top,
                bottom: edges && !(edges === null || edges === void 0 ? void 0 : edges.includes('bottom')) ? 0 : safeAreaInset.bottom,
                left: edges && !(edges === null || edges === void 0 ? void 0 : edges.includes('left')) ? 0 : safeAreaInset.left,
                right: edges && !(edges === null || edges === void 0 ? void 0 : edges.includes('right')) ? 0 : safeAreaInset.right,
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
export const registerSafeAreaElement = () => {
    if (!customElements.get('safe-area'))
        customElements.define('safe-area', SafeAreaElement);
};
//# sourceMappingURL=element.js.map
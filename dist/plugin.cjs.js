'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

class SafeAreaController {
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
            switch (core.Capacitor.getPlatform()) {
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
const registerSafeAreaElement = () => {
    if (!customElements.get('safe-area'))
        customElements.define('safe-area', SafeAreaElement);
};

const SafeArea = core.registerPlugin('SafeArea', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.SafeAreaWeb()),
});
const controller = new SafeAreaController();

class SafeAreaWeb extends core.WebPlugin {
    async getStatusBarHeight() {
        return { height: 0 };
    }
    async getSafeAreaInsets() {
        return { top: 0, bottom: 0, left: 0, right: 0 };
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SafeAreaWeb: SafeAreaWeb
});

exports.SafeArea = SafeArea;
exports.SafeAreaController = controller;
exports.registerSafeAreaElement = registerSafeAreaElement;
//# sourceMappingURL=plugin.cjs.js.map

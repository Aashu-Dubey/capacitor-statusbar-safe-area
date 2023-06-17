import {
  SafeArea,
  SafeAreaController,
  registerSafeAreaElement,
} from '@aashu-dubey/capacitor-statusbar-safe-area';
import { SplashScreen } from '@capacitor/splash-screen';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
      main .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      main .footer-text {
        text-align: center;
        margin: 0px;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1 id="header">Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          Capacitor plugin to get status bar height and safe area insets on Android & iOS in your Capacitor application.
        </p>
        <h2>Getting Started</h2>
        <p>
          The plugin exports functions, CSS variables as well as web component to get and use safe area or status bar
          height values.
        </p>
        <p>
          Like in this sample, the header uses CSS variable, values below are using functions and the
          footer uses web component (<b>&lt;safe-area&gt;</b> tag)
        </p>
        <p>
          Have a look at project's <a href="https://github.com/Aashu-Dubey/capacitor-statusbar-safe-area#readme">readme</a> for more
          information on how to use it in your project.
        </p>
        <a href="https://github.com/Aashu-Dubey/capacitor-statusbar-safe-area" target="_blank" class="button">Read more</a>
        <h2>Status bar & Safe Area Info</h2>
        <safe-area class="footer" mode="margin" edges="bottom">
          <p class="footer-text">This footer uses <b>safe-area</b> tag</p>
        </safe-area>
      </main>
    </div>
    `;
    }

    async connectedCallback() {
      const self = this;

      // Injecting CSS variable so we can use then in styles
      SafeAreaController.injectCSSVariables();
      // Registering the safe-area custom element to use as an html tag
      registerSafeAreaElement();

      // Using plugin's following methods to get status bar height and safe area insets info
      const { height } = await SafeArea.getStatusBarHeight();

      const insets = await SafeArea.getSafeAreaInsets();

      const mainContainer = self.shadowRoot.querySelector('main');
      mainContainer.innerHTML += `
        <p>Status bar height is: <b>${height}</b></p>
        <p>Device's safe area insets are: <b>${JSON.stringify(insets)}</b></p>
      `;

      // The header top padding can also be set dynamically as shown below
      // const root = self.shadowRoot.querySelector('#header');
      // root.style.setProperty('padding-top', `${insets.top}px`); // or `${height}px`
    }
  },
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
        padding-top: var(--safe-area-inset-top); // or var(--status-bar-height)
        // Using plugin's CSS variable here 👆🏼
      }
    </style>
    <slot></slot>
    `;
    }
  },
);

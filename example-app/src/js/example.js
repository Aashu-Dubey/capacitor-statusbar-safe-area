import {
  SafeArea,
  SafeAreaController,
  registerSafeAreaElement,
} from '@aashu-dubey/capacitor-statusbar-safe-area';
import { SplashScreen } from '@capacitor/splash-screen';

SplashScreen.hide();

init();

async function init() {
    // Injecting CSS variable so we can use then in styles
    SafeAreaController.injectCSSVariables();
    // Registering the safe-area custom element to use as an html tag
    registerSafeAreaElement();

    // Using plugin's following methods to get status bar height and safe area insets info
    const { height } = await SafeArea.getStatusBarHeight();

    const insets = await SafeArea.getSafeAreaInsets();

    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML += `
      <p>Status bar height is: <b>${height}</b></p>
      <p>Device's safe area insets are: <b>${JSON.stringify(insets)}</b></p>
    `;

    // The header top padding can also be set dynamically as shown below
    // const root = document.querySelector('#header');
    // root.style.setProperty('padding-top', `${insets.top}px`); // or `${height}px`
  }
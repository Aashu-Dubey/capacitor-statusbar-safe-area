<div align="center">

# capacitor-statusbar-safe-area

Get Status bar height and Safe area insets on Android & iOS.

[![npm](https://img.shields.io/npm/v/@aashu-dubey/capacitor-statusbar-safe-area?style=flat-square)](https://www.npmjs.com/package/@aashu-dubey/capacitor-statusbar-safe-area) [![npm](https://img.shields.io/npm/dm/@aashu-dubey/capacitor-statusbar-safe-area?style=flat-square)](https://www.npmjs.com/package/@aashu-dubey/capacitor-statusbar-safe-area) [![Install Size](https://packagephobia.now.sh/badge?p=@aashu-dubey/capacitor-statusbar-safe-area)](https://www.npmjs.com/package/@aashu-dubey/capacitor-statusbar-safe-area)

</div>

## Install

```bash
npm install @aashu-dubey/capacitor-statusbar-safe-area
npx cap sync
```

## Usage

```typescript
import { SafeArea } from '@aashu-dubey/capacitor-statusbar-safe-area';

const getStatusBarHeight = async () => {
  const { height } = await SafeArea.getStatusBarHeight();
  return height; // Ex. 29.090909957885742
};

const getSafeAreaInsets = async () => {
  const insets = await SafeArea.getSafeAreaInsets();
  return insets; // Ex. { "bottom":34, "top":47, "right":0, "left":0 }
};
```

### CSS Variables

Package also exposes CSS variables, for that you need to call `injectCSSVariables` method in your `platform.ready()` function or whenever app System UI visibility is changed

```typescript
import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';

const injectSafeAreaVariables = () => {
  SafeAreaController.injectCSSVariables();
};
```

then you can use them in your CSS files

```scss
.myContainer {
  // '--status-bar-height' & '--safe-area-inset-top' would most probably be same
  margin-top: var(--status-bar-height);
}

.myElement {
  padding-top: var(--safe-area-inset-top);
  padding-left: var(--safe-area-inset-left);
  padding-right: var(--safe-area-inset-right);
  padding-bottom: var(--safe-area-inset-bottom);
}
```

### HTML Tag

Other than the above options, The plugin also exports a `<safe-area>` custom web component.

#### Register and Use

Register the custom element in your app initialization (e.g. `main.ts`, `app.component.ts`, or root component) or only inside the component it's being used:

```ts
import { registerSafeAreaElement } from '@aashu-dubey/capacitor-statusbar-safe-area';

registerSafeAreaElement();
```

Then wrap the content you want to apply safe area spacing on with the `<safe-area>` tag:

```html
<safe-area>
  <!-- Content here -->
</safe-area>
```

#### Attributes

There are two attributes, that can be used with the `safe-area` web component to control it's behaviour, `mode` & `edges`.

```html
<safe-area mode="margin" edges="top,left,right"></safe-area>
```

more details [here](#safeareahtmlprops).

#### Framework Examples

<details>
<summary><b>Angular</b></summary>

You will get an error that `<safe-area>` is an unknown element to the Angular compiler. This is resolved by adding `CUSTOM_ELEMENTS_SCHEMA` to your standalone component or module schemas.

##### 1. Standalone Component (Angular 14+)

```ts
// your.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerSafeAreaElement } from '@aashu-dubey/capacitor-statusbar-safe-area';

registerSafeAreaElement();

@Component({
  selector: 'app-your-component',
  standalone: true,
  template: `
    <safe-area>
      <!-- Other content -->
    </safe-area>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YourComponent {}
```

##### 2. NgModule

Modify the module that declares your component to allow custom elements:

```ts
// your-component.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YourComponentModule {}
```

Then register the custom element in your component:

```ts
// app.component.ts or your-component.ts
import { registerSafeAreaElement } from '@aashu-dubey/capacitor-statusbar-safe-area';

registerSafeAreaElement();
```

```html
<!-- your.component.html -->
<safe-area>
  <!-- Other content -->
</safe-area>
```

</details>

<br />

<details>
<summary><b>React</b></summary>

```jsx
import { registerSafeAreaElement } from '@aashu-dubey/capacitor-statusbar-safe-area';

registerSafeAreaElement();

const MyComponent = () => {
  return <safe-area>{/* Other content */}</safe-area>;
};
```

You may need to create a `*.d.ts` file for the custom element in React:

```ts
import type { SafeAreaHTMLProps } from '@aashu-dubey/capacitor-statusbar-safe-area';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'safe-area': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & SafeAreaHTMLProps;
    }
  }
}

export {};
```

</details>

<br />

<details>
<summary><b>Vue</b></summary>

```html
<script setup lang="ts">
  import { registerSafeAreaElement } from '@aashu-dubey/capacitor-statusbar-safe-area';

  registerSafeAreaElement();
</script>

<template>
  <safe-area>
    <!-- Other content -->
  </safe-area>
</template>
```

Make sure you enable [recognize native custom elements](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) in `vite.config.ts`:

```ts
// vite.config.ts > plugins
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'safe-area',
    },
  },
}),
```

Also, for [proper typing support](https://vuejs.org/guide/extras/web-components.html#non-vue-web-components-and-typescript) in `.vue` `<template>`, create a `*.d.ts` file and add the following code:

```ts
import type { HTMLAttributes, PublicProps } from 'vue';
import type { SafeAreaHTMLProps } from '@aashu-dubey/capacitor-statusbar-safe-area';

type DefineCustomElement<
  ElementType extends HTMLElement,
  SelectedAttributes extends keyof ElementType = keyof ElementType,
> = new () => ElementType & {
  $props: HTMLAttributes & Partial<Pick<ElementType, SelectedAttributes>> & PublicProps;
};

type SafeAreaAttributes = 'mode' | 'edges';

declare module 'vue' {
  interface GlobalComponents {
    'safe-area': DefineCustomElement<SafeAreaHTMLProps, SafeAreaAttributes>;
  }
}

export {};
```

</details>

##### With SSR

The plugin and its functionalities are client-specific and might throw an error when used on the server side like [#10](https://github.com/Aashu-Dubey/capacitor-statusbar-safe-area/issues/10) and [#11](https://github.com/Aashu-Dubey/capacitor-statusbar-safe-area/issues/11), so always make sure to access the plugin on the client side only.

Here are some examples for a possible solution to use the plugin in:

- [NuxtJs (Vue)](https://github.com/Aashu-Dubey/capacitor-statusbar-safe-area/issues/10#issuecomment-1685089169)
- [NextJS (React)](https://github.com/Aashu-Dubey/capacitor-statusbar-safe-area/issues/11#issuecomment-1697267497)

#### TypeScript / DOM API

The package automatically registers `'safe-area'` in `HTMLElementTagNameMap`. Standard DOM methods like `document.querySelector('safe-area')` and `document.createElement('safe-area')` will automatically be typed as [`SafeAreaElement`](src/element.ts):

```ts
const el = document.querySelector('safe-area'); // typed as SafeAreaElement | null
if (el) {
  el.mode = 'margin';
  el.edges = 'top,bottom';
}
```

## Capacitor version support

| capacitor | plugin version       |
| --------- | -------------------- |
| v7.x      | 4.0.0                |
| v6.x      | 3.0.0                |
| v5.x      | 2.1.0                |
| v4.x      | >= 1.1.0 && <= 2.0.0 |
| v3.x      | <= 1.0.1             |

## API

<docgen-index>

* [`getStatusBarHeight()`](#getstatusbarheight)
* [`getSafeAreaInsets()`](#getsafeareainsets)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getStatusBarHeight()

```typescript
getStatusBarHeight() => Promise<{ height: number; }>
```

Get the Status bar height on Android and iOS, and on Web it returns 0.

**Returns:** <code>Promise&lt;{ height: number; }&gt;</code>

--------------------


### getSafeAreaInsets()

```typescript
getSafeAreaInsets() => Promise<SafeAreaInset>
```

Get the Safe area insets for Android and iOS, and on Web it returns 0 for all.

**Returns:** <code>Promise&lt;<a href="#safeareainset">SafeAreaInset</a>&gt;</code>

--------------------


### Interfaces


#### SafeAreaInset

| Prop         | Type                | Description                      |
| ------------ | ------------------- | -------------------------------- |
| **`top`**    | <code>number</code> | Safe Area inset value at top.    |
| **`bottom`** | <code>number</code> | Safe Area inset value at bottom. |
| **`left`**   | <code>number</code> | Safe Area inset value at left.   |
| **`right`**  | <code>number</code> | Safe Area inset value at right.  |

</docgen-api>

#### SafeAreaHTMLProps

| Prop        | Type                               | Default     | Description                                                                                                                                   |
| ----------- | ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`mode`**  | <code>'padding' \| 'margin'</code> | `'padding'` | Whether to apply safe area insets as `padding` or `margin`.                                                                                   |
| **`edges`** | <code>string</code>                | all edges   | Comma-separated list of edges to apply insets on.<br><br>For example, to apply padding only on top, left and right, `edges="top,left,right"`. |

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

Other than the above options, you can also use `safe-area` web component exported by the plugin.

#### Angular

For Angular users, you will get an error warning that this web component is unknown to the Angular compiler. This is resolved by modifying the module that declares your component to allow for custom web components.

```ts
// your-component.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

then just wrap the part you want to apply safe area padding on with `safe-area` tag as below

```html
<safe-area>
  <!-- Other content -->
</safe-area>
```

#### Others

You will have to import the plugin in your component in order to make the web component work.

<details>
<summary>React</summary>

```jsx
import '@aashu-dubey/capacitor-statusbar-safe-area';
// or with named import if you're also using other APIs from plugin
// import { SafeArea } from '@aashu-dubey/capacitor-statusbar-safe-area';

const MyComponent = () => {
  return (
    <safe-area>
      // Other content
    </safe-area>
  );
}
```

</details>

<details>
<summary>Vue</summary>

```html
<template>
  <safe-area>
    <!-- Other content -->
  </safe-area>
</template>

<script setup lang="ts">
import '@aashu-dubey/capacitor-statusbar-safe-area';
// or with named import if you're also using other APIs from plugin
// import { SafeArea } from '@aashu-dubey/capacitor-statusbar-safe-area';
</script>
```

</details>

#### Attributes

There are two attributes, that can be used with the `safe-area` web component to control it's behaviour, `mode` & `edges`.

```html
<safe-area mode="margin" edges="top,left,right"></safe-area>
```

more details [here](#safeareahtmlprops).

## Capacitor version support

| capacitor | plugin version |
| --------- | -------------- |
| v4.x      | >= 1.1.0          |
| v3.x      | <= 1.0.1       |

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
getSafeAreaInsets() => Promise<SafeAreaType>
```

Get the Safe area insets for Android and iOS, and on Web it returns 0 for all.

**Returns:** <code>Promise&lt;<a href="#safeareatype">SafeAreaType</a>&gt;</code>

--------------------


### Interfaces


#### SafeAreaType

| Prop         | Type                | Description                      |
| ------------ | ------------------- | -------------------------------- |
| **`top`**    | <code>number</code> | Safe Area inset value at top.    |
| **`bottom`** | <code>number</code> | Safe Area inset value at bottom. |
| **`left`**   | <code>number</code> | Safe Area inset value at left.   |
| **`right`**  | <code>number</code> | Safe Area inset value at right.  |

</docgen-api>

#### SafeAreaHTMLProps

| Prop        | Type                               | Description                                                                                                                                                              |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`mode`**   | <code>'padding' \| 'margin'</code> | Whether to apply safe area insets as `padding` or `margin`. default `padding`.                                                                                                          |
| **`edges`**  | <code>string</code>                | Specify the edges you want to apply safe area padding on, separated by comma.<br><br>For example, to apply padding only on top, left and right, `edges="top,left,right"`. default to all edges. |

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

## API

<docgen-index>

- [`getStatusBarHeight()`](#getstatusbarheight)
- [`getSafeAreaInsets()`](#getsafeareainsets)
- [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getStatusBarHeight()

```typescript
getStatusBarHeight() => Promise<{ height: number; }>
```

Get the Status bar height on Android and iOS, and on Web it returns 0.

**Returns:** <code>Promise&lt;{ height: number; }&gt;</code>

---

### getSafeAreaInsets()

```typescript
getSafeAreaInsets() => Promise<SafeAreaType>
```

Get the Safe area insets for Android and iOS, and on Web it returns 0 for all.

**Returns:** <code>Promise&lt;<a href="#safeareatype">SafeAreaType</a>&gt;</code>

---

### Interfaces

#### SafeAreaType

| Prop         | Type                |
| ------------ | ------------------- |
| **`top`**    | <code>number</code> |
| **`bottom`** | <code>number</code> |
| **`left`**   | <code>number</code> |
| **`right`**  | <code>number</code> |

</docgen-api>

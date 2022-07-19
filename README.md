# rn-app-tour

[![npm version](https://img.shields.io/npm/v/rn-app-tour)](https://www.npmjs.com/package/rn-app-tour)
[![npm downloads](https://img.shields.io/npm/dw/rn-app-tour)](https://www.npmjs.com/package/rn-app-tour)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Animated app tour component for React Native.

![demo gif](./docs/demo.gif)

## Quick start

### Install

```sh
yarn add rn-app-tour
# or
npm install rn-app-tour
```

### Usage

Render the `AppTour` component in your app's entry file, as the **LAST CHILD** in the `View` hierarchy (along with any other components that might be rendered there):

```js
// App.tsx
import AppTour from 'rn-app-tour';

export function App(props) {
  return (
    <>
      {/* ... */}
      <AppTour />
    </>
  );
}
```

See [Example/App.tsx](./Example/App.tsx) for a complete example.

Then use it anywhere in your app (even outside React components), by calling any `AppTour` method directly:

```js
import AppTour from 'rn-app-tour';
/* ... */
AppTour.show({
  navigation,
  borderRadiusInPercent: 100,
  modalComponent: appTourModal,
  ref: highlightRef,
  yOffset: 0,
  onBackgroundPress: () => AppTour.hide(),
});
```

See [Example/Screens/HomeScreen.tsx](./Example/Screens/HomeScreen.tsx) for a complete example.

## Run example

### ios

```sh
npm run example:ios
```

### android

```sh
npm run example:android
```

## License

ISC

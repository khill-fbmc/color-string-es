# color-string-es

> library for parsing and generating CSS color strings.

## Install

With [npm](http://npmjs.org/):

```console
$ npm install color-string-es // <= NOT PUBLISHED YET - 5/27/24
```

## Usage

```js
import * as colorString from "color-string-es";
```

### Parsing

```js
colorString.get("#FFF"); // {model: 'rgb', value: [255, 255, 255, 1]}
colorString.get("#FFFA"); // {model: 'rgb', value: [255, 255, 255, 0.67]}
colorString.get("#FFFFFFAA"); // {model: 'rgb', value: [255, 255, 255, 0.67]}
colorString.get("hsl(360, 100%, 50%)"); // {model: 'hsl', value: [0, 100, 50, 1]}
colorString.get("hsl(360 100% 50%)"); // {model: 'hsl', value: [0, 100, 50, 1]}
colorString.get("hwb(60, 3%, 60%)"); // {model: 'hwb', value: [60, 3, 60, 1]}

colorString.getRGB("#FFF"); // [255, 255, 255, 1]
colorString.getRGB("blue"); // [0, 0, 255, 1]
colorString.getRGB("rgba(200, 60, 60, 0.3)"); // [200, 60, 60, 0.3]
colorString.getRGB("rgba(200 60 60 / 0.3)"); // [200, 60, 60, 0.3]
colorString.getRGB("rgba(200 60 60 / 30%)"); // [200, 60, 60, 0.3]
colorString.getRGB("rgb(200, 200, 200)"); // [200, 200, 200, 1]
colorString.getRGB("rgb(200 200 200)"); // [200, 200, 200, 1]

colorString.getHSL("hsl(360, 100%, 50%)"); // [0, 100, 50, 1]
colorString.getHSL("hsl(360 100% 50%)"); // [0, 100, 50, 1]
colorString.getHSL("hsla(360, 60%, 50%, 0.4)"); // [0, 60, 50, 0.4]
colorString.getHSL("hsl(360 60% 50% / 0.4)"); // [0, 60, 50, 0.4]

colorString.getHWB("hwb(60, 3%, 60%)"); // [60, 3, 60, 1]
colorString.getHWB("hwb(60, 3%, 60%, 0.6)"); // [60, 3, 60, 0.6]

colorString.getRGB("invalid color string"); // null
```

### Generation

```js
colorString.toHex([255, 255, 255]); // "#FFFFFF"
colorString.toHex([0, 0, 255, 0.4]); // "#0000FF66"
colorString.toHex([0, 0, 255], 0.4); // "#0000FF66"
colorString.toRGB([255, 255, 255]); // "rgb(255, 255, 255)"
colorString.toRGB([0, 0, 255, 0.4]); // "rgba(0, 0, 255, 0.4)"
colorString.toRGB([0, 0, 255], 0.4); // "rgba(0, 0, 255, 0.4)"
colorString.toPercentRGB([0, 0, 255]); // "rgb(0%, 0%, 100%)"
colorString.toKeyword([255, 255, 0]); // "yellow"
colorString.toHSL([360, 100, 100]); // "hsl(360, 100%, 100%)"
colorString.toHWB([50, 3, 15]); // "hwb(50, 3%, 15%)"

// all functions also support swizzling
colorString.toRGB(0, [0, 255], 0.4); // "rgba(0, 0, 255, 0.4)"
colorString.toRGB([0, 0], [255], 0.4); // "rgba(0, 0, 255, 0.4)"
colorString.toRGB([0], 0, [255, 0.4]); // "rgba(0, 0, 255, 0.4)"
```

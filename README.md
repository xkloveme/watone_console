
<h1 align="center">watone console</h1>

<div align="center">

watone Console for Mobile Browsers.


```javascript
javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/@watone/console"; document.body.append(script); script.onload = function () { eruda.init(); } })();
```

## Features

* [Console](https://eruda.liriliri.io/docs/api.html#console): Display JavaScript logs.
* [Elements](https://eruda.liriliri.io/docs/api.html#elements): Check dom state.
* [Network](https://eruda.liriliri.io/docs/api.html#network): Show requests status.
* [Resources](https://eruda.liriliri.io/docs/api.html#resources): Show localStorage, cookie information.
* [Info](https://eruda.liriliri.io/docs/api.html#info): Show url, user agent info.
* [Snippets](https://eruda.liriliri.io/docs/api.html#snippets): Include snippets used most often.
* [Sources](https://eruda.liriliri.io/docs/api.html#sources): Html, js, css source viewer.

## Install

You can get it on npm.

```bash
npm install @watone/console --save
# or
pnpm  add @watone/console --save
# or
yarn install @watone/console --save
```

Add this script to your page.

```html
<script src="node_modules/@watone/console/eruda.js"></script>
<script>eruda.init();</script>
```

It's also available on [jsDelivr](https://www.jsdelivr.com/package/npm/@watone/console)

```html
<script src="//cdn.jsdelivr.net/npm/@watone/console"></script>
<script>eruda.init();</script>
```

The JavaScript file size is quite huge(about 100kb gzipped) and therefore not suitable to include in mobile pages. It's recommended to make sure eruda is loaded only when eruda is set to true on url(http://example.com/?eruda=true), for example:

```javascript
;(function () {
    var src = '//cdn.jsdelivr.net/npm/@watone/console';
    if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();
```

If you are using modern JavaScript tooling, you can dynamically import it.

```javascript
if (import.meta.env.MODE === 'development') {
    import('eruda').then(eruda => eruda.default.init());
}
```

## Configuration

When initialization, a configuration object can be passed in.

* container: Container element. If not set, it will append an element directly
under html root element.
* tool: Choose which default tools you want, by default all will be added.

For more information, please check the [documentation](https://eruda.liriliri.io/docs/api.html).

```javascript
let el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
    container: el,
    tool: ['console', 'elements']
});
```

## Plugins

* [eruda-monitor](https://github.com/liriliri/eruda-monitor): Display page fps and memory.
* [eruda-features](https://github.com/liriliri/eruda-features): Browser feature detections.
* [eruda-timing](https://github.com/liriliri/eruda-timing): Show performance and resource timing.
* [eruda-code](https://github.com/liriliri/eruda-code): Run JavaScript code.
* [eruda-benchmark](https://github.com/liriliri/eruda-benchmark): Run JavaScript benchmarks.
* [eruda-geolocation](https://github.com/liriliri/eruda-geolocation): Test geolocation.
* [eruda-orientation](https://github.com/liriliri/eruda-orientation): Test orientation api.
* [eruda-touches](https://github.com/liriliri/eruda-touches): Visualize screen touches.

If you want to create a plugin yourself, follow the guides [here](https://eruda.liriliri.io/docs/plugin.html).

## Related Projects

* [eruda-android](https://github.com/liriliri/eruda-android): Simple webview with eruda loaded automatically.
* [chii](https://github.com/liriliri/chii): Remote debugging tool.
* [chobitsu](https://github.com/liriliri/chobitsu): Chrome devtools protocol JavaScript implementation.
* [licia](https://github.com/liriliri/licia): Utility library used by eruda.
* [luna](https://github.com/liriliri/luna): UI components used by eruda.
* [vivy](https://github.com/liriliri/vivy-docs): Icon image generation.

## Third Party

* [eruda-pixel](https://github.com/Faithree/eruda-pixel): UI pixel restoration tool.
* [eruda-webpack-plugin](https://github.com/huruji/eruda-webpack-plugin): Eruda webpack plugin.
* [eruda-vue-devtools](https://github.com/Zippowxk/vue-devtools-plugin): Eruda Vue-devtools plugin.

## Backers

<a rel="noreferrer noopener" href="https://opencollective.com/eruda" target="_blank"><img src="https://opencollective.com/eruda/backers.svg?width=890"></a>

## Contribution

Read [Contributing Guide](.github/CONTRIBUTING.md) for development setup instructions.

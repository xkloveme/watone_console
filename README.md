
<h1 align="center">watone console</h1>


watone Console for Mobile Browsers.


```javascript
javascript:(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/@watone/console"; document.body.append(script); script.onload = function () { wtConsole.init(); } })();
```

## Features

* [Console](https://wtConsole.liriliri.io/docs/api.html#console): Display JavaScript logs.
* [Elements](https://wtConsole.liriliri.io/docs/api.html#elements): Check dom state.
* [Network](https://wtConsole.liriliri.io/docs/api.html#network): Show requests status.
* [Resources](https://wtConsole.liriliri.io/docs/api.html#resources): Show localStorage, cookie information.
* [Info](https://wtConsole.liriliri.io/docs/api.html#info): Show url, user agent info.
* [Snippets](https://wtConsole.liriliri.io/docs/api.html#snippets): Include snippets used most often.
* [Sources](https://wtConsole.liriliri.io/docs/api.html#sources): Html, js, css source viewer.

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
<script src="node_modules/@watone/console/wtConsole.js"></script>
<script>wtConsole.init();</script>
```

It's also available on [jsDelivr](https://www.jsdelivr.com/package/npm/@watone/console)

```html
<script src="//cdn.jsdelivr.net/npm/@watone/console"></script>
<script>wtConsole.init();</script>
```

The JavaScript file size is quite huge(about 100kb gzipped) and therefore not suitable to include in mobile pages. It's recommended to make sure wtConsole is loaded only when wtConsole is set to true on url(http://example.com/?wtConsole=true), for example:

```javascript
;(function () {
    var src = '//cdn.jsdelivr.net/npm/@watone/console';
    if (!/wtConsole=true/.test(window.location) && localStorage.getItem('active-wtConsole') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>wtConsole.init();</scr' + 'ipt>');
})();
```

If you are using modern JavaScript tooling, you can dynamically import it.

```javascript
if (import.meta.env.MODE === 'development') {
    import('wtConsole').then(wtConsole => wtConsole.default.init());
}
```

## Configuration

When initialization, a configuration object can be passed in.

* container: Container element. If not set, it will append an element directly
under html root element.
* tool: Choose which default tools you want, by default all will be added.

For more information, please check the [documentation](https://wtConsole.liriliri.io/docs/api.html).

```javascript
let el = document.createElement('div');
document.body.appendChild(el);

wtConsole.init({
    container: el,
    tool: ['console', 'elements']
});
```

## Plugins

* [wtConsole-monitor](https://github.com/liriliri/wtConsole-monitor): Display page fps and memory.
* [wtConsole-features](https://github.com/liriliri/wtConsole-features): Browser feature detections.
* [wtConsole-timing](https://github.com/liriliri/wtConsole-timing): Show performance and resource timing.
* [wtConsole-code](https://github.com/liriliri/wtConsole-code): Run JavaScript code.
* [wtConsole-benchmark](https://github.com/liriliri/wtConsole-benchmark): Run JavaScript benchmarks.
* [wtConsole-geolocation](https://github.com/liriliri/wtConsole-geolocation): Test geolocation.
* [wtConsole-orientation](https://github.com/liriliri/wtConsole-orientation): Test orientation api.
* [wtConsole-touches](https://github.com/liriliri/wtConsole-touches): Visualize screen touches.

If you want to create a plugin yourself, follow the guides [here](https://wtConsole.liriliri.io/docs/plugin.html).

## Related Projects

* [wtConsole-android](https://github.com/liriliri/wtConsole-android): Simple webview with wtConsole loaded automatically.
* [chii](https://github.com/liriliri/chii): Remote debugging tool.
* [chobitsu](https://github.com/liriliri/chobitsu): Chrome devtools protocol JavaScript implementation.
* [licia](https://github.com/liriliri/licia): Utility library used by wtConsole.
* [luna](https://github.com/liriliri/luna): UI components used by wtConsole.
* [vivy](https://github.com/liriliri/vivy-docs): Icon image generation.

## Third Party

* [wtConsole-pixel](https://github.com/Faithree/wtConsole-pixel): UI pixel restoration tool.
* [wtConsole-webpack-plugin](https://github.com/huruji/wtConsole-webpack-plugin): wtConsole webpack plugin.
* [wtConsole-vue-devtools](https://github.com/Zippowxk/vue-devtools-plugin): wtConsole Vue-devtools plugin.

## Backers

<a rel="noreferrer noopener" href="https://opencollective.com/wtConsole" target="_blank"><img src="https://opencollective.com/wtConsole/backers.svg?width=890"></a>

## Contribution

Read [Contributing Guide](.github/CONTRIBUTING.md) for development setup instructions.

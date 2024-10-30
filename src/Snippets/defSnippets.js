import logger from '../lib/logger'
import emitter from '../lib/emitter'
import Url from 'licia/Url'
import now from 'licia/now'
import startWith from 'licia/startWith'
import $ from 'licia/$'
import upperFirst from 'licia/upperFirst'
import loadJs from 'licia/loadJs'
import trim from 'licia/trim'
import LunaModal from 'luna-modal'
import { isErudaEl } from '../lib/util'
import evalCss from '../lib/evalCss'

let style = null

export default [
  {
    name: 'Border All',
    fn() {
      if (style) {
        evalCss.remove(style)
        style = null
        return
      }

      style = evalCss(
        '* { outline: 2px dashed #707d8b; outline-offset: -3px; }',
        document.head
      )
    },
    desc: 'Add color borders to all elements',
  },
  {
    name: 'Refresh Page',
    fn() {
      const url = new Url()
      url.setQuery('timestamp', now())

      window.location.replace(url.toString())
    },
    desc: 'Add timestamp to url and refresh',
  },
  {
    name: 'Search Text',
    fn() {
      LunaModal.prompt('Enter the text').then((keyword) => {
        if (!keyword || trim(keyword) === '') {
          return
        }

        search(keyword)
      })
    },
    desc: 'Highlight given text on page',
  },
  {
    name: 'Edit Page',
    fn() {
      const body = document.body

      body.contentEditable = body.contentEditable !== 'true'
    },
    desc: 'Toggle body contentEditable',
  },
  {
    name: 'Fit Screen',
    // https://achrafkassioui.com/birdview/
    fn() {
      const body = document.body
      const html = document.documentElement
      const $body = $(body)
      if ($body.data('scaled')) {
        window.scrollTo(0, +$body.data('scaled'))
        $body.rmAttr('data-scaled')
        $body.css('transform', 'none')
      } else {
        const documentHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        )
        const viewportHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        )
        const scaleVal = viewportHeight / documentHeight
        $body.css('transform', `scale(${scaleVal})`)
        $body.data('scaled', window.scrollY)
        window.scrollTo(0, documentHeight / 2 - viewportHeight / 2)
      }
    },
    desc: 'Scale down the whole page to fit screen',
  },
  {
    name: 'Load Monitor Plugin',
    fn() {
      loadPlugin('monitor')
    },
    desc: 'Display page fps and memory',
  },
  {
    name: 'Load Features Plugin',
    fn() {
      loadPlugin('features')
    },
    desc: 'Browser feature detections',
  },
  {
    name: 'Load Timing Plugin',
    fn() {
      loadPlugin('timing')
    },
    desc: 'Show performance and resource timing',
  },
  {
    name: 'Load Code Plugin',
    fn() {
      loadPlugin('code')
    },
    desc: 'Edit and run JavaScript',
  },
  {
    name: 'Load Benchmark Plugin',
    fn() {
      loadPlugin('benchmark')
    },
    desc: 'Run JavaScript benchmarks',
  },
  {
    name: 'Load Geolocation Plugin',
    fn() {
      loadPlugin('geolocation')
    },
    desc: 'Test geolocation',
  },
  {
    name: 'Load Orientation Plugin',
    fn() {
      loadPlugin('orientation')
    },
    desc: 'Test orientation api',
  },
  {
    name: 'Load Touches Plugin',
    fn() {
      loadPlugin('touches')
    },
    desc: 'Visualize screen touches',
  },
]

evalCss(require('./searchText.scss'), document.head)

function search(text) {
  const root = document.body
  const regText = new RegExp(text, 'ig')

  traverse(root, (node) => {
    const $node = $(node)

    if (!$node.hasClass('eruda-search-highlight-block')) return

    return document.createTextNode($node.text())
  })

  traverse(root, (node) => {
    if (node.nodeType !== 3) return

    let val = node.nodeValue
    val = val.replace(
      regText,
      (match) => `<span class="eruda-keyword">${match}</span>`
    )
    if (val === node.nodeValue) return

    const $ret = $(document.createElement('div'))

    $ret.html(val)
    $ret.addClass('eruda-search-highlight-block')

    return $ret.get(0)
  })
}

function traverse(root, processor) {
  const childNodes = root.childNodes

  if (isErudaEl(root)) return

  for (let i = 0, len = childNodes.length; i < len; i++) {
    const newNode = traverse(childNodes[i], processor)
    if (newNode) root.replaceChild(newNode, childNodes[i])
  }

  return processor(root)
}

function loadPlugin(name) {
  const globalName = 'wtConsole' + upperFirst(name)
  if (window[globalName]) return

  let protocol = location.protocol
  if (!startWith(protocol, 'http')) protocol = 'http:'

  loadJs(
    `${protocol}//cdn.jsdelivr.net/npm/eruda-${name}@${pluginVersion[name]}`,
    (isLoaded) => {
      if (!isLoaded || !window[globalName])
        return logger.error('Fail to load plugin ' + name)

      emitter.emit(emitter.ADD, window[globalName])
      emitter.emit(emitter.SHOW, name)
    }
  )
}

const pluginVersion = {
  monitor: '1.0.1',
  features: '2.0.0',
  timing: '2.0.1',
  code: '2.1.0',
  benchmark: '2.0.1',
  geolocation: '2.0.0',
  dom: '2.0.0',
  orientation: '2.0.0',
  touches: '2.0.0',
}

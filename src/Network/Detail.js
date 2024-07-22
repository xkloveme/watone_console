import trim from 'licia/trim'
import isEmpty from 'licia/isEmpty'
import map from 'licia/map'
import each from 'licia/each'
import escape from 'licia/escape'
import copy from 'licia/copy'
import isJson from 'licia/isJson'
import Emitter from 'licia/Emitter'
import truncate from 'licia/truncate'
import { decrypt } from './jsencrypt'

import { classPrefix as c } from '../lib/util'

export default class Detail extends Emitter {
  constructor($container, devtools, token) {
    super()
    this._$container = $container
    this._devtools = devtools
    this._token = token
    this._detailData = {}
    this._bindEvent()
  }

  async show (data) {
    if (data.resTxt && trim(data.resTxt) === '') {
      delete data.resTxt
    }
    if (isEmpty(data.resHeaders)) {
      delete data.resHeaders
    }
    if (isEmpty(data.reqHeaders)) {
      delete data.reqHeaders
    }

    let postData = ''
    if (data.data) {
      postData = `<pre class="${c('data')}">${escape(data.data)}</pre>`
    }

    let reqHeaders = '<tr><td>Empty</td></tr>'
    if (data.reqHeaders) {
      reqHeaders = map(data.reqHeaders, (val, key) => {
        return `<tr>
          <td class="${c('key')}">${escape(key)}</td>
          <td>${escape(val)}</td>
        </tr>`
      }).join('')
    }

    let resHeaders = '<tr><td>Empty</td></tr>'
    if (data.resHeaders) {
      resHeaders = map(data.resHeaders, (val, key) => {
        return `<tr>
          <td class="${c('key')}">${escape(key)}</td>
          <td>${escape(val)}</td>
        </tr>`
      }).join('')
    }

    let resTxt = ''
    let resTxtjiemi = ''
    if (data.resTxt) {
      let text = data.resTxt
      if (text.length > MAX_RES_LEN) {
        text = truncate(text, MAX_RES_LEN)
      }
      resTxt = `<pre class="${c('response')}">${escape(text)}</pre>`


      let newCode = decrypt(text.replace(/['"“‘]/g, ''), this._token)
      resTxtjiemi = `<pre class="${c('responsejiemi')}">${escape(newCode)}</pre>`
      data['resTxtjiemi']  = newCode
    }

    const html = `<div class="${c('control')}">
      <span class="${c('icon-arrow-left back')}"></span>
      <span class="${c('icon-delete back')}"></span>
      <span class="${c('url')}">${escape(data.url)}</span>
      <span class="${c('icon-copy copy-res')}"></span>
    </div>
    <div class="${c('http')}">
      ${postData}
      <div class="${c('section')}">
      <h2>Response Headers</h2>
      <table class="${c('headers')}">
      <tbody>
        ${resHeaders}
      </tbody>
    </table>
      </div>
      <div class="${c('section')}">
      <h2>响应数据</h2>
      <table class="${c('headers')}">
        <tbody>
        ${resTxt}
        </tbody>
      </table>
      <h2>解密数据</h2>
      <table class="${c('headers')}">
        <tbody>
        ${resTxtjiemi}
        </tbody>
      </table>
    </div>
      <div class="${c('section')}">
        <h2>Request Headers</h2>
        <table class="${c('headers')}">
          <tbody>
            ${reqHeaders}
          </tbody>
        </table>
      </div>
    </div>`

    this._$container.html(html).show()
    this._detailData = data
  }


  hide () {
    this._$container.hide()
    this.emit('hide')
  }
  _copyRes = () => {
    const detailData = this._detailData

    let data = `请求地址：${detailData.url} \n
    ${detailData.method} ${detailData.url} ${detailData.status}\n`
    if (!isEmpty(detailData.data)) {
      data += '\nRequest Data\n\n'
      data += `${detailData.data}\n`
    }
    if (!isEmpty(detailData.reqHeaders)) {
      data += '\nRequest Headers\n\n'
      each(detailData.reqHeaders, (val, key) => (data += `${key}: ${val}\n`))
    }
    if (!isEmpty(detailData.resHeaders)) {
      data += '\nResponse Headers\n\n'
      each(detailData.resHeaders, (val, key) => (data += `${key}: ${val}\n`))
    }
    if (detailData.resTxt) {
      let newCode = decrypt(detailData.resTxt.replace(/['"“‘]/g, ''), this._token)
      data += `\n响应数据：
      ${detailData.resTxt}\n`
      data += `\n响应解密数据：
      ${newCode}\n`
    }
    console.log(data)
    copy(data)
    this._devtools.notify('Copied', { icon: 'success' })
  }
  // 定义事件处理函数
  _bindEvent () {
    const devtools = this._devtools

    this._$container
      .on('click', c('.back'), () => this.hide())
      .on('click', c('.copy-res'), this._copyRes)
      .on('click', c('.http .response'), () => {
        const data = this._detailData
        const resTxt = data.resTxt

        if (isJson(resTxt)) {
          return showSources('object', resTxt)
        }

        switch (data.subType) {
          case 'css':
            return showSources('css', resTxt)
          case 'html':
            return showSources('html', resTxt)
          case 'javascript':
            return showSources('js', resTxt)
          case 'json':
            return showSources('object', resTxt)
        }
        switch (data.type) {
          case 'image':
            return showSources('img', data.url)
        }
      })
      .on('click', c('.http .responsejiemi'), () => {
        const data = this._detailData
        const resTxt = data.resTxtjiemi

        if (isJson(resTxt)) {
          return showSources('object', resTxt)
        }

        switch (data.subType) {
          case 'css':
            return showSources('css', resTxt)
          case 'html':
            return showSources('html', resTxt)
          case 'javascript':
            return showSources('js', resTxt)
          case 'json':
            return showSources('object', resTxt)
        }
        switch (data.type) {
          case 'image':
            return showSources('img', data.url)
        }
      })

    const showSources = (type, data) => {
      const sources = devtools.get('sources')
      if (!sources) {
        return
      }

      sources.set(type, data)

      devtools.showTool('sources')
    }
  }
}

const MAX_RES_LEN = 1000000

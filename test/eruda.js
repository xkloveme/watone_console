describe('devTools', function () {
  describe('init', function () {
    it('destroy', function () {
      wtConsole.destroy()

      expect($('#wtConsole')).toHaveLength(0)
    })

    it('init', function () {
      let container = document.createElement('div')
      container.id = 'wtConsole'
      document.body.appendChild(container)

      wtConsole.init({
        container: container,
        tool: [],
        useShadowDom: false,
      })

      let $wtConsole = $('#wtConsole')
      expect($wtConsole.find('.wtConsole-dev-tools')).toHaveLength(1)
    })
  })

  describe('tool', function () {
    it('add', function () {
      wtConsole.add({
        name: 'test',
        init: function ($el) {
          this._$el = $el
          $el.html('Test Plugin')
        },
      })

      expect($('.wtConsole-test')).toContainText('Test Plugin')
    })

    it('show', function () {
      let $tool = $('.wtConsole-test')
      expect($tool).toBeHidden()
      wtConsole.show('test')
      expect($tool).toHaveCss({ display: 'block' })
    })

    it('remove', function () {
      wtConsole.remove('test')
      expect($('.wtConsole-test')).toHaveLength(0)
    })
  })

  describe('display', function () {
    it('show', function () {
      wtConsole.show()
      expect($('.wtConsole-dev-tools')).toHaveCss({ display: 'block' })
    })

    it('hide', function (done) {
      wtConsole.hide()
      setTimeout(function () {
        expect($('.wtConsole-dev-tools')).toBeHidden()
        done()
      }, 500)
    })
  })

  describe('scale', function () {
    it('get', function () {
      wtConsole.scale(1)
      expect(wtConsole.scale()).toBe(1)
    })
  })
})

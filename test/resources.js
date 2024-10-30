describe('resources', function () {
  let $tool = $('.wtConsole-resources')

  beforeEach(function () {
    wtConsole.show('resources')
  })

  describe('localStorage', function () {
    it('show', function () {
      localStorage.clear()
      localStorage.setItem('testKey', 'testVal')
    })

    it('clear', function () {
      $tool.find('.wtConsole-local-storage .wtConsole-clear-storage').click()
    })
  })

  describe('sessionStorage', function () {
    it('show', function () {
      sessionStorage.clear()
      sessionStorage.setItem('testKey', 'testVal')
    })

    it('clear', function () {
      $tool.find('.wtConsole-session-storage .wtConsole-clear-storage').click()
    })
  })

  describe('cookie', function () {
    it('show', function () {
      util.cookie.set('testKey', 'testVal')
      $tool.find('.wtConsole-refresh-cookie').click()
    })

    it('clear', function () {
      $tool.find('.wtConsole-clear-cookie').click()
    })
  })
})

describe('console', function () {
  let tool = wtConsole.get('console')
  tool.config.set('asyncRender', false)
  let $tool = $('.wtConsole-console')
  let logger = tool._logger

  function log(i) {
    return logs()[i].container
  }

  function logs() {
    return logger.displayLogs
  }

  beforeEach(function () {
    wtConsole.show('console')
    logger.clear(true)
  })

  describe('config', function () {
    let config = tool.config

    it('override console', function () {
      config.set('overrideConsole', true)
      console.log('test')
      expect($(log(0))).toContainText('test')
    })
  })

  describe('ui', function () {
    it('clear', function () {
      tool.log('test')
      $('.wtConsole-clear-console').click()
      expect($tool.find('.wtConsole-logs li')).toHaveLength(0)
    })

    it('level', function () {
      tool.log('test')
      tool.warn('test')
      expect(logs()).toHaveLength(2)
      $('.wtConsole-level[data-level="warning"]').click()
      expect(logs()).toHaveLength(1)
      $('.wtConsole-level[data-level="all"]').click()
    })
  })

  describe('execute', function () {
    it('js', function () {
      $tool.find('textarea').val('1+2')
      $('.wtConsole-execute').click()
      expect($(log(1))).toContainText('3')
    })
  })

  describe('events', function () {
    it('log', function () {
      let sum = 0
      function add(num) {
        sum += num
      }
      tool.on('log', add)
      tool.log(5)
      expect(sum).toBe(5)
      tool.log(6)
      expect(sum).toBe(11)
      tool.off('log', add)
      tool.log(1)
      expect(sum).toBe(11)
    })
  })
})

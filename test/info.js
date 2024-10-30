describe('info', function () {
  let tool = wtConsole.get('info')
  let $tool = $('.wtConsole-info')

  describe('default', function () {
    it('location', function () {
      expect($tool.find('.wtConsole-content').eq(0)).toContainText(location.href)
    })

    it('user agent', function () {
      expect($tool.find('.wtConsole-content').eq(1)).toContainText(
        navigator.userAgent
      )
    })

    it('device', function () {
      expect($tool.find('.wtConsole-content').eq(2)).toContainText(
        window.innerWidth
      )
    })

    it('system', function () {
      expect($tool.find('.wtConsole-content').eq(3)).toContainText('os')
    })

    it('about', function () {
      expect($tool.find('.wtConsole-content').eq(4)).toHaveText(/wtConsole v[\d.]+/)
    })
  })

  it('clear', function () {
    tool.clear()
    expect($tool.find('li')).toHaveLength(0)
  })

  it('add', function () {
    tool.add('test', 'wtConsole')
    expect($tool.find('.wtConsole-title')).toContainText('test')
    expect($tool.find('.wtConsole-content')).toContainText('wtConsole')
    tool.add('test', 'update')
    tool.add('test', 'update')
    expect($tool.find('.wtConsole-content')).toContainText('update')
  })

  it('get', function () {
    expect(tool.get()).toEqual([{ name: 'test', val: 'update' }])
    expect(tool.get('test')).toBe('update')
    expect(tool.get('test2')).not.toBeDefined()
  })

  it('remove', function () {
    tool.remove('test')
    expect($tool.find('li')).toHaveLength(0)
  })
})

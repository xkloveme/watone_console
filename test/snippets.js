describe('snippets', function () {
  let tool = wtConsole.get('snippets')
  let $tool = $('.wtConsole-snippets')

  describe('default', function () {
    it('border all', function () {
      expect($tool.find('.wtConsole-name').eq(0)).toContainText('Border All')

      let $body = $('body')
      let $btn = $tool.find('.wtConsole-run').eq(0)

      $btn.click()
      expect($body).toHaveCss({ outlineWidth: '2px' })
      $btn.click()
      expect($body).toHaveCss({ outlineWidth: '0px' })
    })

    it('refresh page', function () {
      expect($tool.find('.wtConsole-name').eq(1)).toContainText('Refresh Page')
    })

    it('search text', function () {
      expect($tool.find('.wtConsole-name').eq(2)).toContainText('Search Text')
    })

    it('edit page', function () {
      expect($tool.find('.wtConsole-name').eq(3)).toContainText('Edit Page')

      let $body = $('body')
      let $btn = $tool.find('.wtConsole-run').eq(3)

      $btn.click()
      expect($body).toHaveAttr('contenteditable', 'true')
      $btn.click()
      expect($body).toHaveAttr('contenteditable', 'false')
    })
  })

  it('clear', function () {
    tool.clear()
    expect($tool.find('.wtConsole-name')).toHaveLength(0)
  })

  it('add', function () {
    tool.add(
      'Test',
      function () {
        console.log('wtConsole')
      },
      'This is the description'
    )
    expect($tool.find('.wtConsole-name')).toContainText('Test')
    expect($tool.find('.wtConsole-description')).toContainText(
      'This is the description'
    )
  })

  it('remove', function () {
    tool.remove('Test')
    expect($tool.find('.wtConsole-name')).toHaveLength(0)
  })
})

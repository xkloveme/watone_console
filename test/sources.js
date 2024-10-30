describe('sources', function () {
  let tool = wtConsole.get('sources')
  let $tool = $('.wtConsole-sources')

  beforeEach(function () {
    wtConsole.show('sources')
  })

  it('raw', function () {
    tool.set('raw', '/* test */')
  })
})

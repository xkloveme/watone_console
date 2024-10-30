describe('elements', function () {
  let tool = wtConsole.get('elements')

  beforeEach(function () {
    wtConsole.show('elements')
  })

  describe('api', function () {
    it('select element', function () {
      tool.select(document.body)
    })
  })
})

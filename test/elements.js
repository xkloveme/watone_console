describe('elements', function () {
  let tool = eruda.get('elements')

  beforeEach(function () {
    eruda.show('elements')
  })

  describe('api', function () {
    it('select element', function () {
      tool.select(document.body)
    })
  })
})

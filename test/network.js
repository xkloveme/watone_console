describe('network', function () {
  beforeEach(function () {
    wtConsole.show('network')
  })

  describe('request', function () {
    it('xhr', function (done) {
      $('.wtConsole-clear-xhr').click()
      util.ajax.get(window.location.toString(), function () {
        expect($('.wtConsole-requests .luna-data-grid-node')).toHaveLength(1)
        done()
      })
    })
  })
})

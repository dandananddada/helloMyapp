describe('angularjs homepage', function() {
  
	beforeEach(function() {
		browser.get('http://localhost:9001//');
	});

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Myapp');
  });

});
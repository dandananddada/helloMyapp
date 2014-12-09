var bookItemService = angular.module('bookItemService', [])
	
bookItemService.factory('bookItemService', function($http) {
	return {
		get : function() {
			return $http.get('/data/books.json');
		}
	}
});
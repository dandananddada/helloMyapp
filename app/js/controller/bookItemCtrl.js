var app = angular.module('bookItemController',[]);



app.controller('BookItemCtrl', function($http,bookItemService){
	var store = this;
	this.books = [];
	
	bookItemService.get()
		.success(function(data){
			store.books = data;
		});

	this.purchase = function()
	{
		alert("你确定有钱没地方花要买这本书么？");
	}
});


app.directive('bookItem',function(){
	return {
		restrict : 'E', //element
		templateUrl : 'html/book-item.html',
	}
})
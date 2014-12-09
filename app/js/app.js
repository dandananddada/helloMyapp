var app = angular.module('app', []);




app.controller('TimeCtrl', ['$http','$scope', function($http,$scope){
	$scope.times = []
	$http.get('/data/time.json').success(function(data){
		$scope.times = data;
	});
}])
app.controller('ColorCtrl',['$http','$scope',function($http,$scope){
	$scope.colors = []
	$http.get('/data/color.json').success(function(data){
		$scope.colors = data;
	});
}])
app.controller('DateCtrl',['$http','$scope',function($http,$scope){
	$scope.dates = [];
	$http.get('/data/date.json').success(function(data){
		$scope.dates = data;
	});
}])

app.directive('header', function(){
	return {
			restrict : 'E',
			templateUrl : 'html/layout/header.html',
		}
});
app.directive('aaaa', function(){
	return {
			restrict : 'E',
			templateUrl : 'html/layout/footer.html',
		}
});
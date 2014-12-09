var panelController = angular.module('panelController',[]);

panelController.controller('PanelCtrl',function(){
	this.tab =1;
	this.setTab = function(panelID)
	{
		this.tab = panelID;
	}
	this.isActive = function(panelID)
	{
		return this.tab === panelID;
	}

	this.messages = [
		{author:'A水军',content:'这是我见过最好的讲Angularjs的书'},
		{author:'一个喷子',content:'楼上是sb吧'}
	];

	this.submit = function()
	{
		this.messages.push({author:this.message.author,content:this.message.content});
		this.message.author = "";
		this.message.content = "";
	}
})

panelController.directive('panel',function(){
	return {
		restrict : 'E',
		templateUrl : 'html/panel.html'
	}
})

angular.module('rankingModule').config(['ChartJsProvider', function (ChartJsProvider) {
    	// Configure all charts
	ChartJsProvider.setOptions({
		// chartColors: ['#F54EA1', '#ef7954','#f1a12d','#ffeb3b'],
		responsive: false
	});
}])


angular.module('rankingModule').component('rankingBarChartComponent', {
	bindings: {
			ranking: '<'
		},
	templateUrl: '/client/ranking-app/ranking-bar-chart/ranking-bar-chart.template.html',

	controller:function ($scope) {

		var that = this;

		$scope.graph = {};
		$scope.graphOptions = {
			colors:[{
				backgroundColor:"#F00",
				hoverBackgroundColor:"#FF0",
				borderColor:"#0F0",
				hoverBorderColor:"#00F"
			}]
		}

		this.$onChanges = function(changes) {
			//if ranking property changed
			if (!angular.isUndefined(changes.ranking)) {
				
				updateGraphData();
			}
		}

		function updateGraphData(){

			$scope.graph = {
				labels:[],
				series:['Top 5 Websites Ranking'],
				data:[[]]
			}

			for(var i=(that.ranking.length -1); i>=0 ; i--){
				let snapshot = that.ranking[i];

				$scope.graph.labels.push(snapshot.website.hostname);
				$scope.graph.data[0].push(snapshot.number_of_visites);

			}
		}
	}

});
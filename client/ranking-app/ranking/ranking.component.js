angular.module('rankingModule').component('rankingComponent', {

	templateUrl: '/client/ranking-app/ranking/ranking.template.html',

	controller:function rankingController($scope,$mdDialog,$window,$http) {
		$scope.date = new Date();
		$scope.ranking = [];
		$scope.allowedDates = [];

		$scope.getData = function(){
			
			$scope.date = undefined;

			$http({
				method: 'GET',
				url: '/api/top5'
			}).then(function successCallback(response) {
				console.log(response)
				$scope.ranking = response.data.ranking;
				$scope.allowedDates = response.data.allowedDates
				$scope.date = new Date($scope.ranking[0].date);
			}, function errorCallback(response) {
			});
		}

		$scope.getData();

		$scope.onDateChanged = function(){
			$http({
				method: 'GET',
				url: '/api/top5',
				params:{
					date:$scope.date
				}
			}).then(function successCallback(response) {
				$scope.ranking = response.data.ranking;
				$scope.date = new Date($scope.ranking[0].date);
			}, function errorCallback(response) {
			});
		}

		$scope.onlySomeDatesPredicate = function(date) {

			let found = $scope.allowedDates.find(dateItem => {
				dateItem = new Date(dateItem);
				return (dateItem.getDate() == date.getDate() && dateItem.getMonth() == date.getMonth() && dateItem.getFullYear() == date.getFullYear())
			})
			
			return found? true:false;
		};
	}
});


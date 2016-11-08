angular.module('myApp', ['angular-table'])
	.controller("ProdsCtrl", ["$scope", "$http", "$filter", function($scope, $http, $filter) {
	
		var vm = $scope;
		vm.products = [];

		vm.filteredList = vm.products;
	
		vm.loadProducts = function() {
			var httpRequest = $http({
				method: 'GET',
				url: sourceUrl,
				data: ''
			}).success(function(data, status) {
				vm.products = data;
				vm.filteredList = data;
				vm.total_productos = data.length;
			});
		};
		
		vm.config = {
			itemsPerPage: 20,
			fillLastPage: true,
			maxPages: 10
		};

		vm.updateFilteredList = function() {
			vm.filteredList = $filter("filter")(vm.products, vm.searchText);
		}
		
		vm.loadProducts();

}]).directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  });

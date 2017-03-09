angular.module('app.controllers', [])
  
.controller('coffeeTimeCtrl', ['$scope', '$state',
function ($scope, $state) {
    
}])
   
.controller('homeCtrl', ['$scope', '$state',
function ($scope, $state) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
        $scope.$root.showMenuIcon = true;
    });
    $scope.input = {
        searchField: ""
    }
    $scope.searchResults = {};
    $scope.searchFieldChange = function () {
        var searchField = $scope.input.searchField;
        if (searchField.length > 3) {
            setTimeout(function(){
                if (searchField == $scope.input.searchField) {
                    searchCafes.search(searchField, function searchDone(err, content) {
                      if (err) {
                        console.error(err);
                        return;
                      }
                      $scope.searchResults = content.hits;
                      $scope.$apply();
                      for (var h in content.hits) {
                        //TODO: visualize
                        console.log(content.hits[h]);
                      }
                    });
                }
            }, 2000);
        } else {
            $scope.searchResults = {};
        }
    }
    window.mapClick = function (cafe) {
        $scope.clickSearchResult(cafe)
    }
    $scope.clickSearchResult = function (cafe) {
        $state.go("coffeeShop", {"cafe": cafe});
    }
}])
   
.controller('settingsCtrl', ['$scope', '$state',
function ($scope, $state) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
        $scope.$root.showMenuIcon = true;
    });

}])

.controller('paymentCtrl', ['$scope', '$state',
function ($scope, $state) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
        $scope.$root.showMenuIcon = true;
    });

}])
      
.controller('loginCtrl', ['$scope', '$state',
function ($scope, $state) {


}])
   
.controller('signupCtrl', ['$scope', '$state',
function ($scope, $state) {


}])
   
.controller('coffeeShopCtrl', ['$scope', '$state', '$ionicSlideBoxDelegate',
function ($scope, $state, $ionicSlideBoxDelegate) {
    $scope.menuCategory = "0";
    $scope.$on("$ionicView.enter", function (scopes, states) {
        $scope.$root.showMenuIcon = false;
        $scope.cafe = $state.params.cafe;
        $ionicSlideBoxDelegate.update();
        $scope.menu = $scope.cafe.menu;
        $scope.menuCategoryChange = function(){
            $scope.menu = {};
            console.log(this);
            if ($scope.menuCategory != "0") {
                for (i in $scope.cafe.menu) {
                    if ($scope.cafe.menu.hasOwnProperty(i)) {
                        var item = $scope.cafe.menu[i];
                        if (parseInt(item.type) == parseInt($scope.menuCategory)) $scope.menu[i] = item;
                    }
                }
            } else {
                $scope.menu = $scope.cafe.menu;
            }
        }
    });
}])
   
.controller('orderCtrl', ['$scope', '$state',
function ($scope, $state) {


}])
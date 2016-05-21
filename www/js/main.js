angular.module('starter.Main', [])
  .controller('MainCtrl', function ($scope, $log, $ionicLoading, MainService) {

    $scope.data = {};

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $scope.getPersonList();
    });

    $scope.getPersonList = function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });
      MainService.getPerson()
        .then(function (data) {
          $log.info(data);
          $ionicLoading.hide();
          $scope.person = data.rows;
        }, function (err) {
          $ionicLoading.hide();
          $log.error(err);
        });
    };

    $scope.doSearch = function () {
      if ($scope.data.query) {
        $scope.person = [];
        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>'
        });
        MainService.search($scope.data.query)
          .then(function (data) {
            $ionicLoading.hide();
            $scope.person = data.rows;
          }, function (err) {
            $ionicLoading.hide();
            $log.error(err);
          });
      } else {
        alert('No query');
      }
    };

    $scope.getPersonList();

  })
  .factory('MainService', function ($q, $http) {
    var url = 'http://192.168.43.76:3000';
    return {
      getPerson: function () {
        var q = $q.defer();
        $http.post(url + '/person/list', {})
          .success(function (data) {
            q.resolve(data);
          })
          .error(function () {
            q.reject('Connection error');
          });

        return q.promise;

      },

      search: function (query) {
        var q = $q.defer();
        $http.post(url + '/person/search', {query: query})
          .success(function (data) {
            q.resolve(data);
          })
          .error(function () {
            q.reject('Connection error');
          });

        return q.promise;

      }
    }
  });
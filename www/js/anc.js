angular.module('starter.Anc', [])
  .controller('AncCtrl', function ($scope, $log, AncService) {

    $scope.anc = [];

    AncService.getList()
      .then(function (data) {
        $scope.anc = data.rows;
      }, function (err) {
        $log.error(err);
      });

  })
  .controller('AncDetailCtrl', function ($scope, $stateParams, $log, AncService) {
    $log.info($stateParams);
    AncService.getHistory($stateParams.cid)
      .then(function (data) {
        // $log.info(data);
        $scope.anc = data.rows;
      }, function (err) {
        $log.error(err);
      });
  })
  .factory('AncService', function ($q, $http) {

    var url = 'http://192.168.43.76:3000';

    return {
      getList: function () {
        var q = $q.defer();
        $http.post(url + '/anc/list', {})
          .success(function (data) {
            q.resolve(data);
          })
          .error(function () {
            q.reject('Connection failed');
          });

        return q.promise;
      },
      getHistory: function (cid) {
        var q = $q.defer();
        $http.post(url + '/anc/history', {cid: cid})
          .success(function (data) {
            q.resolve(data);
          })
          .error(function () {
            q.reject('Connection failed');
          });

        return q.promise;
      }
    };
  });
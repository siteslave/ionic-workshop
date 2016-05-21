angular.module('starter.Detail', [])
  .controller('DetailCtrl', function ($scope, $log, $stateParams, $ionicLoading, DetailService) {

    $log.info($stateParams);

    var hospcode = $stateParams.hospcode;
    var pid = $stateParams.pid;

    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });

    DetailService.getDetail(hospcode, pid)
      .then(function (data) {
        $ionicLoading.hide();
        $log.info(data);
        /*
      "HOSPCODE": "04954",
      "PID": "000003",
      "NAME": "สมศักดิ์",
      "LNAME": "สีละวัน",
      "BIRTH": "1990-11-24T17:00:00.000Z",
      "SEX": "1",
      "HOUSE": "1",
      "VILLAGE": "01",
      "CHANGWAT_NAME": "มหาสารคาม",
      "AMPUR_NAME": "กันทรวิชัย",
      "TAMBON_NAME": "คันธารราษฎร์
*/
        if (data.rows.length) {
          $scope.person = data.rows[0];
          $scope.person.fullname = data.rows[0].NAME + ' ' + data.rows[0].LNAME;
          $scope.person.address1 = data.rows[0].HOUSE + ' หมู่ ' + data.rows[0].VILLAGE;
          $scope.person.address2 = `ต.${data.rows[0].TAMBON_NAME} อ.${data.rows[0].AMPUR_NAME} จ.${data.rows[0].CHANGWAT_NAME}`;
        }

        //$scope.person.address = `บ้านเลขที่ ${data.rows[0].HOUSE} หมู่ ${data.rows[0].VILLAGE} ต.${data.rows[0].TAMBON_NAME} อ.${data.rows[0].AMPUR_NAME} จ.${data.rows[0].CHANGWAT_NAME}`;

      }, function (err) {
        $ionicLoading.hide();
        $log.error(err);
      });
  })
  .factory('DetailService', function ($q, $http) {
    var url = 'http://192.168.43.76:3000';

    return {
      getDetail: function (hospcode, pid) {
        var q = $q.defer();
        var _url = url + '/person/detail';

        $http.post(_url, { hospcode: hospcode, pid: pid })
          .success(function (data) {
            q.resolve(data);
          })
          .catch(function () {
            q.reject('Connection failed');
          });
        return q.promise;
      }
    };
  });
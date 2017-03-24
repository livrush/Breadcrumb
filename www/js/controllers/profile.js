/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */

angular.module('breadcrumb')
.controller('ProfileCtrl', function ($scope, ListFact, UserFact, Data, store) {
  $scope.user = store.get('user');

  console.log($scope.user.username);

  const populateUserTrails = () => {
    UserFact.getUser($scope.user.username)
    .then((res) => {
      ListFact.get({user_id: 1})
      .then((trails) => {
        console.log(trails);
        $scope.userTrails.push(trails[0]);
        $scope.userTrails.push(trails[1]);
        $scope.userTrails.push(trails[2]);
      });
    })
    .catch(err => console.log(err));
  };

  const populatePastTrails = () => {
    ListFact.get()
    .then((trails) => {
      $scope.pastTrails.push(trails[0]);
      $scope.pastTrails.push(trails[1]);
      $scope.pastTrails.push(trails[2]);
    });
  };

  $scope.userPic = {
    'background-image': `url('${store.get('user').profile_picture}')`,
    'background-position': 'center',
    'background-size': 'cover',
  };

  $scope.userTrails = [];

  $scope.pastTrails = [];

  populateUserTrails();
  populatePastTrails();
});

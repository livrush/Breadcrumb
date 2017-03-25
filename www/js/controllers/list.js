/* eslint no-bitwise: ["error", { "allow": ["^=", "&"] }] */
/* global TransitionType */

angular.module('breadcrumb')
.controller('ListCtrl', function ($scope, $rootScope, $state, ListFact, Data, Style) {
  $scope.specificTransport = false;
  $scope.loading = null;

  $scope.mapSrc = null;

  $scope.mapShow = Style.displayNone;

  $scope.mapToggle = (src) => {
    if (!src) {
      $scope.mapShow = Style.displayNone;
    } else {
      $scope.mapSrc = src;
      $scope.mapShow = null;
    }
  };

  $scope.toggle = index => (
    $scope.trails[index].style.height === '105px' ?
    $scope.open(index) :
    $scope.close(index)
  );

  $scope.open = (index) => {
    $scope.trails[index].style = Style.activeTrail;
    $scope.trails.forEach((trail, place) => {
      if (place !== index) {
        $scope.close(place);
      }
    });
  };

  $scope.close = (index) => {
    $scope.trails[index].style = Style.inactiveTrail;
  };

// TODO: splice deleted trail from dashboard display
  $scope.delete = (trail, index) => {
    $scope.trails.splice(index, 1);
    ListFact.del(trail);
  };

  $scope.filter = (type, value) => {
    $scope.loading = null;
    $scope.trails = ListFact.filter($scope.trails, type, value);
    $scope.loading = Style.displayNone;
    if (type === 'transport') $scope.specificTransport = true;
  };

  $scope.reset = () => {
    $scope.loading = null;
    $scope.specificTransport = false;
    $scope.trails = ListFact.filter($scope.trailsCache, 'name');
    $scope.loading = Style.displayNone;
  };

  $scope.trailsCache = ListFact.get().then((trails) => {
    $scope.trails = ListFact.filter(trails, 'name');
    $scope.loading = Style.displayNone;
    $scope.trailsCache = ListFact.filter(trails, 'name');
  });

  $scope.trails = null;

  $scope.refresh = () => {
    $scope.loading = null;
    $scope.trailsCache = ListFact.get().then((trails) => {
      $scope.trails = ListFact.filter(trails, 'name');
      $scope.loading = Style.displayNone;
      $scope.trailsCache = ListFact.filter(trails, 'name');
    });
  };

  $rootScope.$watch('refresh', () => {
    if ($rootScope.refresh) {
      $rootScope.refresh = false;
      $scope.refresh();
    }
  });

  $scope.pickTrail = (id, index) => {
    $rootScope.trailID = id;
    $scope.close(index);
  };

  // SEARCH

  $scope.rating = Data.rating();

  $scope.difficulty = Data.difficulty();

  $scope.transport = Data.transport();

  $scope.searchToggle = (type, value, fill) => {
    $scope[type] = Data.fillIcons(type, value, fill);
    $scope.search[type] = value;
  };

  $scope.search = Data.searchRequest();

  $scope.searchFilter = (request) => {
    // TODO: Can't search by username, must get user ID first
    if (request.difficulty !== 'Any') {
      request.difficulty += 1;
    }
    ListFact.get(request);
    $scope.rating = Data.rating();
    $scope.difficulty = Data.difficulty();
    $scope.transport = Data.transport();
    $scope.search = Data.searchRequest();
    $state.go('app.dashboard');
  };
});

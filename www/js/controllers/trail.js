angular.module('breadcrumb')
.controller('TrailCtrl', function ($scope, $sce, $rootScope, Data, ListFact, Geofence) {
  $scope.loading = null;

  $scope.trailID = null;

  $scope.page = {
    description: true,
    map: false,
    found: false,
    media: {},
    challenge: false,
    finish: false,
  };

  $scope.bubbles = {
    top: '320px',
  };

  $scope.crumb = 0;

  $scope.crumbs = [];

  $scope.video = () => $sce.trustAsResourceUrl($scope.crumbs[$scope.crumb].video.replace('watch?v=', 'embed/'));

  $scope.startTrail = () => {
    ListFact.get('id').then((trails) => {
      $scope.trail = trails[0];
      $scope.crumbs = trails[0].crumb;
      $scope.trailID = $rootScope.trailID;
      $scope.loading = { display: 'none' };
    });
  };

  $scope.trail = $scope.startTrail();

  $rootScope.$watch('trailID', () => {
    if ($rootScope.trailID !== $scope.trailID) {
      $scope.startTrail();
    }
  });

  $scope.switch = (type) => {
    switch (type) {
      case 'description':
        $scope.page.description = false;
        $scope.page.found = true;
        Geofence.addOrUpdate($scope.crumbs[$scope.crumb]);
        break;
      case 'found':
        $scope.page.found = true;
        $scope.page.description = false;
        break;
      case 'next':
        $scope.crumb += 1;
        $rootScope.pinged = false;
        Geofence.removeAll();
        if ($scope.crumb === $scope.crumbs.length) {
          $scope.page.found = false;
          $scope.page.media.show = false;
          $scope.bubbles = { top: '320px' };
          $scope.page.finish = true;
        } else {
          $scope.page.found = false;
          $scope.page.media.show = false;
          $scope.bubbles = { top: '320px' };
          $scope.page.description = true;
        }
        break;
      default: $scope.page.description = true;
    }
  };

  $rootScope.$watch('pinged', () => {
    if ($rootScope.pinged) {
      $scope.switch('found');
    }
  });

  $scope.rating = Data.rating();

  $scope.ratingToggle = (value) => {
    $scope.rating = Data.fillIcons('rating', value);
    $scope.postTrail.rating = value;
  };

  $scope.postTrail = {
    rating: null,
  };

  $scope.media = (type) => {
    $scope.bubbles = {
      top: '0px',
    };
    $scope.page.media = {
      show: true,
      image: false,
      ar: false,
      audio: false,
      video: false,
      text: false,
    };
    $scope.page.media[type] = true;
  };
});

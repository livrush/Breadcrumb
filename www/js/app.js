// Ionic Geofence example App

angular.module('breadcrumb', [
  'ionic',
  'ionic.contrib.ui.tinderCards',
  'leaflet-directive',
  'auth0',
  'angular-storage',
  'angular-jwt',
])
.run(function (
  $window,
  $document,
  $ionicLoading,
  $state,
  $ionicPlatform,
  $log,
  $rootScope,
  GeofencePluginMock,
  auth,
  store
) {
  $ionicPlatform.ready(function () {
    $rootScope.pinged = false;
    // $log.log('Ionic ready');
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if ($window.cordova && $window.cordova.plugins.Keyboard) {
      $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if ($window.StatusBar) {
      $window.StatusBar.styleDefault();
    }
    if ($window.geofence === undefined) {
      $log.warn('Geofence Plugin not found. Using mock instead.');
      $window.geofence = GeofencePluginMock;
      $window.TransitionType = GeofencePluginMock.TransitionType;
    }
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
    }

    $window.geofence.onTransitionReceived = (geofences) => {
      $log.log(geofences);
      if (geofences) {
        $rootScope.$apply(() => {
          geofences.forEach((geo) => {
            geo.notification = geo.notification || {
              title: 'Geofence transition',
              text: 'Without notification',
            };
            $rootScope.pinged = true;
          });
        });
      }
    };

    $window.geofence.onNotificationClicked = (notificationData) => {
      $log.log(notificationData);

      if (notificationData) {
        $rootScope.$apply(() => {
          $ionicLoading.show({
            template: `Notification clicked: ${notificationData.notification.text}`,
            noBackdrop: true,
            duration: 2000,
          });

          // $state.go('geofence', {
          //   geofenceId: notificationData.id,
          // });
        });
      }
    };

    $window.geofence.initialize(() => {
      $log.log('Geofence plugin initialized');
    });

    $rootScope.$on('$locationChangeStart', () => {
      if (!auth.isAuthenticated) {
        const token = store.get('token');
        if (token) {
          auth.authenticate(store.get('profile'), token, null, null, store.get('refreshToken'));
        }
      }
    });

    if (store.get('token') && store.get('user')) {
      auth.authenticate(store.get('profile'), store.get('token'), null, null, store.get('refreshToken'));
      $state.go('app.dashboard');
    }
  });
})
.controller('AppCtrl', function ($scope, $rootScope, auth, store, $state, Data, Style) {
  $scope.links = Data.menu;

  $scope.logout = () => {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    store.remove('pic');
    store.remove('user');
    $state.go('start', {}, { reload: true });
  };

  $scope.test = (input) => {
    console.warn(input);
  };

  $scope.setTrail = (id) => {
    localStorage.setItem('trail', id);
    $rootScope.trailID = id;
  };

  if (store.get('user')) {
    $scope.user = store.get('user').username;
  }

  $scope.overflowStyle = Style.overflowStyle;

  $rootScope.refresh = false;
});

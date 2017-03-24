/* global UUIDjs */
/* global TransitionType */
/* global localStorage */
/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('Map', function () {
  const directionsService = new google.maps.DirectionsService();

  const url = 'http://maps.googleapis.com/maps/api/staticmap?size=355x250&path=enc:';

  const computeTotalDistance = (response) => {
    let total = 0;
    const myRoute = response.routes[0];
    myRoute.legs.forEach((leg) => { total += leg.distance.value; });
    total /= 1000; // in km
    return total;
  };

  const totalMiles = (response) => {
    const myRoute = response.routes[0].legs[0].distance.text;
    return myRoute;
  };

  const computeTotalDuration = (response) => {
    const myRoute = response.routes[0].legs[0].duration.text;
    return myRoute;
  };

  const arrayPathAddOn = (response) => {
    let res = '';
    const myRoute = response.routes[0];
    res = myRoute.overview_polyline;
    return res;
  };

  const wayPointsMakers = (directions) => {
    const arr = [];
    const wypts = directions.slice(1, directions.length - 2);
    wypts.forEach((point) => {
      const obj = {
        location: '',
        stopover: true,
      };
      obj.location = point.address;
      arr.push(obj);
    });
    return arr;
  };

  const addPath = (directions) => {
    let obj = {};
    const request = {
      origin: directions[0].address,
      waypoints: wayPointsMakers(directions),
      destination: directions[directions.length - 2].address,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
    };
    return new Promise(function (resolve, reject) {
      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          arrayPathAddOn(response);
          obj = {
            image: `${url}${arrayPathAddOn(response)}`,
            miles: totalMiles(response),
            km: computeTotalDistance(response),
            time: computeTotalDuration(response),
          };
          resolve(obj);
        } else {
          reject('error');
        }
        return obj;
      });
    });
  };
  return {
    add: addPath,
  };
});

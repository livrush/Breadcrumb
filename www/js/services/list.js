/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('ListFact', function ($rootScope, $http, Style) {
  const arrayMaker = (num) => {
    const arr = [];
    let i;
    for (i = 0; i < num; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const getTrails = (request) => {
    // let link = 'http://192.168.99.100/trails';
    let link = 'http://54.203.104.113/trails';
    if (request === 'id') {
      link += `?id=${$rootScope.trailID}`;
    } else if (request) {
      link += '?';

      _.each(request, (val, req) => {
        if (req !== 'username' && val !== null && val !== 'Any') {
          link += `${req}=${val}&`;
        }
      });
    }
    return $http({
      method: 'GET',
      url: link,
    })
    .then((response) => {
      console.log(response);
      const data = [];
      response.data.data.forEach((trail) => {
        trail.style = Style.inactiveTrail;
        // TODO: Integrate actual algorithm to calculate rating from trail.score
        const rating = trail.rating || Math.floor(Math.random() * 6);
        const emptyStars = 5 - rating;
        const difficulty = trail.difficulty;
        trail.rating = arrayMaker(rating);
        trail.emptyStars = arrayMaker(emptyStars);
        trail.difficulty = arrayMaker(difficulty);
        data.push(trail);
      });
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const deleteTrail = (trail) => {
    $http({
      method: 'DELETE',
      url: `http://54.203.104.113/trails/${trail.id}`,
      // url: `http://192.168.99.100/trails/${trail.id}`,
    })
    .then(res => console.warn(res))
    .catch(res => console.error(res));
  };

  const filterListItems = (list, type, value) => {
    const items = list.slice();
    if (value) {
      return items.filter(item => item[type] === value);
    } else if (type === 'rating') {
      return items.sort((a, b) => {
        if (a[type] > b[type]) return -1;
        if (a[type] < b[type]) return 1;
        return 0;
      });
    }
    return items.sort((a, b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return 0;
    });
  };

  return {
    get: getTrails,
    del: deleteTrail,
    range: arrayMaker,
    filter: filterListItems,
  };
});

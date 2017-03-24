/* global UUIDjs */
/* global TransitionType */
/* global localStorage */
/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('Data', function () {
  const iconArrayMaker = (num) => {
    const obj = {};
    let i;
    for (i = 0; i < num; i += 1) {
      obj[i] = {
        type: i,
        style: null,
      };
    }
    return obj;
  };

  const trailTypes = () => ([
    'adventure',
    'mystery',
    'casual',
    'tour',
    'scavenger',
    'nature',
    'history',
  ].sort());

  const transport = () => ({
    WALKING: {
      type: 'walk',
      style: null,
    },
    BICYCLING: {
      type: 'bicycle',
      style: null,
    },
    TRANSIT: {
      type: 'bus',
      style: null,
    },
    DRIVING: {
      type: 'car',
      style: null,
    },
  });

  const difficulties = () => iconArrayMaker(3);

  const stars = () => iconArrayMaker(5);

  const dataTypes = {
    stars,
    transport,
    difficulties,
  };

  const fillIcons = (type, value, fill) => {
    const base = dataTypes[type]();
    const data = {};
    let val;
    if (!fill) {
      fill = { color: 'gold' };
    }
    for (val in base) {
      data[val] = base[val];
    }
    if (type === 'transport') {
      data[value].style = fill;
    } else {
      while (value > -1) {
        data[value].style = fill;
        value -= 1;
      }
    }
    return data;
  };

  const info = () => ({
    show: false,
    name: null,
    text: null,
    description: {
      name: 'Description',
      text: 'What do you want the traveler to know when they see where they\'re going next? This could be a clue, like a distinct feature of the area they\'re looking for, or a landmark they should look out for!',
    },
    rewardText: {
      name: 'Reward Text',
      text: 'This is what shows up when the traveler reaches the crumb!',
    },
    errorMap: {
      name: 'Error',
      text: 'There was an error processing your request. Please check that you entered proper addresses and try again!',
    },
  });

  const arrayMaker = (num) => {
    const arr = [];
    let i;
    for (i = 0; i < num; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const randomFromArray = arr => () => arr[Math.floor(Math.random() * arr.length)];

  const closeStyle = {
    height: '95px',
    'transition-duration': '250ms',
    overflow: 'hidden',
  };

  const trailMaker = () => {
    const tran = Math.floor(Math.random() * 4) + 1;
    const trailStars = Math.floor(Math.random() * 6);
    const emptyStars = 5 - trailStars;
    const difficulty = Math.floor(Math.random() * 5) + 1;
    return {
      name: `Trail ${Math.floor(Math.random() * 100)}`,
      description: '',
      transport: tran,
      stars: arrayMaker(trailStars),
      emptyStars: arrayMaker(emptyStars),
      difficulty: arrayMaker(difficulty),
      length: (Math.floor(Math.random() * 5) + 2) * tran,
      progress: Math.floor(Math.random() * 100),
      style: closeStyle,
    };
  };

  const addresses = [
    '748 Camp St, New Orleans, LA 70130',
    '1546 Magazine St, New Orleans, LA 70130',
    '900 Camp St, New Orleans, LA 70130',
    '3705 St Claude Ave, New Orleans, LA 70117',
    '806 N Rampart St, New Orleans, LA 70116',
    '5601 Magazine St, New Orleans, LA 70115',
    '727 Mandeville St, New Orleans, LA, 70117',
    '15828 196th Pl NE, Woodinville, WA, 98077',
    '24700 McBean Pkwy, Valencia, CA 91355',
    '60 Lincoln Center Plaza, New York, NY 10023',
  ];

  const trailNames = [
    'Liv\'s Trail',
    'Alice\'s Trail',
    'Eric\'s Trail',
    'Devin\'s Trail',
  ];

  const descriptions = [
    'A trail that takes you places',
    'Don\'t do this trail.',
    'A cool trail',
    'The best trail ever',
    'The worst trail you\'ve ever seen',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];

  const crumbDescriptions = [
    'There\'s a beautiful rose here',
    'Check out the awesome grafitti near here!',
    'Across the street there is an awesome cafe',
    'This is where a murder occured',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];

  return {
    info,
    stars,
    transport,
    trailTypes,
    fillIcons,
    iconArrayMaker,
    arrayMaker,
    difficulties,
    trail: trailMaker,
    address: randomFromArray(addresses),
    trailName: randomFromArray(trailNames),
    description: randomFromArray(descriptions),
    crumbDescription: randomFromArray(crumbDescriptions),
  };
});

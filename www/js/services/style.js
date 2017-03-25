/* global UUIDjs */
/* global TransitionType */
/* global localStorage */
/* eslint no-underscore-dangle: ["error", { "allow": ["_geofences", "_geofencesPromise"] }] */
angular.module('breadcrumb').factory('Style', function () {
  const displayNone = { display: 'none' };

  const activeTrail = {
    height: '375px',
    overflow: 'hidden',
    'transition-duration': '250ms',
  };

  const inactiveTrail = {
    height: '105px',
    'transition-duration': '250ms',
    overflow: 'hidden',
  };

  const moveVertial = num => ({
    'transition-duration': '1000ms',
    transform: `translate(0px, ${num}%)`,
  });

  const moveLeft = move => ({
    left: move,
    'transition-duration': '250ms',
  });

  const moveReset = move => ({
    'transition-duration': '1000ms',
    top: '0px',
    left: move,
  });

  const moveUp = {
    'animation-name': 'moveUp',
  };

  const moveDown = {
    'animation-name': 'moveDown',
  };

  const activeTransport = () => ({
    'background-color': '#95cebb',
    'border-radius': '50px',
    color: '#fbf0ed',
  });

  const activeMoney = () => ({
    'background-color': '#95cebb',
    'border-radius': '50px',
    color: '#fbf0ed',
  });

  const overflowStyle = {
    'max-height': '160px',
    overflow: 'scroll',
  };

  return {
    activeTrail,
    inactiveTrail,
    displayNone,
    moveVertial,
    moveLeft,
    moveUp,
    moveDown,
    moveReset,
    activeTransport,
    activeMoney,
    overflowStyle,
  };
});

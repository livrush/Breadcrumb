angular.module('breadcrumb')
.factory('UserFact', function ($http) {
  const getUser = username => (
    $http({
      method: 'GET',
      url: `http://54.203.104.113/users?username=${username}`,
      json: true,
    })
    .then(response => response.data.data[0])
    .catch(error => console.error(error))
  );
  return {
    getUser,
  };
});

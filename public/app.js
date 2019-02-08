var app = angular.module('optometryLog', ['ngMaterial', 'ngMessages', 'ui.router', 'firebase']);

app.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('cyan', {
      'default': '400',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100'
    })
    .accentPalette('amber')
    .warnPalette('red')
    .backgroundPalette('grey');

    $mdThemingProvider.enableBrowserColor({
        theme: 'default', // Default is 'default'
        palette: 'cyan', // Default is 'primary', any basic material palette and extended palettes are available
        hue: '200' // Default is '800'
    });   
});

app.run(function($location) {
    var token = localStorage.getItem('token');
    var path = $location.path();
    if (!token) {
        if (path !== '/login' || path !== '/register' || path.substring(0,6) !== '/share') {
            var page = path.substring(0,6);
            if (page === '/share') {
                
            }else {
                $location.replace().path('#!/login');
            }
        }
    }
});

app.controller('MainController', function($scope) {
    $scope.title = "Exercise App";
});


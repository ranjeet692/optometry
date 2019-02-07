app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('default', {
            url: '/',
            templateUrl: 'login/login.html',
            controller: 'LoginController',
        })
        .state('login', {
            url: '/login',
            templateUrl: '/login/login.html',
            controller: 'LoginController',
        })
        .state('home', {
            url: '/home',
            templateUrl: '/home/home.html',
            controller: 'HomeController',
        })
        .state('posting', {
            url: '/posting',
            templateUrl: '/posting/posting.html',
            controller: 'PostingController',
            params: {
                postingtype: null
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '/profile/profile.html',
            controller: 'ProfileController',
        });
        $urlRouterProvider.otherwise('/');
  });
  
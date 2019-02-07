app.controller('PostingController', function($scope, $state, $mdToast, Profile) {
    $scope.back = function() {
        $state.go('home');
    };
    $scope.user = {};
    var userid = localStorage.getItem('userid');
    if (!userid) {
        $state.go('login');
    }
});
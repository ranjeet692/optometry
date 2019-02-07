app.controller('ProfileController', function($scope, $state, $mdToast, Profile) {
    $scope.back = function() {
        $state.go('home');
    };
    $scope.user = {};
    $scope.updateProfile = function() {
        Profile.add($scope.user).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Profile updated successfully')
                  .hideDelay(3000)
            );
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to update user profile')
                  .hideDelay(3000)
            );
        });
        console.log($scope.user);
    };
    
    var userid = localStorage.getItem('userid');
    if (!userid) {
        $state.go('login');
    }
    Profile.get(userid).then(function(res) {
        $scope.user = res.data;
    }, function(res) {
        $mdToast.show(
            $mdToast.simple()
              .textContent('Unable to get user profile')
              .hideDelay(3000)
        );
    });
});
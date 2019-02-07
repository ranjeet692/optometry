app.controller('LoginController', function($scope, $state, $mdToast, Login) {
    $scope.title = "Login Page";
    $scope.user = {};
    $scope.submit = function() {
        var userid = $scope.user.id;
        var password = $scope.user.password;
        /*Login.login(userid, password).then(function(result) {
            localStorage.setItem('userid', userid);
            localStorage.setItem('username', result.data.username);
            localStorage.setItem('token', result.data.token);
            $state.go('home');
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to login')
                  .hideDelay(3000)
            );
        });*/
        //Temp Code
        if ($scope.user.id === 'student' && $scope.user.password === 'abcd123') {
            localStorage.setItem('userid', 'student');
            localStorage.setItem('username', 'Student');
            localStorage.setItem('token', '456789078654356789068');
            $state.go('home');
        }else {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Invalid username and password')
                  .hideDelay(3000)
            );
        }
    };
});
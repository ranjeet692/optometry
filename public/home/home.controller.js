app.controller('HomeController', function($scope, $state, $mdSidenav, $mdDialog, $mdToast, $firebaseObject, $firebaseArray, PostingService) {
    
    var current = 'posting';
    $scope.selectedTab = 'posting';
    var userid = localStorage.getItem('userid');
    var username = localStorage.getItem('username');

    var ref = firebase.database().ref();
    $scope.postingLists = $firebaseArray(ref);

    if (!userid) {
        $state.go('login');
    }

    $scope.toggleSidenav = function() {
        $mdSidenav('left').toggle();
    };

    $scope.currentTab = function(value) {
        current = value;
        $scope.selectedTab = value;
    };

    $scope.getPosting = function(date) {
        //get recent posting. last 10 posting.
    };

    $scope.addNewDialog = function(ev) {
        if (current === 'posting') {
            newPostingDialog(ev);
        }
    };

    $scope.createPosting = function(id) {
        $scope.cancel();
        $state.go('posting', id);
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    function newPostingDialog(ev) {
        $mdDialog.show({
            controller:'PostingDialogController',
            templateUrl: 'home/dialogs/posting.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        }).then(function(type) {
            $state.go('posting', {postingtype: type});
        }, function() {
            //cancel event
        });
    }

    $scope.logout = function() {
        localStorage.removeItem('userid');
        localStorage.removeItem('token');
        $state.go('login');
    };

    $scope.profile = function() {
        $state.go('profile');
    };
});
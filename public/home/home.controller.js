app.controller('HomeController', function($scope, $state, $mdSidenav, $mdDialog, $mdToast, PostingService) {
    
    var current = 'posting';
    $scope.selectedTab = 'posting';
    var userid = localStorage.getItem('userid');
    var username = localStorage.getItem('username');

    $scope.postingMenu = [
        {name: 'General OPD', id:'general'},
        {name: 'Community OPD', id:'community'},
        {name: 'Glaucoma OPD', id:'glaucoma'},
        {name: 'Uvea OPD', id:'uvea'},
        {name: 'Pediatric OPD', id:'pediatric'},
        {name: 'Retina OPD', id:'retina'},
        {name: 'Corena OPD', id:'corena'},
        {name: 'Oculoplasty OPD', id:'oculoplasty'},
        {name: 'Refraction Clinic', id:'refrection'},
        {name: 'Contact Lens Clinic', id:'contactlens'},
        {name: 'Binocular Vision Clinic', id:'binocular'},
        {name: 'Low Vision Vision Clinic', id:'lowvision'},
        {name: 'Dispensing-Opticals', id:'dispensing'},
        {name: 'Biometry', id:'biometry'}
    ];
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
            controller:'HomeController',
            templateUrl: 'home/dialogs/posting.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        }).then(function(submitExercise) {
           
            //submission event
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
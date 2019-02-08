app.controller('PostingController', function($scope, $state, $stateParams, $mdToast, $mdDialog, $firebaseArray, PostingService) {
    $scope.back = function() {
        $state.go('home');
    };

    var recordId = generateID();
    var ref = firebase.database().ref();
    var postingObject = $firebaseArray(ref);

    $scope.posting = {};
    $scope.postingMenu = PostingService.getPostingType();
    initialize();

    var userid = localStorage.getItem('userid');
    if (!userid) {
        $state.go('login');
    }

    if (!$stateParams.postingtype) {
        showDialog();
    }else {
        $scope.posting.type = PostingService.getPostingTypeById($stateParams.postingtype);
    }

    $scope.createPosting = function(type) {
        $stateParams.postingtype = type;
        $scope.cancel();
        $scope.posting.type = PostingService.getPostingTypeById($stateParams.postingtype);
        initialize();
    };

    $scope.savePosting = function() {   
        if (!$scope.posting.id) {
            $scope.posting.id = recordId;
            //$scope.posting[recordId] = $scope.posting;
        }    
        $scope.posting.timestamp = new Date();
        postingObject.$add($scope.posting).then(function(ref) {
            $mdToast.simple()
                .textContent('Data Saved Succussfully')
                .hideDelay(3000)
        }, function(error) {
            $mdToast.simple()
                .textContent(error)
                .hideDelay(3000)
        });
    }

    function showDialog(ev) {
        $mdDialog.show({
            controller:'PostingDialogController',
            templateUrl: 'home/dialogs/posting.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        }).then(function(submit) {
            //submission event
        }, function() {
            //cancel event
        });
    }

    function generateID() {
        return Math.floor(Math.random()*(1000000 - 100000 +1)+ 100000);
    }

    function initialize() {
        $scope.posting.basic = {};
        $scope.posting.visual = {
            unaided: {},
            pinhole: {},
            previousGlasses: {
                spherical: {},
                cylinderical: {},
                axis: {}
            },
            oldGlasses: {},
            objectiveRefrection: {
                spherical: {},
                cylinderical: {},
                axis: {},
                noGlow:{},
                dullGlow: {},
                centralOpacity: {}
            },
            subjectiveRefrection: {
                spherical: {},
                cylinderical: {},
                axis: {},
                fogging:{},
                duoChrome: {},
                jcc: {}
            },
            newCorrection: {}
        };

        $scope.posting.keratometry = {
            vertical: {},
            horizontal: {},
            comments: {}
        };

        $scope.posting.covertest = null;
        $scope.posting.npa = {};
        $scope.posting.npc = {};

        $scope.posting.learning = null;
        $scope.posting.diagnosis = null;
        $scope.posting.intervention = null;
    }
});
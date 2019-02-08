app.controller('PostingDialogController', function($scope, $mdDialog, PostingService) {
    $scope.postingMenu = PostingService.getPostingType();

    $scope.createPosting = function(id) {
        $mdDialog.hide(id);
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

});
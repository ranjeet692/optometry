app.factory('Login',function($http){
    return {
        login:function(userid, password) {
            return $http.post('/user/login', {userId: userid, password: password});
        }
    };
});
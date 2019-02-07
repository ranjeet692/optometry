app.factory('Profile',function($http){
    return {
        add:function(user) {
            return $http.post('/user/profile/update', user);
        },

        get:function(userid) {
            //var token = localStorage.getItem('token');
            return $http.get('/user/profile/' + userid);
        }
    };
});
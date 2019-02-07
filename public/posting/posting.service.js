app.factory('PostingService',function($http){
    return {
        add:function(name, muscle, userid) {
            return $http.post('/exercise/add', {name: name, muscle: muscle, userid: userid});
        },

        get:function(userid) {
            return $http.get('/exercise/get/' + userid);
        },

        getById:function(id) {
            return $http.get('/exercise/get/' + id);
        }
    };
});
app.factory('PostingService',function($http){
    var postingType = [
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
    return {
        getPostingType: function() {
            return postingType;
        },
        getPostingTypeById: function(id) {
            for (var i = 0; i < postingType.length; i++) {
                if (id === postingType[i].id) {
                    return postingType[i];
                }
            }
            return {};
        },
        save: function(data) {
            console.log(data);
        },
        update: function(id, data) {
            console.log(data);
        }
    };
});
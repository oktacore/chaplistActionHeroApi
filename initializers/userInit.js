var _ = require("lodash");
module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.userInit = {
            addOrCreate: function (data, callback) {
                api.models.user.findOrCreate({
                        where: {
                            id_user: data.user_id
                        },
                        defaults: {
                            email: data.email,
                            image: data.image,
                            firstName: data.firstName,
                            lastName: data.lastName
                        }
                    })
                    .spread(function (user, created) {
                        api.tokenInit.createToken(user.id_user, function(res, error){
                            callback(JSON.stringify({token:res ,created: created, req: true}), true);
                        });
                        
                        //callback(JSON.stringify({created: created, req: true}), true);        
                    })
            }
        };

        next();
    },
    start: function (api, next) {
        next();
    },
    stop: function (api, next) {
        next();
    }
};
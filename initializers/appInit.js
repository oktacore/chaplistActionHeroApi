var _= require('lodash');
var crypto = require('crypto');

module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.appInit = {
            /*
                Función para obtener las apps de un usuario mediante su token
            */
            getApps: function (id_user, next) {
                api.models.user.findOne({
                        where: {
                            id_user: id_user
                        }
                    })
                    .then(function (user) {
                        user.getApps()
                            .then(function (app) {
                                next(JSON.stringify(app), true);
                            })
                            .catch(function (error) {
                                next(JSON.stringify(errors), true);
                            });
                    })
                    .catch(function (error) {
                        next(JSON.stringify(error.message), true);
                    });
            },
            /* 
                Función para la creación de apps a un usuario válido
                name,appSecret,packageName,hashKey
            */
            createApp: function (id_user, data, next) {
                var params = _.pick(data, 'name','packageName', 'hashKey');
                api.models.user.findOne({
                        where: {
                            id_user: id_user
                        }
                    })
                    .then(function (user) {
                        params.appSecret = crypto.createHash('sha256').update(id_user).digest("hex");
                        user.createApp(params)
                            .then(function (app) {
                                next(JSON.stringify(app), true);
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error), true);
                            });
                    })
                    .catch(function (error) {
                        next(JSON.stringify(error.message), true);
                    });
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
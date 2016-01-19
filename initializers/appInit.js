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
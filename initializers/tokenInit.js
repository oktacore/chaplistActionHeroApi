var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.tokenInit = {
            /*
                Función para la generación de un nuevo Token, con duración de 1 día
            */
            createToken: function (user_id, callback) {
                var payload = {
                    sub: user_id,
                    iat: moment().unix(),
                    exp: moment().add(1, "days").unix(),
                };
                callback(jwt.encode(payload, api.config.general.TOKEN_SECRET), true);
            },

            validateToken: function (token, callback) {
                var payload = jwt.decode(token, api.config.general.TOKEN_SECRET);
                
                if (payload.exp <= moment().unix()) {
                    console.log('Token expirado')
                    /*return res
                        .status(401)
                        .send({
                            message: "El token ha expirado"
                        });*/
                }

                callback(JSON.stringify(payload.sub), true);

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
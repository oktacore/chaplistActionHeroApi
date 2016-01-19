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
            
            /*
                Función que valida un token determinado retornanod su estado y su id_user
            */
            validateToken: function (token, callback) {
                var payload = jwt.decode(token, api.config.general.TOKEN_SECRET);
                var res = {
                    data: payload.sub,
                    valid: true
                };
                if (payload.exp <= moment().unix()) {
                    res.valid = false;
                    res.data = 'token no válido'
                }
                callback(JSON.stringify(res), true);
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
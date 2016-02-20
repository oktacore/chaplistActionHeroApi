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
            createToken: function (user_id, next) {
                var payload = {
                    sub: user_id,
                    iat: moment().unix(),
                    exp: moment().add(1, "days").unix(),
                };
                next(jwt.encode(payload, api.config.general.TOKEN_SECRET), false);
            },
            
            /*
                Función que valida un token determinado retornanod su estado y su id_user
            */
            validateToken: function (token, next) {
                var payload = jwt.decode(token, api.config.general.TOKEN_SECRET);
                var error = false;
                var res = {
                        data: payload.sub,
                        valid: true
                };
                if (payload.exp <= moment().unix()) {
                    error = true;
                    res.valid = false;
                    res.data = 'token no válido'
                }
                next(JSON.stringify(res), error);
            },
            /*
                Función que valida un token determinado de una app
            */
            validateTokenApp: function (token, next) {
                var payload;
                var resp = {
                        token: token,
                        valid: true
                    };
                try{
                    payload = jwt.decode(token, api.config.general.TOKEN_SECRET);

                    if (payload.exp <= moment().unix()) {
                        api.tokenInit.createToken(payload.sub, function(res, error){
                            resp.token = res;
                            next(resp, error);
                        });
                    }else
                        next(resp, false);
                }catch(err){
                    resp.valid= false;
                    next(null, true);
                }
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

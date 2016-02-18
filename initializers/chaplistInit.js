module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.chaplistInit = {
            /*
                Retorna un token ante una petición de alguna app móvil
            */
            tokenPetition: function (secretKey, packageName, uuid, next) {
                api.appInit.getApp(secretKey, packageName, function (res, error) {
                    var result = JSON.parse(res);
                    if (res == 'null') {
                        next('null', error);
                    } else {
                        api.tokenInit.createToken(uuid, function (res, error) {
                            next(JSON.stringify(res), error);
                        });
                    }
                });
            },
            /*
                Obtiene todos los supermercados existentes en la base de datos
            */
            getSupermarkets: function (token, next) {
                api.tokenInit.validateTokenApp(token, function (res, error) {
                    if (res.valid) {
                        api.models.supermarket.findAll()
                            .then(function (supermarkets) {
                                res.supermarkets = supermarkets;
                                next(JSON.stringify(res), true);
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error), error);
                            });
                    } else {
                        next(JSON.stringify(res), error);
                    }
                });
            },
            /*
                Obtiene las tiendas o sucursales a partir de un id de supermercado
            */
            getStores: function (supermarketId, token, next) {
                api.tokenInit.validateTokenApp(token, function (res, error) {
                    if (res.valid) {
                        api.models.supermarket.findById(supermarketId)
                            .then(function (supermarket) {
                                supermarket.getStores()
                                    .then(function (stores) {
                                        next(JSON.stringify(stores), true);
                                    });
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error), error);
                            });
                    } else {
                        next(JSON.stringify(res), error);
                    }
                });
            },
            /*
                Devuleve todos los producto de la oferta vigente para un supermercado específico
            */
            getProductsInOffer: function (supermarketId, next) {
                getActualOffer(supermarketId, function(res, error){
                    if(res == 'null')//compruebo que exista alguna oferta vigente
                        next(res, true);
                    else
                        next(res, error);
                });
            }
        };
        /*
            Función que retorna una oferta vigente para un supermercado en específico
        */
        function getActualOffer(supermarketId, next) {
            api.models.offer.findOne({
                    where: {
                        supermarketId: supermarketId,
                        current: 1
                    }
                })
                .then(function (offer) {
                    next(JSON.stringify(offer), false);
                })
                .catch(function (error) {
                    next(JSON.stringify(error.message), true);
                });
        }

        next();
    },
    start: function (api, next) {
        next();
    },
    stop: function (api, next) {
        next();
    }
};

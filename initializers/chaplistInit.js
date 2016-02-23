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
                    if (!error) {
                        api.models.supermarket.findAll()
                            .then(function (supermarkets) {
                                res.supermarkets = supermarkets;
                                next(JSON.stringify(res), false);
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error), true);
                            });
                    } else {
                        next(JSON.stringify(res), true);
                    }
                });
            },
            /*
                Obtiene las tiendas o sucursales a partir de un id de supermercado
            */
            getStores: function (supermarketId, token, next) {
                api.tokenInit.validateTokenApp(token, function (res, error) {
                    if (!error) {
                        api.models.supermarket.findById(supermarketId)
                            .then(function (supermarket) {
                                supermarket.getStores()
                                    .then(function (stores) {
                                        next(JSON.stringify(stores), error);
                                    });
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error), true);
                            });
                    } else {
                        next(JSON.stringify(res), error);
                    }
                });
            },
            /*
                Devuleve todos los productos de la oferta vigente para un supermercado específico
            */
            getProductsInOffer: function (supermarketId, token, next) {
                var offer = {};
                api.tokenInit.validateTokenApp(token, function (res, error) {
                    if (!error) {
                        api.models.offer.findOne({
                                where: {
                                    supermarketId: supermarketId,
                                    current: 1
                                }
                            })
                            .then(function (offer) {
                                if (!offer) { //compruebo que exista alguna oferta vigente
                                    next('null', true);
                                } else { //si existe una oferta válida entonces se obtienen todos los productos
                                    offer.getProducts({offset: 5, limit: 15})
                                        .then(function (products) {
                                            console.log(offer,products, '*************************************************');
                                            next(JSON.stringify(products), false);
                                        })
                                        .catch(function (error) {
                                            next(JSON.stringify(error), true);
                                        });
                                }
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error.message), true);
                            });
                    } else {
                        next(JSON.stringify(res), error);
                    }
                });
            },
            /*
                Función para incrementar o decrementar los likes a un producto de una oferta específica
                1: incrementar y 2: decrementar
            */
            addOrRemoveLikeProduct: function(offerId, productId, tipo, token, next){
                var count = 0;
                api.tokenInit.validateTokenApp(token, function (res, error) {
                    if (!error) {
                        api.models.productstore.findOne({
                            where: {
                                offerId: offerId,
                                productId: productId
                                }
                            })
                            .then(function (offer) {
                                if(tipo == 1){
                                    count = offer.likes +1;
                                }
                                else if(tipo ==2){
                                    if(offer.likes == 0){
                                         next(JSON.stringify(offer), false);
                                    }else{
                                        count = offer.likes -1;
                                    }
                                }else{
                                    next('El parámetro tipo, debe ser 1 o 0', true);
                                }
                                offer.update({
                                    likes: count
                                    })
                                    .then(function (offerUpdated) {
                                        next(JSON.stringify(offerUpdated), false);
                                    });
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error), true);
                            });
                    } else {
                        next(JSON.stringify(res), error);
                    }
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

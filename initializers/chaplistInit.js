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
                                        res.stores = stores;
                                        next(JSON.stringify(res), error);
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
            getProductsInOffer: function (supermarketId, offset, token, next) {
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
                                    offer.getProducts({
                                            offset: parseInt(offset),
                                            limit: 10
                                        })
                                        .then(function (products) {
                                            res.products = products
                                            next(JSON.stringify(res), false);
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
                Devuleve todos los productos de la oferta vigente de todos los supermercados
            */
            getAllProductsInOffer: function (offset, value, token, next) {
                var offer = {};
                api.tokenInit.validateTokenApp(token, function (res, error) {
                    if (!error) {
                        api.sequelize.query(
                            "select s.name, p.upc, p.description, o.dateInit, o.dateEnd, ps.normalPrice, ps.offerPrice, ps.likes, ps.image " +
                            "from Offers o, Products p, ProductStores ps, Supermarkets s " +
                            "where o.id = ps.offerId " +
                            "and p.id = ps.productId " +
                            "and s.id = o.supermarketId " +
                            "and o.current = 1 " +
                            "and p.description like ?; ", {
                                replacements: ['%'+value+'%'],
                                type: api.sequelize.QueryTypes.SELECT
                            }).then(function (products) {
                            res.products = products
                            next(JSON.stringify(res), false);
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
            addOrRemoveLikeProduct: function (offerId, productId, tipo, token, next) {
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
                                if (tipo == 1) {
                                    count = offer.likes + 1;
                                } else if (tipo == 2) {
                                    if (offer.likes == 0) {
                                        next(JSON.stringify(offer), false);
                                    } else {
                                        count = offer.likes - 1;
                                    }
                                } else {
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
            },
            /*
                Función para obtener una oferta espé
            */
            getActualProductInOffer: function (supermarketId, productId, offerId, token, next) {
                api.tokenInit.validateTokenApp(token, function (res, error) {
                    if (!error) {
                        api.models.offer.findOne({
                                where: {
                                    supermarketId: supermarketId,
                                    current: 1,
                                    id: {
                                        $ne: offerId
                                    }

                                }
                            })
                            .then(function (offer) {
                                if (offer) {
                                    offer.getProducts({
                                            where: {
                                                id: productId
                                            }
                                        })
                                        .then(function (product) {
                                            product[0].dataValues.supermarketId = supermarketId;
                                            next(product, false);
                                        })
                                } else
                                    next('null', true);
                            });
                    } else {
                        next(JSON.stringify(res), error);
                    }
                });
            },
            getTopFavoritesOffers: function (token, next) {
                /*api.models.product.findAll({
                        offset: 0,
                        limit: 5,
                        order: 'likes DESC',
                        include: [{
                            model: api.models.offer,
                            where: {
                                current: 1
                            },
                            through: {
                                attributes: ['likes', 'normalPrice', 'offerPrice', 'image']
                            }
                        }]
                    })*/
                api.sequelize.query(
                        "select s.name, p.upc, p.description, o.dateInit, o.dateEnd, ps.normalPrice, ps.offerPrice, ps.likes, ps.image " +
                        "from Offers o, Products p, ProductStores ps, Supermarkets s " +
                        "where o.id = ps.offerId " +
                        "and p.id = ps.productId " +
                        "and s.id = o.supermarketId " +
                        "and o.current = 1 " +
                        "order by ps.likes DESC " +
                        "limit 5;", {
                            type: api.sequelize.QueryTypes.SELECT
                        })
                    .then(function (data) {
                        next(JSON.stringify(data), false);
                    });

                /*api.models.productstore.findAll({
                    limit: 5,
                    order: 'likes DESC'
                })
                .then(function(data){
                    next(data, false);
                });*/
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

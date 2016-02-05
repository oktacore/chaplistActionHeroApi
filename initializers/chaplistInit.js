module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.chaplistInit = {

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

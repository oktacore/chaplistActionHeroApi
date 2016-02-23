var _ = require('lodash');
module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.offerInit = {
            updateOffer: function (supermarket,next) {
                api.models.offer.update({
                        current: false
                    }, {
                        where: {
                            current: true,
                            $and: {
                                supermarketId: supermarket
                            }
                        }
                    })
                    .then(function (offer) {
                        next(JSON.stringify(offer), false);
                    })
                    .catch(function (error) {
                        next(JSON.stringify(error), true);
                    });
            },
            createOffer: function (finicio, ffin, supermarket, next) {
                api.models.offer.create({
                        dateInit: finicio,
                        dateEnd: ffin,
                        supermarketId: supermarket,
                        current: true
                    })
                    .then(function (offer) {
                        next(offer, false);
                    })
                    .catch(function (error) {
                        next(error, true);
                    });
            },
            addProduct: function (offer, data, next) {
                api.models.product.findOrCreate({
                    where: {
                        upc: data.upc
                    },
                    defaults: {

                        upc: data.upc,
                        description: data.descripcion

                    }
                }).spread(function (product1) {
                    api.models.productstore.create({
                            productId: product1.id,
                            offerId: offer.id,
                            normalPrice: data.normalPrice,
                            offerPrice: data.offerPrice,
                            likes: 0,
                            image: data.image,
                            image1: '',
                            image2: '' 
                        })
                        .then(function (offer) {
                            next(JSON.stringify(offer), false);
                        })
                        .catch(function (error) {
                            next(JSON.stringify(error), true);
                        });
                    next(JSON.stringify(product1), false);
                }).catch(function (error) {
                    next(JSON.stringify(error), true);
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
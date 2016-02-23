var _ = require('lodash');
module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.offerInit = {
            updateOffer: function (supermarket) {
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
                .then()
                .catch();
            },
            createOffer: function (finicio, ffin, supermarket, next) {
                api.models.offer.create({
                        dateInit: finicio,
                        dateEnd: ffin,
                        supermarketId: supermarket,
                        current: true
                    })
                    .then(function (offer) {
                        next(offer);
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
                        description: data.descripcion,
                        image: data.image

                    }
                }).spread(function (product1) {
                    api.models.productstore.create({
                        productId: product1.id,
                        offerId: offer.id,
                        normalPrice: data.normalPrice,
                        offerPrice: data.offerPrice,
                        likes: 0
                    })
                    .then()
                    .catch();
                    next(product1);
                }).catch();

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
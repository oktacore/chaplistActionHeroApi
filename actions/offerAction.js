exports.action = {
    name: 'uploadOffers',
    description: 'upload the offers from exel',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        offers: {
            required: true
        },
        supermarket: {
            required: true
        },
        finicio: {
            requeried: true
        },
        ffin: {
            requeried: true
        }
    },

    run: function (api, data, next) {
        var error = null;
        api.offerInit.updateOffer(data.params.supermarket, function (res, error) {
            api.offerInit.createOffer(data.params.finicio, data.params.ffin, data.params.supermarket, function (offer, error) {
                var size = data.params.offers.length;
                var i;
                for (i = 0; i < size; i++) {
                    api.offerInit.addProduct(offer, data.params.offers[i], function (res, error) {
                        if (error) {
                            data.response = res + "\n" + "por favor revise su archivo de entrada o comuniquese con el administrador del sistema";
                            next(res, error);
                        } else if (i == size - 1) {
                            data.response("carga efectuada exitosamente");
                            next(data.response);
                        }
                    });
                }
                data.response = offer + "\n" + "por favor revise su archivo de entrada o comuniquese con el administrador del sistema";
                next(offer, error);
            });
            if (error){
                data.response = res + "\n" + "por favor revise su archivo de entrada o comuniquese con el administrador del sistema";
            }
            if(error){
                next(res, error);
            }
        });
        next(error);
    }
};
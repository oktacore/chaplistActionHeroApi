exports.tokenPetition = {
    name: 'tokenPetition',
    description: 'tokenPetition',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        secretKey: {
            required: true
        },
        packageName: {
            required: true
        },
        uuid: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.chaplistInit.tokenPetition(data.params.secretKey, data.params.packageName, data.params.uuid, function (res, error) {
            sendInfo(res, error, data, next);
        });
    }
};


exports.getSupermarkets = {
    name: 'getSupermarkets',
    description: 'getSupermarkets',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        token: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.chaplistInit.getSupermarkets(data.params.token,function (res, error) {
            sendInfo(res, error, data, next);
        });
    }
};

exports.getStores = {
    name: 'getStores',
    description: 'getStores',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        token: {
            required: false
        },
        supermarketId: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.chaplistInit.getStores(data.params.supermarketId, data.params.token, function (res, error) {
             sendInfo(res, error, data, next);
        });
    }
};

///////////////////////////////////////////////////////
exports.getOffers = {
    name: 'getOffers',
    description: 'getOffers',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        token: {
            required: true
        },
        offset: {
            required: true
        },
        supermarketId: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.chaplistInit.getProductsInOffer(data.params.supermarketId, data.params.offset, data.params.token, function (res, error) {
            sendInfo(res, error, data, next);
        });
    }
};

exports.getAllOffers = {
    name: 'getAllOffers',
    description: 'getAllOffers',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        token: {
            required: true
        },
        offset: {
            required: false
        },
        value:  {
            requeried: true
        }
    },

    run: function (api, data, next) {
        api.chaplistInit.getAllProductsInOffer(data.params.offset, data.params.value, data.params.token, function (res, error) {
            sendInfo(res, error, data, next);
        });
    }
};

exports.addOrRemoveLikes = {
    name: 'addOrRemoveLikes',
    description: 'addOrRemoveLikes',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        token: {
            required: true
        },
        offerId: {
            required: true
        },
        productId: {
            required: true
        },
        type: {
            required: true
        }
    },

    run: function (api, data, next) {
        api.chaplistInit.addOrRemoveLikeProduct(data.params.offerId, data.params.productId,data.params.type, data.params.token, function (res, error) {
            sendInfo(res, error, data, next);
        });
    }
};



exports.getFavInOffer = {
    name: 'getFavInOffer',
    description: 'getFavInOffer',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],
    inputs: {
        token: {
            required: true
        },
        favProducts: {
            required: true
        }
    },
    run: function (api, data, next) {
        var newArray = [];
        var auxArray = data.params.favProducts;
        var i =0;
        for(var i = 0; i < auxArray.length; i++){
            api.chaplistInit.getActualProductInOffer(auxArray[i].supermarketId, auxArray[i].productId, auxArray[i].offerId, data.params.token, function (res, error) {
                if(!error){
                    newArray.push(res);
                }                
                if(i == auxArray.length){
                    data.response = JSON.stringify(newArray);
                    next(data.response, true);
                }
            });            
        }        
    }
};


exports.topOffers = {
    name: 'topOffers',
    description: 'topOffers',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],
    inputs: {
        token: {
            required: false
        }
    },
    run: function (api, data, next) {
            api.chaplistInit.getTopFavoritesOffers('abcdef', function (res, error) {
                sendInfo(res, error, data, next);
            });           
    }
};

/*
    Función global para que todas las función envíen la información requerida
*/
function sendInfo(res, error, data, next){
    if(error){
        data.error = res;
        next(data.error, true);
    }else{
        data.response = res;
        next(data.response, true);
    }
    
}

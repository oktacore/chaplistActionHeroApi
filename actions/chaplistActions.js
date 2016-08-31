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
        pais: {
            required: true
        },
        lastUuidSupermercado: {
          required: false
        }
    },

    run: function (api, data, next) {
        // data.response.params = data.params;
        const uuidSupermercado = api.cassandra.types.Uuid.fromString(data.params.lastUuidSupermercado || '00000000-0000-0000-0000-000000000000');
        const nombrePais = 'guatemala';
        // console.log(uuidSupermercado);
        api.cassandra.client.execute('SELECT * FROM supermercado_por_pais WHERE nombre_pais = ? AND id_super > ? limit 10', [nombrePais, uuidSupermercado], {prepare: true}, function (err, res) {
          // console.log(require('util').inspect(res, { depth: 2 }));
          data.response.err = err;
          data.response.supermercados = res.rows;
          next();
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
    },

    run: function (api, data, next) {
        // data.response.params = data.params;
        api.cassandra.client.execute('SELECT * FROM Sucursales', [], {prepare: true, consistency: api.cassandra.types.consistencies.quorum }, function (err, res) {
          data.response.err = err;
          if (res) {
            data.response.supermercados = res.rows;
          }
          next();
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
        uuidSupermercado: {
          required: true
        },
        lastUuidOferta: {
          required: false
        }
    },

    run: function (api, data, next) {
        // api.chaplistInit.getProductsInOffer(data.params.supermarketId, data.params.offset, data.params.token, function (res, error) {
        //     sendInfo(res, error, data, next);
        // });
        data.response.params = data.params;
        next();
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

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
        const nombrePais = 'Guatemala';
        // console.log(uuidSupermercado);
        api.cassandra.client.execute('SELECT * FROM supermercado_por_pais WHERE nombre_pais = ? AND id_super > ? limit 10', [nombrePais, uuidSupermercado], {prepare: true}, function (err, res) {
          // console.log(require('util').inspect(res, { depth: 2 }));
          data.response.err = err;
          data.response.res = res.rows;
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
            data.response.res = res.rows;
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
        nombreSupermercado: {
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
        // console.log('UUID: ' + data.params.lastUuidOferta);
        // console.error(new Error('UUID: ' + data.params.lastUuidOferta));
        // const uuidSupermercado = api.cassandra.types.Uuid.fromString(data.params.lastUuidSupermercado);

        const uuidOferta = api.cassandra.types.Uuid.fromString(data.params.lastUuidOferta || '00000000-0000-0000-0000-000000000001');
        const fecha = new Date();
        // console.log(uuidSupermercado);
        api.cassandra.client.execute('SELECT * FROM Ofertas_por_supermercado WHERE supermercado_nombre = ? AND id_oferta > ? limit 10', [data.params.nombreSupermercado, uuidOferta], {prepare: true}, function (err, res) {
          // console.log(require('util').inspect(res, { depth: 2 }));
          data.response.err = err;
          data.response.res = res.rows;
          next();
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
    },
    run: function (api, data, next) {
      // TODO: terminar
      api.cassandra.client.execute('SELECT * FROM Ofertas_top WHERE puntuacion=5 LIMIT 10', [], {prepare: true}, function (err, res) {
        // console.log(require('util').inspect(res, { depth: 2 }));
        data.response.err = err;
        data.response.res = res.rows;
        next();
      });
    }
};


exports.getComments = {
    name: 'getComments',
    description: 'getComments',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],
    inputs: {
      inputs: {
          offerId: {
              required: true
          },
          lastDate: {
            required: false
          }
      },
    },
    run: function (api, data, next) {
      const uuidOferta = api.cassandra.types.Uuid.fromString(data.params.offerId);
      const ultimaFecha = new Date(lastDate);

      api.cassandra.client.execute('SELECT * FROM Ofertas WHERE id_oferta = ? AND fecha >= ? limit 10', [uuidOferta, fecha], {prepare: true}, function (err, res) {
        // console.log(require('util').inspect(res, { depth: 2 }));
        data.response.err = err;
        if (res) {
          data.response.res = res.rows;
        }
        next();
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

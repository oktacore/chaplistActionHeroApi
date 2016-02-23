exports.uploadStores = {
    name: 'uploadStores',
    description: 'upload stores that exist in the differents supermarkets',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        stores: {
            required: true
        }
    },

    run: function (api, data, next) {
        var error = null;
        var params = data.params;
        var size = data.params.stores.length;
        var i;
        for (i = 0; i < size; i++) {
            api.storeInit.createStore(params.stores[i], function (res, error) {
                if (error) {
                    data.response = res + "\n" + "por favor revise su archivo de entrada o comuniquese con el administrador del sistema";
                    next(error, true);
                } else if (i == size - 1) {
                    data.response("carga efectuada exitosamente");
                    next();
                }
            });
        }
    }
};
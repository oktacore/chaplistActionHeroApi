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
            data.response = res;
            next(data.response, error);
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
            data.response = res;
            next(data.response, error);
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
            data.response = res;
            next(data.response, error);
        });
    }
};

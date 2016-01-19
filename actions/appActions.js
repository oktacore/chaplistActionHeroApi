exports.getApps = {
    name: 'getApps',
    description: 'get all apps from specific user, defined by valid token param',
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
        api.tokenInit.validateToken(data.params.token, function (res, error) {
            res = JSON.parse(res);
            if (!res.valid) {
                data.errors = res.data;
                next(data.errors, error);
            } else {
                api.appInit.getApps(res.data, function (res, error) {
                    data.response = res;
                    next(data.response, error);
                });
            }

        });
    }
};

//id_user, data, next, name, appSecret, packageName, hashKey

exports.createApp = {
    name: 'createApp',
    description: 'create new app from specific user, defined by valid token param',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],
    inputs: {
        token: {required: true},
        name: {required: true},
        packageName: {required: true},
        hashKey: {required: true}
    },
    run: function (api, data, next) {
        api.tokenInit.validateToken(data.params.token, function (res, error) {
            res = JSON.parse(res);
            if (!res.valid) {
                data.errors = res.data;
                next(data.errors, error);
            } else {
                api.appInit.createApp(res.data, data.params, function (res, error) {
                    data.response = res;
                    next(data.response, error);
                });
            }
        });
    }
};
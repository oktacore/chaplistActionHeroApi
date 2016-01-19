exports.getApps = {
    name: 'getApps',
    description: 'appActions',
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
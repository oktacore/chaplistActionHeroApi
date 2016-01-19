var crypto = require('crypto');
exports.addUser = {
    name: 'addUser',
    description: 'addUser',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        firstName: {
            required: true
        },
        password: {
            required: true
        },
        lastName: {
            required: true
        },
        email: {
            required: true
        }

    },

    run: function (api, data, next) {
        if (data.params.password.length < 6) {
            data.error = "password must be longer than 6 chars";
            next(data.error, true)
        } else {
            var passwordSalt = 'ASDLKJASDLFKJ005165485' //api.utils.randomString(64);
            var passwordHash = crypto.createHash('sha256').update(passwordSalt + data.params.password).digest("hex");

            api.mySQL.myuser
                .build({
                    email: data.params.email,
                    passwordHash: passwordHash,
                    passwordSalt: passwordSalt,
                    firstName: data.params.firstName,
                    lastName: data.params.lastName,
                })
                .save()
                .then(function (user) {
                    data.response = user;
                    next(data.response, true);
                })
                .catch(function (error) {
                    data.errors = error.message;
                    next(data.errors, true);
                });
        }
    }
};



exports.usersList = {
    name: "usersList",
    description: "I list all the users",
    authenticated: false,
    outputExample: {},
    version: 1.0,

    run: function (api, data, next) {
        api.mySQL.myuser.findById(1)
            .then(function (list) {
                data.response = list;
                next(data.response, true);

            })
            .catch(function (error) {
                data.errors = error.message;
                next(data.errors, true);
            })
    }
};


exports.createApps = {
    name: "createApps",
    description: "I list all the users",
    authenticated: false,
    outputExample: {},
    version: 1.0,
    inputs: {
        name: {
            required: true
        },
        user_id: {
            required: true
        }

    },
    run: function (api, data, next) {
        api.mySQL.myuser.findById(data.params.user_id)
            .then(function (user) {
                console.log('******************\n', user, '******************\n');
                user.createApp({
                        name: data.params.name
                    })
                    .then(function (app) {
                        data.response = app;
                        next(data.response, true);
                    })
                    .catch(function (error) {
                        data.errors = error;
                        next(data.errors, true);
                    });
            })
            .catch(function (error) {
                data.errors = error.message;
                next(data.errors, true);
            })
    }
};

exports.authGoogle = {
    name: "authGoogle",
    description: "authenticate using google+ and generate a token for the session",
    authenticated: false,
    outputExample: {},
    inputs: {
        email: {required: true},
        image: {required: true},
        user_id: {required: true},
        firstName: {required: false},
        lastName: {required: false}
    },
    version: 1.0,

    run: function (api, data, next) {
        api.userInit.addOrCreate(data.params, function (res, error) {
            data.response = res;
            next(data.response, error);
        });
    }
};

exports.post = {
    name: "post",
    description: "I list all the users",
    authenticated: false,
    outputExample: {},
    inputs: {
        token: {
            required: true
        },
    },
    version: 1.0,

    run: function (api, data, next) {
        api.tokenInit.validateToken(data.params.token, function (res, error) {
            data.response = res;
            next(data.response, error);
        });
    }
};



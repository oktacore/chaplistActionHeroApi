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

    run: function (api, connection, next) {
        if (connection.params.password.length < 6) {
            connection.error = "password must be longer than 6 chars";
            next(connection.error, true)
        } else {
            var passwordSalt = 'ASDLKJASDLFKJ005165485' //api.utils.randomString(64);
            var passwordHash = crypto.createHash('sha256').update(passwordSalt + connection.params.password).digest("hex");

            api.mySQL.myuser
                .build({
                    email: connection.params.email,
                    passwordHash: passwordHash,
                    passwordSalt: passwordSalt,
                    firstName: connection.params.firstName,
                    lastName: connection.params.lastName,
                })
                .save()
                .then(function (user) {
                    connection.response = user;
                    next(connection.response, true);
                })
                .catch(function (error) {
                    connection.errors = error.message;
                    next(connection.errors, true);
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

    run: function (api, connection, next) {
        api.mySQL.myuser.findById(1)
            .then(function (list) {
                connection.response = list;
                next(connection.response, true);

            })
            .catch(function (error) {
                connection.errors = error.message;
                next(connection.errors, true);
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
    run: function (api, connection, next) {
        api.mySQL.myuser.findById(connection.params.user_id)
            .then(function (user) {
                console.log('******************\n', user, '******************\n');
                user.createApp({
                        name: connection.params.name
                    })
                    .then(function (app) {
                        connection.response = app;
                        next(connection.response, true);
                    })
                    .catch(function (error) {
                        connection.errors = error;
                        next(connection.errors, true);
                    });
            })
            .catch(function (error) {
                connection.errors = error.message;
                next(connection.errors, true);
            })
    }
};

exports.authGoogle = {
    name: "authGoogle",
    description: "I list all the users",
    authenticated: false,
    outputExample: {},
    inputs: {
        email: {required: true},
        image: {required: true},
        user_id: {required: true},
        firstName: {required: true},
        lastName: {required: true}
    },
    version: 1.0,

    run: function (api, connection, next) {
        api.userInit.addOrCreate(connection.params, function(res,error){
            connection.response = res;
           next(connection.response, error) ;
        });
    }
};

exports.post = {
    name: "post",
    description: "I list all the users",
    authenticated: false,
    outputExample: {},
    inputs: {
        token: {required: true},        
    },
    version: 1.0,

    run: function (api, connection, next) {
        api.tokenInit.validateToken(connection.params.token, function(res,error){
            connection.response = res;
           next(connection.response, error) ;
        });
    }
};


exports.getApps = {
    name: "getApps",
    description: "I list all the users",
    authenticated: false,
    outputExample: {},
    version: 1.0,
    inputs: {
        user_id: {
            required: true
        }

    },

    run: function (api, connection, next) {
        api.mySQL.myuser.findById(connection.params.user_id)
            .then(function (user) {
                console.log('******************\n', user, '******************\n');
                user.getApps()
                    .then(function (app) {
                        connection.response = app;
                        next(connection.response, true);
                    })
                    .catch(function (error) {
                        connection.errors = error;
                        next(connection.errors, true);
                    });
            })
            .catch(function (error) {
                connection.errors = error.message;
                next(connection.errors, true);
            })
    }
};
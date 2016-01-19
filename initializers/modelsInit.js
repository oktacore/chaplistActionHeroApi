var fs = require('fs');
module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.models = {};

        api.SequelizeBase = require("sequelize");
        api.sequelize = new api.SequelizeBase(api.config.sequelize.database, api.config.sequelize.username, api.config.sequelize.password, {
            host: api.config.sequelize.host,
            port: api.config.sequelize.port,
            dialect: 'mysql'
        });

        var files = fs.readdirSync("models")
        var mySQL = []
        for (var i in files) {
            mySQL.push(files[i].split(".")[0])
        }
        mySQL.forEach(function (model) {
            api.models[model] = api.sequelize.import(__dirname + "./../models/" + model + ".js");
        });

        next();
    },
    start: function (api, next) {
        api.models.user.hasMany(api.models.app, {
            foreignKey: 'userId'
        });
        api.models.app.belongsTo(api.models.user, {
            foreignKey: 'userId'
        });
        next();
    },
    stop: function (api, next) {
        next();
    }
};
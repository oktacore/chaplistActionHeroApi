var fs = require('fs');
module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.mySQL = {};

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
            api.mySQL[model] = api.sequelize.import(__dirname + "./../models/" + model + ".js");
        });

        next();
    },
    start: function (api, next) {
        api.mySQL.myuser.hasMany(api.mySQL.app, {
            foreignKey: 'user_id'
        });
        api.mySQL.app.belongsTo(api.mySQL.myuser, {
            foreignKey: 'user_id'
        });
        next();
    },
    stop: function (api, next) {
        next();
    }
};
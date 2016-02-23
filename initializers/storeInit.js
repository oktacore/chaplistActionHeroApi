var _= require('lodash');
module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.storeInit = {
            createStore: function (data, next) {
                var params = _.pick(data, 'name','phoneNumber', 'address','latitude','longitude');
                var supermarketId = _.pick(data,'supermarketId');
                api.models.supermarket.findById(supermarketId.supermarketId)
                    .then(function (supermarket) {
                        supermarket.createStore(params)
                            .then(function (store) {
                                next(JSON.stringify(store), false);
                            })
                            .catch(function (error) {
                                next(JSON.stringify(error), true);
                            });
                    })
                    .catch(function (error) {
                        next(JSON.stringify(error.message), true);
                    });
            }
    };

    next();
  },
  start: function(api, next){
    next();
  },
  stop: function(api, next){
    next();
  }
};

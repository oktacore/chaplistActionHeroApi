module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.offerInit = {
      updateOffer: function(supermarket){
        api.models.offer.update({
          current : false
          },{
            where: {
              current : true,
              $and : {supermarketId : supermarket}
            }
        }).then(function (offer) {
            next(JSON.stringify(offer), true);
        })
         .catch(function (error) {
            next(JSON.stringify(error), true);
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

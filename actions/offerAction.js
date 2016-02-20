exports.action = {
  name:                   'uploadOffers',
  description:            'upload the offers from exel',
  blockedConnectionTypes: [],
  outputExample:          {},
  matchExtensionMimeType: false,
  version:                1.0,
  toDocument:             true,
  middleware:             [],

  inputs: { 
    offers : {
      required : true
    },
    supermarket: {
      required : true
    },
    finicio : {
      requeried : true
    },
    ffin : {
      requeried : true
    }
  },

  run: function(api, data, next){
    var error = null;
    api.offerInit.updateOffer(data.params.supermarket);
    api.offerInit.createOffer(data.params.finicio,data.params.ffin,data.params.supermarket,function(offer){
        var size = data.params.offers.length;
        var i;
        for (i = 0; i < size; i++) {
            api.offerInit.addProduct(offer,data.params.offers[i], function (res, error) {
                data.response = res+" \n ";
            });
        }
      });
    console.log("ofertas : ---"+data.params.offers[0].descripcion+"\n");
    console.log("supermarket : ---"+data.params.supermarket+"\n");
    console.log("Inicio : ---"+data.params.finicio+"\n");
    console.log("Fin : ---"+data.params.ffin+"\n");
    
    next(error);
  }
};
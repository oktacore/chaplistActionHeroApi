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
     api.offerInit.updateOffer(data.supermarket);
    console.log("ofertas : ---"+data.params.offers+"\n");
    console.log("supermarket : ---"+data.params.supermarket+"\n");
    console.log("Inicio : ---"+data.params.finicio+"\n");
    console.log("Fin : ---"+data.params.ffin+"\n");
    
    next(error);
  }
};
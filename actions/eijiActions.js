exports.getOffersByProduct = {
  name: 'getOffersByProduct',
  description: 'getOffersByProduct',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      upc: {
        required: true
      }
    },

    run: function (api, data, next) {
      //var d = new Date();
      api.cassandra.client.execute('select * from Ofertas_por_producto where upc=?', [data.params.upc], {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getFavorites = {
  name: 'getFavorites',
  description: 'getFavorites',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      userId: {
        required: true
      }
    },

    run: function (api, data, next) {
      api.cassandra.client.execute('select * from Favoritos_por_usuario where id_usuario=?', [data.params.userId], {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getCategories = {
  name: 'getCategories',
  description: 'getCategories',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {

    },

    run: function (api, data, next) {
      api.cassandra.client.execute('select * from Categoria', {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getOffersByCategory = {
  name: 'getOffersByCategory',
  description: 'getOffersByCategory',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      category: {
        required: true
      }
    },

    run: function (api, data, next) {
      //var d = new Date();
      api.cassandra.client.execute('select * from Ofertas_por_categoria where categoria=?', [data.params.category], {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getOffersByPrice = {
  name: 'getOffersByPrice',
  description: 'getOffersByPrice',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      max: {
        required: true
      },
      min: {
        required: true
      }
    },

    run: function (api, data, next) {
      //var d = new Date();
      api.cassandra.client.execute('select * from Ofertas_por_precio where precio_oferta <= ? and precio_oferta >= ? allow filtering'
      , [parseFloat(data.params.max), parseFloat(data.params.min)]
      , {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        console.log(err);
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getOffersByDiscount = {
  name: 'getOffersByDiscount',
  description: 'getOffersByDiscount',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      max: {
        required: true
      },
      min: {
        required: true
      }
    },

    run: function (api, data, next) {
      //var d = new Date();
      api.cassandra.client.execute('select * from Ofertas_por_descuento where descuento <= ? and descuento>=? allow filtering'
      , [parseFloat(data.params.max), parseFloat(data.params.min)]
      , {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getVisitasUsuario = {
  name: 'getVisitasUsuario',
  description: 'getVisitasUsuario',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      offerId: {
        required: true
      },
      userId: {
        required: true
      }
    },

    run: function (api, data, next) {
      api.cassandra.client.execute('select * from Oferta_visita_por_usuario where id_oferta=? and id_usuario=?', [data.params.offerId, data.params.userId], {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getVisitasPais = {
  name: 'getVisitasPais',
  description: 'getVisitasPais',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      offerId: {
        required: true
      },
      pais:{
        required: true
      }
    },

    run: function (api, data, next) {
      api.cassandra.client.execute('select * from Oferta_visita_por_usuario_pais where id_oferta=? and id_pais', [data.params.offerId, data.params.pais], {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.createComment = {
  name: 'createComment',
  description: 'createComment',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      offerId: {
        required: true
      },
      userId:{
        required: true
      },
      comment:{
        required: true
      }
    },

    run: function (api, data, next) {
      var d = new Date();
      api.cassandra.client.execute('insert into comentario_oferta(id_oferta, id_usuario, comentario, fecha) values(?,?,?,?)', [data.params.offerId, data.params.user_id, data.params.comment, d], {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.getUserInfo = {
  name: 'getUserInfo',
  description: 'getUserInfo',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      userId: {
        required: true
      }
    },

    run: function (api, data, next) {
      api.cassandra.client.execute('select * from Usuario where id=?', [data.params.userId], {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

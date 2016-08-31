exports.uploadOffers = {
    name: 'uploadOffers',
    description: 'upload the offers from exel',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        offers: {
            required: true
        },
        supermarket: {
            required: true
        },
        finicio: {
            requeried: true
        },
        ffin: {
            requeried: true
        }
    },

    run: function (api, data, next) {
      var error = null;
      var size = data.params.offers.length;
      for (i = 0; i < size; i++) {
        var offer = data.params.offers[i];
        var count = 1;
        //api.cassandra.client.execute('select COUNT(*) from Oferta_por_id', {prepare: true, consistency: api.cassandra.types.consistencies.all}, function(err, result){
          //data.response.err = err;
        //  if (result) {
              //data.response.oferta = result.rows;
              //count = result.rows[0].count;
              var bucket = 1;//Math.trunc(count/100);

              var Uuid = require('cassandra-driver').types.Uuid;
              var id = Uuid.random();
              api.cassandra.client.execute('INSERT INTO Oferta_por_id(bucket, id_oferta, imagenes, fecha_inicio, fecha_final,'
                + 'precio_normal, precio_oferta, upcs, nombre, descuento, categoria, sucursales, puntuacion, supermercado_nombre)'
                + ' VALUES(?,?,?,?,?,?,?,?,?,?,?,'+offer.sucursales+',?,?)'
              , [bucket, id, [offer.image], data.params.finicio, data.params.ffin
                , parseFloat(offer.normalPrice), parseFloat(offer.offerPrice), [offer.upc], '\''+offer.descripcion+'\'', 0
                , offer.category, 0, data.params.supermarket]
              , {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
                console.error(new Error(err));
                data.response.err = err;
                if (result) {
                    //data.response.oferta = data.params.offers[i].descripcion + " insertada";
                }
                  next();
                });

                api.cassandra.client.execute('INSERT INTO Ofertas_por_producto(upc, id_oferta, nombre, precio_oferta, '
                    + 'fecha_fin, imagen, puntuacion, descuento) VALUES(?,?,?,?,?,?,?,?)'
                  , [offer.upc, id, offer.descripcion, parseFloat(offer.offerPrice)
                    , data.params.ffin, offer.image, 0, 0]
                  , {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
                  data.response.err = err;
                  console.error(new Error(err));
                  if (result) {
                      data.response.oferta = result.rows;
                  }
                  next();
                });

                api.cassandra.client.execute('INSERT INTO Ofertas_por_precio(id_oferta, nombre, precio_oferta, '
                    + 'fecha_final, imagen, puntuacion) VALUES(?,?,?,?,?,?)'
                  , [id, offer.descripcion, parseFloat(offer.offerPrice)
                    , data.params.ffin, offer.image, 0]
                  , {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
                  data.response.err = err;
                  console.error(new Error(err));
                  if (result) {
                      data.response.oferta = result.rows;
                  }
                  next();
                });

                api.cassandra.client.execute('INSERT INTO Ofertas_por_descuento(id_oferta, nombre, descuento, '
                    + 'fecha_final, imagen, puntuacion) VALUES(?,?,?,?,?,?)'
                  , [id, offer.descripcion, parseFloat(offer.descuento)
                    , data.params.ffin, offer.image, 0]
                  , {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
                  data.response.err = err;
                  console.error(new Error(err));
                  if (result) {
                      data.response.oferta = result.rows;
                  }
                  next();
                });
        //  }
        //  next();
        //});



      }
      next(error);
    }
  };

exports.getOfferDetail = {
  name: 'getOfferDetail',
  description: 'getOfferDetail',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

    inputs: {
      offerId: {
        required: true
      }
    },

    run: function (api, data, next) {
      api.cassandra.client.execute('select * from Oferta_por_id where bucket=? and id_oferta=?', [1,data.params.offerId], {prepare: true, consistency: api.cassandra.types.consistencies.all}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.oferta = result.rows;
        }
        next();
      });
    }
};

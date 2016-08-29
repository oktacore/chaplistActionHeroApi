exports.action = {
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
        const cassandraD = require('cassandra-driver');
         const cliente = new cassandraD.Client({ contactPoints: ['127.0.0.1'], keyspace: 'chaplist'});
         var size = data.params.offers.length;
         for (i = 0; i < size; i++) {
           const query = 'INSERT INTO Oferta_por_id(bucket, id_oferta, imagenes, fecha_inicio, fecha_final, '
             + 'precio_normal, precio_oferta, upcs, nombre, descuento, categorias, sucursales, puntuacion)'
             + 'VALUES(1,uuid(),{\''+data.params.offers[i].image+'\'}, \''+data.params.finicio+'\', \''
             +data.params.ffin+'\', '+data.params.offers[i].normalPrice+', '+data.params.offers[i].offerPrice+', {\''+data.params.offers[i].upc
             +'\'}, \''+data.params.offers[i].descripcion+'\', 0, {\'categoria\'}, {\'sucursales\'}, 0);';
             cliente.execute(query, function(err, result) {
             });
         }
        next(error);
    }
};

exports.addFavorite = {
    name: 'addFavorite',
    description: 'addFavorite',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    //TODO: revisar upc
    inputs: {
      userId: {required: true},
      upc: {required: true}
    },

    run: function (api, data, next) {
      const fav = {
        uuidUsuario: userId,
        upc: data.params.upc
      };

      const query = 'INSERT INTO Favoritos_por_usuario (id_usuario, upc) VALUES (?, ?)';
      const params = [fav.uuidUsuario, fav.upc];

      api.cassandra.client.execute(query, params, {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.addVisitaUsuario = {
    name: 'addVisitaUsuario',
    description: 'addVisitaUsuario',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
      userId: {required: true},
      offerId: {required: true}
    },

    run: function (api, data, next) {
      const uuidUsuario = api.cassandra.types.Uuid.fromString(data.params.userId)
      const uuidOferta = api.cassandra.types.Uuid.fromString(data.params.offerId)

      const visita = {
        uuidUsuario: uuidUsuario,
        uuidOferta: uuidOferta,
      };

      const query = 'UPDATE Oferta_visita_por_usuario SET counter = counter + 1 WHERE id_usuario = ? AND idOferta = ?';
      const params = [visita.uuidUsuario, visita.uuidOferta];

      api.cassandra.client.execute(query, params, {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.addVisitaUsuario = {
    name: 'addVisitaUsuario',
    description: 'addVisitaUsuario',
    blockedConnectionTypes: [],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
      paisId: {required: true},
      offerId: {required: true}
    },

    run: function (api, data, next) {
      const uuidPais = api.cassandra.types.Uuid.fromString(data.params.paisId)
      const uuidOferta = api.cassandra.types.Uuid.fromString(data.params.offerId)

      const visita = {
        uuidPais: uuidPais,
        uuidOferta: uuidOferta,
      };

      const query = 'UPDATE Oferta_visita_por_usuario SET counter = counter + 1 WHERE id_usuario = ? AND idOferta = ?';
      const params = [visita.uuidPais, visita.uuidOferta];

      api.cassandra.client.execute(query, params, {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

exports.uploadStores = {
    name: 'uploadStores',
    description: 'upload stores that exist in the differents supermarkets',
    blockedConnectionTypes: ['http'],
    outputExample: {},
    matchExtensionMimeType: false,
    version: 1.0,
    toDocument: true,
    middleware: [],

    inputs: {
        uuidSupermercado: {required: false},
        nombre: {required: true},
        imagen: {required: true},
        longitud: {required: true},
        latitud: {required: true},
        calle: {required: true},
        numero: {required: true},
        zona: {required: true},
        ciudad: {required: true},
        pais: {required: true},
        telefono: {required: true},
    },

    run: function (api, data, next) {
      const uuid = data.params.uuidSupermercado ?
        api.cassandra.types.Uuid.fromString(data.params.uuidSupermercado) :
        api.casssandra.Uuid.random();

      const supermercado = {
        uuid: uuid,
        nombre: data.params.nombre,
        imagen: data.params.imagen,
        coordenadas: {
          longitud: data.params.longitud,
          latitud: data.params.latitud
        },
        direccion: {
          calle: data.params.calle,
          numero: data.params.numero,
          zona: data.params.zona,
          ciudad: data.params.ciudad,
          pais: data.params.pais,
        },
        telefono: [data.params.telefono]
      };

      const query = 'INSERT INTO Sucursales (id, nombre, imagen, coordenadas, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?)';
      const params = [supermercado.uuid, supermercado.nombre, supermercado.imagen, supermercado.coordenadas, supermercado.direccion, supermercado.telefono];

      api.cassandra.client.execute(query, params, {prepare: true, consistency: api.cassandra.types.consistencies.quorum}, function(err, result){
        data.response.err = err;
        if (result) {
            data.response.res = result.rows;
        }
        next();
      });
    }
};

module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
      const cassandra = require('cassandra-driver');
      const distance = cassandra.types.distance;

      const options = {
         contactPoints: ['192.9.201.251', '192.9.201.253'],
         keyspace: 'chaplist',
         pooling: {
            coreConnectionsPerHost: {
              [distance.local]: 2,
              [distance.remote]: 1
            }
         }
      };
      console.log('a3');
      const client = new cassandra.Client(options);
      api.cassandra = {
        client: client,
        types: cassandra.types
      }
      console.log('a4');
      next();
    },

    start: function (api, next) {
        next();
    },

    stop: function (api, next) {
        next();
    }
};

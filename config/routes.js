exports.default = {
  routes: function(api){
    return {

      /* ---------------------
      routes.js

      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: http://www.actionherojs.com/docs/#routes

      examples:

      get: [
        { path: '/users', action: 'usersList' }, // (GET) /api/users
        { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' }, // (GET) /api/search/car/limit/10/offset/100
      ],

      post: [
        { path: '/login/:userID(^\\d{3}$)', action: 'login' } // (POST) /api/login/123
      ],

      all: [
        { path: '/user/:userID', action: 'user', matchTrailingPathParts: true } // (*) /api/user/123, api/user/123/stuff
      ]

      ---------------------- */
      get: [
        { path: '/getApps/:token', action: 'getApps' }
      ],
      post: [
        { path: '/auth/google', action: 'authGoogle' },
        { path: '/post', action: 'post' }
          ///:email/:lastName/:firstName/:password
          ///user/1/tamy.vivas@gmail.com/Vivas/TAmy/abc123**
          //http://192.168.122.11:8080/api/user/1/tamy.vivas@gmail.com/Vivas/TAmy/abc123**
      ]
    }
  }
}
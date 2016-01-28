module.exports = {
    loadPriority: 1000,
    startPriority: 1000,
    stopPriority: 1000,
    initialize: function (api, next) {
        api.chaplistInit = {
            tokenPetition: function(secretKey, packageName, uuid, next){
                api.appInit.getApp(secretKey, packageName, function(res, error){
                    if(res){
                        api.tokenInit.createToken(uuid, function(res, error){
                            //console.log('****************token\n',res,'\n****************\n');
                            next(res, error);
                        });
                    }else{
                        next(null, error);                        
                    }
                });                
            }
        };

        next();
    },
    start: function (api, next) {
        next();
    },
    stop: function (api, next) {
        next();
    }
};
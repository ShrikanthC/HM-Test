'use strict';

module.exports = function(Driverinfo) {

    Driverinfo.saveOrUpdate = (request,type,callback)=>{
        if(request && request.driverId && request.carId){
            Driverinfo.find({"where":{"or":[{"driverId":request.driverId}]}})

        }else{
            return callback(null,{"message":"Bad Request"})
        }
    }

};

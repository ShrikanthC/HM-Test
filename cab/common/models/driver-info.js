'use strict';

module.exports = function (Driverinfo) {

    Driverinfo.create = (request, type, callback) => {

        if (!request.id) {
            Driverinfo.find({ "where": { "driverId": request.driverId }, "fields": ['carId'] }).then(driverData => {
                if (driverData.length > 0) {
                    return callback(null, error)
                } else if (request.carId) {
                    Driverinfo.find({ "where": { "carId": request.caarId }, "fields": ['driverId'] }).then(carData => {
                        if (carData.length > 0) {
                            return callback(null, error)
                        }
                    })
                }
                else {
                    Driverinfo.create(request)
                }
            })

        } else {
            return callback(null, { "message": "Bad Request" })
        }
    }

};

'use strict';

module.exports = function (Driverinfo) {

    Driverinfo.create = (request, type, callback) => {
        if (!request.id) {
            Driverinfo.find({ "where": { "driverId": request.driverId }, "fields": ['carId'] }).then(driverData => {
                if (driverData.length > 0) {
                    let error = new Error();
                    error.status = 422;
                    error.message = "The given driver already engaged to one car.Driver can be associated to only one car";
                    return callback(null, error)
                } else if (request.carId) {
                    Driverinfo.find({ "where": { "carId": request.caarId }, "fields": ['driverId'] }).then(carData => {
                        if (carData.length > 0) {
                            let error = new Error();
                            error.status = 422;
                            error.message = "The given car already engaged to one driver.car can be associated to only one driver";
                            return callback(null, error)
                        }
                    })
                }
                else {
                    Driverinfo.create(request, (err, driverCarInfo) => {
                        return callback(null, { "message": "carr booked to driver successfully" })
                    })
                }
            })

        }
    }
}

'use strict';

module.exports = function (Driverinfo) {

    Driverinfo.saveOrUpdate = (request, callback) => {
        if (!request.id) {
            //create flow
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
                        return callback(null, { "message": "carr assigned to driver successfully" })
                    })
                }
            })

        } else {
            //update flow
            Driverinfo.find({ "where": { "cardId": request.carId, "isDeleted": 1 } }).then(carInactive => {
                if (carInactive.length > 0) {
                    Driverinfo.upsertWithWhere({ "driverId": request.driverId, "carId": request.carId, "isDeleted": 1 }, { "isDeleted": 0 });
                    return callback(null, { "message": "driver updated the car sucessfully" });
                }
            })

        }
    }
}

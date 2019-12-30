'use strict';
let app = require('../../server/server');
const _ = require('lodash');

module.exports = function (Car) {

    //flow for onboarding cars
    Car.saveOrUpdate = (request, callback) => {
        if (request) {
            // validation for if car details already exists in DB
            Car.find({ "where": { "carName":request.carName,"carNumber": request.carNumber } }).then(carExists => {
                if (carExists.length > 0) {
                    let error = new Error();
                    error.status = 422;
                    error.message = "The entered car number is already onboarded in our accounts.Please verify your details";
                    return callback(null, error);
                }
                // create car details into DB.
                Car.create(request, (err, carInfo) => {
                    if (err) { return callback(null, JSON.stringify(err, null, 2)) };
                    return callback(null, { "message": "car Onboarded Successfully" });
                })
            }).catch(err => {
                errorHandler(err, 'car exists', callback);
            })
        } else {
            return callback(null, { "message": "Bad Request" });
        }
    }

    function errorHandler(err, msg, callback) {
        let error = new Error(err);
        error.status = 422;
        return callback(error)
    }

};

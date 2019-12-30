'use strict';
let app = require('../../server/server');
const _ = require('lodash');

module.exports = function (Driver) {
    //Flow for driver onboarding
    Driver.saveOrUpdate = (request, callback) => {
        if (request) {
            //validation if driver is already exists in DB
            Driver.find({ "where": { "driverName": request.driverName, "driverProof": request.driverProof } }).then(driverExists => {
                if (driverExists.length > 0) {
                    let error = new Error();
                    error.status = 422;
                    error.message = "The Entered driver details already exists in our accounts.please verify the details";
                    return callback(null, error);
                }
                console.log('cominnnggggggggggggg')
                // create driver details into DB
                Driver.create(request, (err, driverInfo) => {
                    console.log(driverInfo)
                    if (err) { return callback(null, JSON.stringify(err, null, 2)) };
                    return callback(null, { "message": "Driver Onboarded Sucessfully" })
                })
            }).catch(err => {
                errorHandler(err, 'driver exists', callback);
            })
        } else {
            return callback(null, { "message": "Bad Request" })
        }
    }

    function errorHandler(err, msg, callback) {
        let error = new Error(err);
        error.status = 422;
        return callback(error)
    }
};

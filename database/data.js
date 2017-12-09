var sql = require('mssql');
var conn = require('./connect');
var request = new sql.Request(conn);
var countId = 1;
function getCountTimes() {
    return new Promise(async function(resolve, reject) {
        try {
            var result = await request.query("Select count_times from receive_data");
            resolve(result.recordsets[0][0].count_times);
        } catch(err) {
            reject(err);
        } 
    });
}
function getCountWarming() {
    return new Promise(async function(resolve, reject) {
        try {
            var result = await request.query("Select count_warming from receive_data");
            resolve(result.recordsets[0][0].count_warming);
        } catch(err) {
            reject(err);
        } 
    });
}
var addNewRecord = function(receive_time,valueOfSwitch,count_times, count_warming) {
    countId++;
    request.query("INSERT INTO receive_data VALUES ("+ countId +",'"+ receive_time + "',"+ valueOfSwitch + ","+ count_times + ","+ count_warming +")"
                ,(err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Updated");
        } 
    });
}
var data = {
    "getCountTimes": getCountTimes,
    "addNewRecord": addNewRecord,
    "getCountWarming": getCountWarming
}
module.exports = data;
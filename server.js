var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
const PORT = process.env.port || 3000;
var sql = require('mssql');
var data = require('./database/data');
var count_times = 0;
var count_warming = 0;
async function checkValueOfSwitch(valueOfSwitch, receive_time) {
    if (valueOfSwitch == 1) {
        count_times++;
        if (count_times == 5) {
            // handle warming.
            count_warming++;
            count_times = 0;
        }
    } else if (valueOfSwitch == 0) {
        count_times = 0;
        count_warming = 0;
    }
    try {
        data.addNewRecord(receive_time, valueOfSwitch, count_times, count_warming);
    } catch (err) {
        throw err;
    }
}
app.post("/data/:value", async (req,res) => {
    var valueOfSwitch = req.params.value; // value of switch.
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay() +3;
    var today = year + "-" + month + "-" + day;
    var time = date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    var receive_time = today + " " + time;
    console.log("receive_time : " + receive_time);
    checkValueOfSwitch(valueOfSwitch, receive_time);
    res.send("Checking...");
});
app.get("/data", (req,res) => {
    res.send("hello");
});
server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Connect successfully with port " + PORT);
});
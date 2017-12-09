var sql = require('mssql');
const config = {
    user: 'sa',
    password: 'sondt123',
    server: 'localhost\\SQLEXPRESS',
    database: 'daq_data'
}
var conn = sql.connect(config, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("connected Database");
        }
    });
module.exports = conn;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'slrlal1!',
    port:3306,
    database:'netflix'
});

function getMovie(callback){
    connection.query('select * from movie',(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
    });
}

module.exports = {
    getMovie
}
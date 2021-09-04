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
        if(err) console.log("getMovie err"+err);
        callback(rows);
    });
}
function getDrama(callback){
    connection.query('select * from drama',(err,rows,fields)=>{
        if(err) console.log("getDrama err"+err);
        callback(rows);
    });
}

function getTv(callback){
    connection.query('select * from tv',(err,rows,fields)=>{
        if(err) console.log("getTv err"+err);
        callback(rows);
    });
}
module.exports = {
    getMovie,
    getDrama,
    getTv
}
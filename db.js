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

function getTvRank(callback){
    connection.query('select tv.rank from tv',(err,rows,fields)=>{
        if(err) console.log("getTvRank err"+err);
        callback(rows);
    })
}
function recommendPlus(id,callback){
    connection.query(`update tv set rank=rank+1 where id=${id}`,(err,row,fields)=>{
        if(err) throw err;
        callback(row);
    });
}
module.exports = {
    getMovie,
    getDrama,
    getTv,
    recommendPlus,
    connection,
    getTvRank
}
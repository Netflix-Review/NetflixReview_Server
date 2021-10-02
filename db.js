const mysql = require('mysql');


const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'slrlal1!',
    port:3306,
    database:'netflix'
});

con.connect((err) => {
    if (err) throw err;
    else console.log("connection success!!");
})

function getMovie(callback){
    con.query('select * from movie',(err,rows,fields)=>{
        if(err) console.log("getMovie err"+err);
        callback(rows);
    });
}
function getDrama(callback){
    con.query('select * from drama',(err,rows,fields)=>{
        if(err) console.log("getDrama err"+err);
        callback(rows);
    });
}

function getTv(callback){
    con.query('select * from tv', (err ,rows)=> {
        if(err) {
            console.error(err)
            return
        } else {
            return rows
        }
    });
}

// const tvData = await getTv();
// if (!tvData) {
//     console.log("Empty")
// } 
function getTvRank(callback){
    con.query('select tv.rank from tv',(err,rows,fields)=>{
        if(err) console.log("getTvRank err"+err);
        callback(rows);
    })
}
function recommendPlus(id,callback){
    con.query(`update tv set rank=rank+1 where id=${id}`,(err,row,fields)=>{
        if(err) throw err;
        callback(row);
    });
}


module.exports = {
    getMovie,
    getDrama,
    getTv,
    recommendPlus,
    con,
    getTvRank
}
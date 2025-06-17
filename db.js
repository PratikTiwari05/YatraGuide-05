const mysql=require('mysql2');
    const pool=mysql.createPool({
        host:'localhost',
        user:'root',
        password:'pass123',
        database:'railway_db',
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0
    });
    module.exports=pool.promise();
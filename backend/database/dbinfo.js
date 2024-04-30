// const mysql = require("mysql2/promise");
// const mysql1 = require("mysql2");
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// const pool = new mysql1.createPool(process.env.DATABASE_URL);
// const poolPromise = new mysql.createPool(process.env.DATABASE_URL);
// module.exports = {
//   pool,
//   poolPromise,
// };

const mongoose = require('mongoose')
const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, ".env") })

async function connect() { //connect to database
    try {
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log('Connect to database successfully')
    }
    catch (error) {
        console.log('Connect to database failed:', error)
    }
}

module.exports = {connect} 

// var sqlite3 = require('sqlite3').verbose()
// var md5 = require('md5')

// const DBSOURCE = "db.sqlite"

// let db = new sqlite3.Database(DBSOURCE, (err) => {
//     if (err) {
//       // Cannot open database
//       console.error(err.message)
//       throw err
//     }else{
//         console.log('Connected to the SQLite database.')
//         db.run(`CREATE TABLE user (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name text, 
//             email text UNIQUE, 
//             password text, 
//             CONSTRAINT email_unique UNIQUE (email)
//             )`,
//         (err) => {
//             if (err) {
//                 // Table already created
//             }else{
//                 // Table just created, creating some rows
//                 var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
//                 db.run(insert, ["admin","admin@example.com",md5("admin123456")])
//                 db.run(insert, ["user","user@example.com",md5("user123456")])
//             }
//         });  
//     }
// });


// module.exports = db
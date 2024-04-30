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

// const mongoose = require('mongoose')
// const path = require("path")
// require("dotenv").config({ path: path.resolve(__dirname, ".env") })

// async function connect() { //connect to database
//     try {
//         await mongoose.connect(process.env.MONGODB_URI); 
//         console.log('Connect to database successfully')
//     }
//     catch (error) {
//         console.log('Connect to database failed:', error)
//     }
// }

// module.exports = {connect} 

// var sqlite3 = require('sqlite3').verbose()
// // var md5 = require('md5')

// const DBSOURCE = "bkhostel.db"

// let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       // Cannot open database
//       console.error('Error in connecting to database:', err.message)
//       throw err
//     }else{
//         console.log('Connected to the SQLite database successfully.')
//     }
// });

const Database = require('better-sqlite3')
const DBSOURCE = "bkhostel.db"
const db = new Database(DBSOURCE, {fileMustExist: true, verbose: console.log})
console.log('Connect to database successfully.')

//for sql statements that get multiple records
all =  (sql, params) => {
  return db.prepare(sql).all(params);
}

//for sql statements that do not get records (insert, update, delete)
run = (sql, params) => {
  return db.prepare(sql).run(params)
}

//for sql statements that get one record
get = (sql, params) => {
  return db.prepare(sql).get(params);
}

module.exports = {
  all,
  run,
  get
}
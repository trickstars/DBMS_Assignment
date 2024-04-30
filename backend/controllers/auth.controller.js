"use strict";
const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const db = require("../database/dbinfo");

// var sqlite3 = require('sqlite3').verbose()
// // var md5 = require('md5')

// const DBSOURCE = "C:/Users/Khoe/OneDrive/Documents/A7_HK232/DBMS/BKHostel/backend/controllers/bkhostell.db"

// let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//       // Cannot open database
//       console.error('Error in connecting to database:', err.message)
//       throw err
//     }else{
//         console.log('Connected to the SQLite database successfully.')
//     }
// });

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    var sql = "select username, full_name, role from users where username = ? and password = ?"
    var params = [username, password]
    // db.get(sql, params, (err, user) => {
    //     if (err) {
    //       res.status(400).json({"error":err.message});
    //       return;
    //     }
      
        const user = db.get(sql, params)

        if (!user) {
          return res
          .status(401)
          .json({ message: "Thông tin đăng nhập không chính xác" });
        }
        // else {
        //   return res.json(user)
        // }

        const token = jwt.sign(
          { id: user.username.toString(), role: user.role },
          process.env.SECRET_KEY
        );
    
        res.json({
          message: "Logged in successfully",
          result: {
            "user-info": {
              user: user.username,
              full_name: user.full_name,
              role: user.role,
            },
          },
          token,
        });
        
      // });
    

    // db.close()   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const signUp = async (req, res) => {
  const { username, phone, email, password, password_confirm } = req.body;

  if (password !== password_confirm) {
    return res.status(422).json({ error: "Mật khẩu không trùng khớp" });
  }

  try {
    // db.serialize(function(){
      //check trung ten dang nhap

      // var hasUsed = false;

      var sql = "select userID from users where username=?"
      var params = [username]
      // db.get(sql, params, (err, user) => {
      //     if (err) {
      //       res.status(400).json({"error":err.message});
      //       return;
      //     }
          var user = db.get(sql, params)

          if(user) {
            return res.status(400).json({
              message: "Tên đăng nhập đã được sử dụng",
            });
            // hasUsed = true;
          }
        // });

        // console.log(hasUsed);
        // if(hasUsed) return;

        //check trung email
        var sql = "select userID from users where email=?"
        var params = [email]
        // db.get(sql, params, (err, user) => {
        //     if (err) {
        //       res.status(400).json({"error":err.message});
        //       return;
        //     }

            var user = db.get(sql, params)

            if(user) {
              return res.status(400).json({
                message: "Email đã được sử dụng",
              });
              // hasUsed = true;
            }
          // });

        // if(hasUsed) return;

        //check trung SDT
        var sql = "select userID from users where phone=?"
        var params = [phone]
        // db.get(sql, params, (err, user) => {
        //     if (err) {
        //       res.status(400).json({"error":err.message});
        //       return;
        //     }
            var user = db.get(sql, params)

            if(user) {
              return res.status(400).json({
                message: "Số điện thoại đã được sử dụng",
              });
              // hasUsed = true;
            }
          // });

      // if(hasUsed) return;

      var sql = "insert into users (username, phone, email, password) values (?, ?, ?, ?)"
      var params = [username, phone, email, password]
      // db.run(sql, params, (err, result) => {
      //     if (err) {
      //       res.status(400).json({"error":err.message});
      //       return;
      //     }

          var result = db.run(sql, params)
          if(result.changes)
          {
            const token = jwt.sign(
              { name: username, role: 'USER' },
              process.env.SECRET_KEY
            );
        
            res.json({
              message: "Sign up successfully",
              token,
            });
          }
        // });
    // })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // db.serialize(function(){
      var sql = "select userID from users where email = ?"
      var params = [email]
      // db.get(sql, params, async (err, user) => {
      //     if (err) {
      //       res.status(400).json({"error":err.message});
      //       return;
      //     }

          var user = db.get(sql, params)

          if(!user) {
            return res.json({
              message: "Email này chưa được đăng ký",
            });
          }

        const newPassword = Math.random().toString(36).slice(2, 8);
        
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "bkhostelhelpsystem@gmail.com",
            // pass: process.env.GMAIL_PASSWORD,
            pass: 'bkhostel18'
          },
        });
        await transporter.verify();
        const content = `
      <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white; border-radius: 5px;">
          <h2 style="color: #0085ff; text-align: center; margin-bottom: 20px;">Trung tâm hỗ trợ BKHostel</h2>
          <p style="color: black; font-size: 16px; line-height: 1.5;">
            Chúng tôi đã hỗ trợ bạn lấy lại mật khẩu. Dưới đây là mật khẩu mới của bạn:
          </p>
          <h3 style="color: #0085ff; font-size: 24px; text-align: center; margin-top: 20px;">${newPassword}</h3>
          <p style="color: black; font-size: 16px; line-height: 1.5;">
            Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi.
          </p>
          <p style="color: black; font-size: 16px; line-height: 1.5; text-align: center;">
            Trân trọng,<br>
            Đội ngũ BKHostel
          </p>
        </div>
      </div>
    `;
        const mailOptions = {
          from: "bkhostelhelpsystem@gmail.com",
          to: email,
          subject: "Thay đổi mật khẩu",
          html: content,
        };
        await transporter.sendMail(mailOptions);
        
        sql = `UPDATE users set 
        password = ? 
        WHERE id = ?`
        params = [newPassword, user.userID]
        // db.run(sql, params, function (err, result) {
        //       if (err){
        //           res.status(400).json({"error": res.message})
        //           return;
        //       }
              var result = db.run(sql, params)
              if(result.changes) {
                res.json({ message: "Đặt lại mật khẩu thành công", address: email });
              }
      // });

    // });
    // })
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Lỗi máy chủ";
    res.status(statusCode).json({ message: message });
  }
};

module.exports = {
  signIn,
  signUp,
  forgotPassword,
};

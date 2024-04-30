"use strict";

const cloudinary = require("cloudinary").v2;
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const Post = require("../models/post.model");
const User = require("../models/user.model");
const moment = require("moment-timezone");
// const moment = require("moment-timezone");

const getUsersInfo = async (req, res) => {
  try {
    let itemsPerPage = 7;
    let page = parseInt(req.query.page) || 1;
    const users = await User.find({})
      .select("full_name email username role status _id")
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const totalUsers = await User.countDocuments({});
    if (!users) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }
    res.json({ totalUsers, users });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id_user } = req.params;
    const user = await User.findOne({ _id: id_user }).select(
      "full_name email username phone zalo facebook avatar _id"
    );
    res.json(user);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ _id: id });

    if (newPassword.length < 6) {
      const error = new Error("Mật khẩu phải chứa ít nhất 6 ký tự");
      error.statusCode = 400;
      throw error;
    }
    if (newPassword != confirmPassword) {
      const error = new Error("Mật khẩu xác nhận không trùng khớp");
      error.statusCode = 400;
      throw error;
    }
    await User.findOneAndUpdate(
      { _id: user.id },
      { $inc: { tokenVersion: 1 } }
    );
    user.password = newPassword;
    await user.save();
    res.json({ message: "Thay đổi mật khẩu thành công" });
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Lỗi máy chủ";
    res.status(statusCode).json({ message: message });
  }
};

const editUser = async (req, res) => {
  try {
    const allowedParams = [
      "username",
      "full_name",
      "phone",
      "email",
      "zalo",
      "facebook",
      "avatar",
      "id",
    ];
    const id = req.body.id;
    const user = await User.findOne({ _id: id });

    const { avatar, ...rest } = req.body;

    const requestBodyKeys = Object.keys(req.body);

    const invalidParams = requestBodyKeys.filter((key) => {
      const isAllowed = allowedParams.includes(key);
      return !isAllowed;
    });
    if (invalidParams.length > 0) {
      return res.status(400).json({
        error: `Invalid parameter(s): ${invalidParams.join(", ")}.`,
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (avatar) {
        const dateTime = moment()
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss");

        const imageName = `${user.id}_${dateTime}`;
        try {
          const uploadResponse = await cloudinary.uploader.upload(avatar, {
            public_id: `${imageName}`,
            folder: "BKHostelID",
          });
          user.avatar = uploadResponse.url;
        } catch (error) {
          console.error("Error uploading image:", error.message);
        }
      }
      Object.keys(rest).forEach((key) => {
        if (rest[key] !== null) {
          user[key] = rest[key];
        }
      });
      await user.save();
      const responseJSON = {
        user: user,
        message: "Cập nhật thành công.",
      };
      res.json(responseJSON);
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    }
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  const { username, full_name, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username: username }, { phone: phone }, { email: email }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "Tài khoản đã tồn tại" });
    }

    const newUser = new User({
      username,
      phone,
      email,
      password,
      full_name,
    });

    const savedUser = await newUser.save();

    res.json({
      message: "Tạo user thành công",
      user: savedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const getPostsInfo = async (req, res) => {
  try {
    let itemsPerPage = 7;
    let page = parseInt(req.query.page) || 1;
    const posts = await Post.find({})
      .select("title created_by createDate full_address.district status _id")
      .populate({
        path: "created_by",
        select: "full_name",
      })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const totalPosts = await Post.countDocuments({});
    return res.json({ totalPosts, posts });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

module.exports = {
  getUsersInfo,
  getUserProfile,
  changePassword,
  editUser,
  addUser,
  getPostsInfo,
};

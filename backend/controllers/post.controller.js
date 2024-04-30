"use strict";

const { formattedPrice, formatDateAgo } = require("../utils/format");
const cloudinary = require("cloudinary").v2;
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const { chargeBackPayment } = require("./payment.controller");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const Post = require("../models/post.model");
const User = require("../models/user.model");
const districts = require("../models/district");
const wards = require("../models/ward");
// const moment = require("moment-timezone");
const mongoose = require("mongoose");
const type_post = [
  "Cho thuê phòng trọ",
  "Nhà cho thuê",
  "Căn hộ cho thuê",
  "Tìm người ở ghép",
];
const getPostsModule = async (
  req,
  res,
  Post,
  jwt,
  districts,
  formatDateAgo,
  query,
  page
) => {
  let itemsPerPage = 4;

  const posts = await Post.find(query)
    .select(
      "title area price desc status full_address.district createDate type assets phone_num"
    )
    .slice("assets", 1)
    .populate({
      path: "created_by",
      select: "full_name username -_id",
    })
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage);

  let result = posts.map((post) => {
    post = post.toObject();
    post.type = type_post[post.type];
    post.full_address.city = "Thành phố Hồ Chí Minh";
    post.full_address.district = districts[post.full_address.district];
    post.createDateAgo = formatDateAgo(post.createDate);
    return post;
  });
  const totalPosts = await Post.countDocuments(query);
  let authHeader = "";
  authHeader += req.header("Authorization");
  if (authHeader.length > 0) {
    try {
      const idToken = req.header("Authorization").replace("Bearer ", "");
      jwt.verify(idToken, process.env.SECRET_KEY);
    } catch (err) {
      result = result.map((post) => {
        delete post.phone_num;
        return post;
      });
      return res.json({ totalPosts, result });
    }
    return res.json({ totalPosts, result });
  }
};

const getPosts = async (req, res) => {
  try {
    // Query to fetch the posts with media content (index 1) and specific details

    let query = {
      status: "ACCEPTED",
    };
    let page = parseInt(req.query.page) || 1;
    getPostsModule(req, res, Post, jwt, districts, formatDateAgo, query, page);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const getPostsDetail = async (req, res) => {
  try {
    // Query to fetch the posts with media content (index 1) and specific details
    const { postId } = req.body;

    const post = await Post.findById(postId).populate({
      path: "created_by",
      select: "full_name username -_id",
    });

    if (!post || !post.created_by) {
      return res.status(404).json({ error: "Không tìm thấy post" });
    }
    const result = post.toObject();
    if (result && type_post) {
      result.type = type_post[result.type];
    }

    if (result && result.full_address && wards && districts) {
      if (result.full_address.district) {
        if (wards[result.full_address.district]) {
          result.full_address.ward =
            wards[result.full_address.district][result.full_address.ward];
        }
        result.full_address.district = districts[result.full_address.district];
      }
    }

    result.createDateAgo = formatDateAgo(result.createDate);
    delete result.full_address._id;

    let authHeader = "";
    authHeader += req.header("Authorization");
    if (authHeader.length > 0) {
      try {
        const idToken = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(idToken, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded.id });
        if (user.favorites.includes(postId)) {
          result.is_favorite = true;
        } else result.is_favorite = false;

        res.json(result);
      } catch (err) {
        delete result.phone_num;
        res.json(result);
      }
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const uploadPost = async (req, res) => {
  const allowedParams = [
    "title",
    "customer_type",
    "area",
    "price",
    "desc",
    "expDate",
    "phone_num",
    "images",
    "street",
    "ward",
    "district",
    "service_type",
    "type",
  ];

  const requestBodyKeys = Object.keys(req.body);

  const invalidParams = requestBodyKeys.filter((key) => {
    const isAllowed = allowedParams.includes(key);
    const isNotImage = key !== "images";
    const isNotString = Array.isArray(req.body[key]);
    return isAllowed && isNotImage && isNotString;
  });

  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: `Invalid parameter(s): ${invalidParams.join(
        ", "
      )}. Only 'images' parameter can be an array.`,
    });
  }

  const validationRules = [
    body("title").notEmpty().withMessage("title is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("area").notEmpty().withMessage("Area is required"),
    body("service_type").notEmpty().withMessage("Service type is required"),
    body("images")
      .isArray({ min: 1 })
      .withMessage("At least one image is required"),
  ];

  for (const param of allowedParams) {
    if (req.body[param]) {
      validationRules.push(body(param).trim());
    }
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = req.user;

  const {
    title,
    price,
    street,
    ward,
    district,
    service_type,
    images,
    ...rest
  } = req.body;
  if (!title || !price || !images || images.length === 0) {
    return res.status(400).json({ error: "Invalid request body." });
  }

  try {
    const post = new Post({
      title,
      price,
      service_type: service_type,
      full_address: {
        street_address: street,
        ward: ward,
        district: district,
      },
      ...rest,
      created_by: user.id,
      assets: [], // Initialize images array
    });

    const uploadPromises = images.map(async (fileStr, i) => {
      try {
        if (!/^data:image\/\w+;base64,/.test(fileStr)) {
          // If not, add the base64 tag to the beginning of the string
          fileStr = `data:image/png;base64,${fileStr}`;
        }
        const imageName = `${post._id}_${Date.now()}_${i + 1}`;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          public_id: `${imageName}`,
          folder: "bkhostel",
        });

        return uploadResponse.url;
      } catch (error) {
        console.error("Error uploading image:", error.message);
        throw error;
      }
    });

    const uploadedImageUrls = await Promise.all(uploadPromises);

    post.assets = uploadedImageUrls; // Update images array with URLs
    user.posts_created.push(post.id);
    console.log(post);

    // Add payment logic
    try {
      const Payment = require('../models/payment.model');
      const Service = require('../models/service.model');
      const userBalance = user.balance;
      // if(userBalance === undefined) return res.status(400).json({message: "Cannot find your balance information"})
      console.log(service_type);
      let fee = undefined; 
      Service.findById(service_type)
      .then(service => {
        if(!service) return res.status(404).json({message: "Not found service"});
        console.log('Service: ' + service)
        fee = service.daily_price //default
        console.log('fee in then:' + fee);
        console.log('fee out then:' + fee);
        if(fee === undefined) return res.status(500).json({message: "Something went wrong"});
    
        if(userBalance < fee) return res.status(403).json({message: "Your balance is not enough"})
    
        const newPayment = new Payment({
          user: user.id,
          post: post.id,
          fee,
        });
    
        newPayment.save()
        .then((payment) => 
        {
            user.balance = user.balance - fee;
            user.save()
            // potential error (crash app)
        })
        .catch(err => {
            // console.log("bruh")
            return res.status(500).json({
                message: "Internal Server Error",
                error: err.message
            })
        }) 
      })
    }
    catch (err) {
      console.log("Lỗi thanh toán " + err.message)
      return res.status(500).json(error)
    }

    // await user.save();
    await post.save(); // Save the post document

    const responseJSON = {
      post: post,
      message: "Tạo post thành công.",
    };
    res.status(201).json(responseJSON);
  } catch (error) {
    console.error("Lỗi tạo post:", error.message);
    res.status(500).json(error);
  }
};

const filterPosts = async (req, res) => {
  try {
    const { priceMin, priceMax, areaMin, areaMax, type } = req.query;
    let query = {
      status: "ACCEPTED",
    };

    if (priceMin && priceMax) {
      query.price = { $gte: priceMin, $lte: priceMax };
    }

    if (areaMin && areaMax) {
      query.area = { $gte: areaMin, $lte: areaMax };
    }

    if (type && type >= 1 && type <= 4) {
      query.type = type;
    }
    let page = parseInt(req.query.page) || 1;
    getPostsModule(req, res, Post, jwt, districts, formatDateAgo, query, page);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const getFavoritePosts = async (req, res) => {
  try {
    const user = req.user;
    const favorites = user.favorites;
    const query = {
      _id: { $in: favorites },
      status: "ACCEPTED",
    };
    let page = parseInt(req.query.page) || 1;
    getPostsModule(req, res, Post, jwt, districts, formatDateAgo, query, page);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const getPostsByToken = async (req, res) => {
  try {
    const user = req.user;
    const favorites = user.id;
    const query = {
      created_by: user.id,
    };
    let page = parseInt(req.query.page) || 1;
    getPostsModule(req, res, Post, jwt, districts, formatDateAgo, query, page);
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const addFavoritePosts = async (req, res) => {
  try {
    const user = req.user;
    const postId = req.body.postId;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Mã Post không hợp lệ" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post không tồn tại" });
    }

    if (user.favorites.includes(postId)) {
      return res.status(400).json({ error: "Post already in favorites" });
    }

    user.favorites.push(postId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Post thêm vào yêu thích thành công" });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

const updatePostStatus = async (req, res) => {
  try {
    const lastSegment = req.url.split("/").pop();
    const postId = req.params.postId;
    // console.log(lastSegment);
    const updatedPost = await Post.findById(postId);
    if (!updatedPost)
      return res.status(404).json({ message: "Cannot find post: " + postId });
    // console.log(updatedPost)
    if (updatedPost.status !== "PENDING")
      return res.status(500).json("Cannot update the post status");
    if (lastSegment === "accept") updatedPost.status = "ACCEPTED";
    else if (lastSegment === "reject") updatedPost.status = "REJECTED";
    updatedPost.save();

    chargeBackPayment(postId);
    res.json("Update post status success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteFavoritePosts = async (req, res) => {
  try {
    const user = req.user;
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Mã Post không hợp lệ" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post không tồn tại" });
    }

    user.favorites = user.favorites.filter((favorite) => favorite !== postId);
    await user.save();

    return res.status(200).json({ message: "Xóa post yêu thích thành công" });
  } catch (err) {
    console.error("Error fetching data:", err);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

module.exports = {
  getPostsDetail,
  getPosts,
  filterPosts,
  // getPhone,
  uploadPost,
  getFavoritePosts,
  addFavoritePosts,
  updatePostStatus,
  deleteFavoritePosts,
  getPostsByToken,
};

"use strict";
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Recharge = require("../models/recharge.model");
const Service = require("../models/service.model");
const ObjectId = require("mongodb").ObjectId;
const { faker } = require("@faker-js/faker/locale/vi");

const fakeNewUser = async (req, res) => {
  const newUser = new User({
    username: faker.internet.userName(),
    password: "123456",
    role: faker.helpers.arrayElement(["ADMIN", "USER"]),
    email: faker.internet.email(),
    full_name: faker.person.fullName(),
    phone: faker.phone.number().split(' ').join(''),
    avatar: faker.image.avatar()
  })

  newUser.save()
  .then((theUser) => res.json({
    message: "fake new user successfully",
    user: theUser
  }))
  .catch(err => {
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    });
};

const fakeNewPost = async (req, res) => {
  const newPost = new Post({
    title: faker.lorem.words({min: 3, max: 10}),
    full_address: {
      street_address: faker.location.streetAddress(false),
      ward: faker.number.int({min: 0, max: 6}),
      district: faker.number.int({min: 0, max: 21})
    },
    customer_type: faker.helpers.arrayElements(['Sinh viên', 'Người đi làm'], {min: 1, max: 2}),
    area: faker.number.float({min: 20, max: 100, precision: 0.01}),
    price: faker.commerce.price({min: 1000000, max: 10000000}),
    type: faker.helpers.arrayElements([1, 2, 3, 4]),
    desc: faker.commerce.productDescription(),
    expDate: faker.date.future(),
    phone_num: faker.phone.number().split(' ').join(''),
    status: faker.helpers.arrayElement(['PENDING', 'ACCEPTED', 'REJECTED']),
    assets: [faker.image.avatar(), faker.image.avatar(), faker.image.avatar()],
    created_by: new ObjectId("656a05525f358c9d0d473c69"),
    approved_by: new ObjectId("656a041e41cda94e0a74ef0f"),
    service_type: new ObjectId(faker.helpers.arrayElement([
      "6565ab9bd883ac36e29131d0", 
      "6565ad57d883ac36e29131d4",
      "6565ad89d883ac36e29131d6",
      "6565adb1d883ac36e29131d8",
      "6565bbcce8186be5303b3f64"
    ]))
  })

  newPost.save()
  .then((thePost) => res.json({
    message: "fake new post successfully",
    post: thePost
  }))
  .catch(err => {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  })
};

const fakeNewRecharge = async (req, res) => {
  const newRecharge = new Recharge({
    date: faker.date.past(),
    method: faker.helpers.arrayElement(['MOMO', 'VNPAY', 'ZALOPAY']),
    amount: faker.finance.amount({min: 1000, max: 10000000, dec: 0}),
    note: faker.lorem.words(),
    status: faker.helpers.arrayElement(["SUCCESS", "FAILED"]),
  });

  newRecharge.save()
  .then((theRecharge) => res.json({
    message: "fake new recharge successfully",
    recharge: theRecharge
  }))
  .catch(err => {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    })
  })
}

module.exports = {
  fakeNewUser,
  fakeNewPost,
  fakeNewRecharge,
};

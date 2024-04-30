const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostsDetail,
  uploadPost,
  filterPosts,
  getFavoritePosts,
  addFavoritePosts,
  deleteFavoritePosts,
  getPostsByToken,
  updatePostStatus
} = require("../controllers/post.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
router.get(
  "/posts",
  // #swagger.tags = ['Posts']
  // #swagger.description = 'lấy 4 post 1 trang, thêm query page để sang trang, index từ 1, sdt sẽ ẩn nếu chưa đăng nhập'
  /*
  #swagger.parameters['Authorization'] = {
    in: 'header',
    description: 'Nếu gửi cùng token sẽ có thêm phone của người up' ,
  }
*/
  getPosts
);

router.post(
  "/posts",
  // #swagger.tags = ['Posts']
  // #swagger.description = 'sdt sẽ ẩn nếu chưa đăng nhập'
  getPostsDetail
);

router.get(
  "/posts/user",
  // #swagger.tags = ['Posts']
  // #swagger.description = 'lấy các post mà user đã đăng'
  auth,
  getPostsByToken
);

router.post(
  "/posts/upload",
  auth,
  uploadPost

  // #swagger.tags = ['Posts']
  /*
  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'Allowed params:\n' +
      'title,\n' +
      'desc,\n' +
      'price,\n' +
      'customer_type,\n' +
      'area,\n' +
      'expDate,\n' +
      'phone_num,\n' +
      'images with base64 type,\n' +
      'street,\n' +
      'ward,\n' +
      'district,\n' +
      'service_type lấy từ route service và bỏ id vào,\n' +
      'type,\n' + ' type từ 1 tới 4 là các loại ChoThuePhongTro, NhaChoThue, CanHoChoThue, and TimNguoiOGhep ',
    required: true,
  }
*/
);
router.post(
  "/posts/filter",
  filterPosts
  // #swagger.tags = ['Posts']
  // #swagger.description = 'type từ 1 tới 4 là các loại ChoThuePhongTro, NhaChoThue, CanHoChoThue, and TimNguoiOGhep '
);

router.get(
  "/posts/favorite",
  // #swagger.tags = ['Posts']
  // #swagger.description = 'lấy 4 post 1 trang, thêm query page để sang trang, index từ 1, sdt sẽ ẩn nếu chưa đăng nhập'
  /*
  #swagger.parameters['Authorization'] = {
    in: 'header',
    description: 'Nếu gửi cùng token sẽ có thêm phone của người up' ,
  }
*/
  auth,
  getFavoritePosts
);

router.post(
  "/posts/favorite",
  // #swagger.tags = ['Posts']

  auth,
  addFavoritePosts
);

router.patch("/posts/:postId/accept",
// #swagger.tags = ['Posts']

  auth,
  admin,
  updatePostStatus
);

router.patch("/posts/:postId/reject",
// #swagger.tags = ['Posts']

  auth,
  admin,
  updatePostStatus
);

router.delete(
  "/posts/favorite/:postId",
  // #swagger.tags = ['Posts']
  auth,
  deleteFavoritePosts
);


module.exports = router;

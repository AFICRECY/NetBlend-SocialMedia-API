const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

//  /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// api/user/userId/friend/:friendId
router.route('/:userId/friend/:friendId').post(addFriend).delete(deleteFriend);;




module.exports = router;

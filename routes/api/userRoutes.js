const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
//   addReaction,
//   removeReaction,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUser).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
// router.route('/:userId/reaction').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:userId/reaction/:reactionId').delete(removeReaction);

module.exports = router;

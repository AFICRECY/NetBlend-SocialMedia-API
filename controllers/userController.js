const {User} =require('../models')


module.exports={
    
    getUser(req,res){
        User.find()
        .then(async(users)=>{
            const userObj = {
                users
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },  
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({
                  user,
                  // thought: await thought(req.params.userId),
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : Course.findOneAndUpdate(
                  { user: req.params.userId },
                  { $pull: { user: req.params.userId } },
                  { new: true }
                )
          )
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message: 'User deleted, but no thought found',
                })
              : res.json({ message: 'User successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },


}









// updateUser



// deleteUser


// addFriend


// deleteFriend



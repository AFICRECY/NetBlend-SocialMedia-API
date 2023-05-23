// const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports={
    
    getThought(req, res) {
        Thought.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                    );
                })
                    .then((user) => {
                    if (!user) {
                      return res.status(404).json({message: "No user with this Id"})
                    }
                    res.status(200).json(user)
                  })
                    .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : User.findOneAndUpdate(
                { thought: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId }},
                { runValidators: true, new: true })
          )
          .then((thought) => 
          !thought
          ? res.status(404).json({ message: 'No thought found!' })
          : res.json({message: "Thought deleted!"})
          )
          .catch((err) => res.status(500).json(err));
      },
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((reaction) => 
                !reaction
                    ? res.status(404).json({ message: 'No thought with that ID has been found'})
                    : res.json(reaction)
        )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true }
      )
      .then((user) => 
          !user
              ? res.status(404).json({ message: 'No user found with that ID' })
              : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
      



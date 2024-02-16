const { User, Thought } = require("../models");

// /api/thoughts

module.exports = {
  // GET to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to create a new thought and push the created thought's _id to the associated user's thoughts array field
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // Find the associated user by userId
      const user = await User.findById(req.body.userId);

      // Push the _id of the created thought to the user's thoughts array
      user.thoughts.push(thought._id);

      // Save the user to update the thoughts array
      await user.save();
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this ID." });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought found with that ID" });
      }

      res.json({ message: "Thought deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // /api/thoughts/:thoughtId/reactions
  
  // POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    console.log('You area adding a new reaction');
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID.' });
      }

      res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID.' });
      }

      console.log(req.body.reactionId.typeof);
      res.json({ message: 'Reaction deleted from this thought.' })
    } catch (err) {
        res.status(500).json(err);
    }
  },
};



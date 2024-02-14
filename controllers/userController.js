const { Thought, User } = require('../models');

// /api/users

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!singleUser) {
                return res.status(404).json({ message: 'No user with this ID'});
            };

            res.json(singleUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST (create) a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user with this id.' })
            }

            res.json(user);
        } catch (err){
            res.status(500).json(err);
        }
    },
    // DELETE to remove user by its _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
    
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
            }
            
            // Remove a user's associated thoughts when deleted.
            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );
    
            if (!thought) {
                return res.status(404).json({ message: 'User deleted, but no thoughts found for this user' });
            }
    
            res.json({ message: 'User and thoughts deleted.' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // /api/users/:userId/friends/:friendId

    // POST to add a new friend to a user's friend list
    async addFriend(req, res) {
        console.log('You are adding a new friend.');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to remove a friend from a user's friend list
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: {friendId: req.params.friendId } } },
                { runValidators: true, new: trusted }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID.' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    // delete the thoughts if they exist
    if(thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    // delete the users if they exist
    if(usersCheck.length) {
        await connection.dropCollection('users');
    }

    // An empty array to hold the users
    // const usersArr = [];

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});

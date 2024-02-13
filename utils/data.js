const { User, Thought } = require('../models');

const users = [
  {
    username: "anna",
    email: "anna@test.com",
  },
  {
    username: "nalin",
    email: "nalin@test.com",
  },
  {
    username: "rory",
    email: "rory@test.com",
  },
];

const thoughts = [
  {
    thoughtText: "Penguins are awesome!",
    username: "anna",
    userId: "1",
  },
  {
    thoughtText: "I love dogs!",
    username: "nalin",
    userId: "2",
  },
  {
    thoughtText: "Woof woof!",
    username: "rory",
    userId: "3",
  },
];

module.exports = { users, thoughts };
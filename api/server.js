const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send('Api running!');
});

server.get('/token', (req, res) => {
  const payload = {
    subject: 'thisuser',
    userid: 'sbirmingham',
    favoriteFood: 'Steak',
  };

  const secret = process.env.JWT_SECRET || 'mysecret';

  const options = {
    expiresIn: '30m',
  };

  const token = jwt.sign(payload, secret, options);

  res.json(token);
});

module.exports = server;

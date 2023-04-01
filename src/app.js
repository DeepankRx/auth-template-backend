const express = require('express');
require('./db/connection')
require('dotenv').config();
const authRouter = require('./auth/auth.router');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,

}));
app.use('/api', authRouter);

module.exports = app;

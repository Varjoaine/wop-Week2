'use strict';
const express = require('express');
const app = express();
const passport = require('./utils/pass');
const port = 3000;
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(express.static('uploads'));

app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);

app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.use('/auth', passport.authenticate('jwt', {session: false}), authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

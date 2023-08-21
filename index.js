const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const passport = require('passport');
require('./services/passport');
// DB Setup
mongoose.connect(keys.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

router(app);

// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

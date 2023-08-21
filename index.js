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

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

router(app);

// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

// DB Setup
mongoose
	.connect(
		'mongodb+srv://micasa:Vx19Y1Ri9b2IePDR@cluster0.pmsqi.mongodb.net/?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('🚀 DB Connected!');
		server.listen(port);
		console.log('😎 Server listening on:', port);
	})
	.catch((err) => {
		console.log(`❌ DB Connection Error: ${err.message}`);
	});

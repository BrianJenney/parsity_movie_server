const Authentication = require('./controllers/authentication');
const WatchList = require('./controllers/watchList');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
	app.post('/api/watchlist', requireAuth, WatchList.addMovieToList);
	app.get('/api/watchlist', requireAuth, WatchList.getWatchList);
};

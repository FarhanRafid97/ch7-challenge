const express = require('express');

const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const passport = require('./lib/passport');
const indexRoute = require('./route');

const PORT = 7899;

dotenv.config();
const ONE_HOUR = 60 * 60 * 1000;

const app = express();
app.set('view engine', 'ejs');

//==== FLASH MESSAGE
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: ONE_HOUR },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//======
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('layout', './layouts/main');
app.use('/', indexRoute);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

const express = require('express');
const ejs = require('ejs');
const { routerUser } = require('./route/routeUser');
const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');

const PORT = 7899;

const app = express();
app.set('view engine', 'ejs');

//==== FLASH MESSAGE
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { axAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
//======

app.use(methodOverride('_method'));
app.use(expressLayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerUser);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

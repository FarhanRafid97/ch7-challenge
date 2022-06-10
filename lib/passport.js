const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { Admin, UserGame } = require('../models');

async function authenticate(username, password, done) {
  try {
    const user = await Admin.authenticate({ username, password });

    /*
     done adalah callback, parameter pertamanya adalah error,
     jika tidak ada error, maka kita beri null saja.
     Parameter keduanya adalah data yang nantinya dapat
     kita akses di dalam req.user
    */
    console.log(user);
    return done(null, user);
  } catch (err) {
    console.log(err);
    /* Parameter ketiga akan dilempar ke dalam flash */
    return done(null, false, { message: err.message });
  }
}

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),

  secretOrKey: 'the most secret key',
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    UserGame.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    authenticate
  )
);

/* Serialize dan Deserialize
   Cara untuk membuat sesi dan menghapus sesi
 */
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) =>
  done(null, await Admin.findByPk(id))
);

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport;

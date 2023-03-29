const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("../config/passportLocal");

// Register controller
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "The user already exists." });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters." });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
        await newUser.save();
        res.json({ msg: "Registration successful!" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

// Login controller
exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send(info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user);
    });
  })(req, res, next);
};

// Logout controller
exports.logout = function(req, res) {
    req.logout(function (err) {
        if (err) {
          console.log(err);
        }
        req.session.destroy(function (err) {
          if (err) {
            console.log(err);
          }
          res.clearCookie('connect.sid');
          res.redirect('/');
        });
      });
};


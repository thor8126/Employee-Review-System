const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.fidnOne({ email });
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
            name,
            email,
            password: passwordHash,
        });
        await newUser.save();
        res.json({ msg: "Registration successful!" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};


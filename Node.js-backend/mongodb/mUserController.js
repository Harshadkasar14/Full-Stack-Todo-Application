const User = require('./mUser');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await User.exists({ username });
    if (exists) return res.status(409).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const storedPassword = user.password;

    if (storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2a$')) {
      const match = await bcrypt.compare(password, storedPassword);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      return res.status(200).json({ message: "Login successful (hashed)", user: { username } });

    } else {
      if (password === storedPassword) {
        const newHash = await bcrypt.hash(password, 10);
        user.password = newHash;
        await user.save();

        return res.status(200).json({ message: "Login successful (plain)", user: { username } });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

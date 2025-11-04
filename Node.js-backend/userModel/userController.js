const User = require('./user'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    User.existsByUsername(username, (err, exists) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
        if (exists) {
            return res.status(409).json({ error: "Username already exists" });
        }

        // Hash password and create user
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Server error" });
            }

            User.create(username, hashedPassword, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Server error" });
                }
                res.status(201).json({ message: "User  created successfully" });
            });
        });
    });
};

// exports.login = (req, res) => {
//     const { username, password } = req.body;

//     // Find the user by username
//     User.findByUsername(username, (err, user) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Server error" });
//         }
//         if (!user) {
//             return res.status(404).json({ error: "User  not found" });
//         }

//         // Compare the provided password with the stored hashed password
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: "Server error" });
//             }
//             if (!isMatch) {
//                 return res.status(401).json({ error: "Invalid credentials" });
//             }

//             // If everything is correct, send a success response
//             res.status(200).json({ message: "Login successful", user: { username: user.username } });
//         });
//     });
// };





exports.login = (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    User.findByUsername(username, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedPassword = user.password;

        // Case 1: password is hashed
        if (storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2a$')) {
            bcrypt.compare(password, storedPassword, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Server error" });
                }
                if (!isMatch) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }

                return res.status(200).json({
                    message: "Login successful (hashed)",
                    user: { username: user.username }
                });
            });

        // Case 2: password is plain (not hashed)
        } else {
            if (password === storedPassword) {
                // Optional: upgrade to hashed password immediately
                bcrypt.hash(password, 10, (err, newHashedPassword) => {
                    if (!err) {
                        User.updatePassword(username, newHashedPassword, (err) => {
                            if (err) console.warn("Failed to upgrade password to hash.");
                        });
                    }
                });

                return res.status(200).json({
                    message: "Login successful (plain)",
                    user: { username: user.username }
                });
            } else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        }
    });
};
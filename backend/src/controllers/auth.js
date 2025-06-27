const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.register = (req, res) => {
    const { username, password } = req.body;
    
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.run(query, [username, hash], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: 'Username already exists' });
                }
                return res.status(500).json({ error: 'Error creating user' });
            }
            
            const token = jwt.sign({ id: this.lastID }, JWT_SECRET);
            res.json({ token });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error finding user' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET);
            res.json({ token });
        });
    });
};

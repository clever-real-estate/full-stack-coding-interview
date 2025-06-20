const bcrypt = require('bcryptjs');
const db = require('../db');

const createTestUser = () => {
    const username = 'test';
    const password = 'test123';

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            process.exit(1);
        }

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.run(query, [username, hash], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    console.log('Test user already exists');
                } else {
                    console.error('Error creating test user:', err);
                }
                process.exit(1);
            }
            console.log('Test user created successfully');
            console.log('Username:', username);
            console.log('Password:', password);
            process.exit(0);
        });
    });
};

createTestUser();

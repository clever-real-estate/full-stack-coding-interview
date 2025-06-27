const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../data/photo_gallery.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        // Create tables
        const schema = require('fs').readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        db.exec(schema, (err) => {
            if (err) {
                console.error('Error creating tables:', err);
            } else {
                console.log('Database tables created');
            }
        });
    }
});

module.exports = db;

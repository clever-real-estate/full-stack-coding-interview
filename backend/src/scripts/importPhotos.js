const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const db = require('../db');

const importPhotos = () => {
    const photos = [];
    fs.createReadStream(path.join(__dirname, '../../../photos.csv'))
        .pipe(csv())
        .on('data', (row) => {
            photos.push([
                parseInt(row.id),
                row.url,
                row.photographer,
                row['src.medium'],
                row.alt,
                parseInt(row.width),
                parseInt(row.height),
                row.avg_color,
                row.photographer_url
            ]);
        })
        .on('end', () => {
            db.serialize(() => {
                db.run('DELETE FROM photos', (err) => {
                    if (err) {
                        console.error('Error clearing photos:', err);
                        process.exit(1);
                    }
                });

                // Drop and recreate the table to include avg_color
                db.run(`DROP TABLE IF EXISTS photos`, (err) => {
                    if (err) {
                        console.error('Error dropping table:', err);
                        process.exit(1);
                    }
                });

                db.run(`CREATE TABLE photos (
                    id INTEGER PRIMARY KEY,
                    url TEXT,
                    photographer TEXT,
                    src_medium TEXT,
                    alt TEXT,
                    width INTEGER,
                    height INTEGER,
                    avg_color TEXT,
                    photographer_url TEXT
                )`, (err) => {
                    if (err) {
                        console.error('Error creating table:', err);
                        process.exit(1);
                    }
                });

                const stmt = db.prepare('INSERT INTO photos (id, url, photographer, src_medium, alt, width, height, avg_color, photographer_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
                
                photos.forEach(photo => {
                    stmt.run(photo, (err) => {
                        if (err) {
                            console.error('Error inserting photo:', err);
                        }
                    });
                });

                stmt.finalize((err) => {
                    if (err) {
                        console.error('Error finalizing statement:', err);
                        process.exit(1);
                    }
                    console.log('Photos imported successfully');
                    process.exit(0);
                });
            });
        });
};

importPhotos();

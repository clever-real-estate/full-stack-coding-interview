const db = require('../db');

exports.getPhotos = (req, res) => {
    const query = 'SELECT p.*, COUNT(l.photo_id) as likes FROM photos p LEFT JOIN likes l ON p.id = l.photo_id GROUP BY p.id LIMIT 10';
    db.all(query, [], (err, photos) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching photos' });
        }
        res.json(photos);
    });
};

exports.toggleLike = (req, res) => {
    const { photoId } = req.params;
    const userId = req.user.id;

    db.get('SELECT * FROM likes WHERE user_id = ? AND photo_id = ?', [userId, photoId], (err, like) => {
        if (err) {
            return res.status(500).json({ error: 'Error checking like status' });
        }

        if (like) {
            // Unlike
            db.run('DELETE FROM likes WHERE user_id = ? AND photo_id = ?', [userId, photoId], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error removing like' });
                }
                res.json({ liked: false });
            });
        } else {
            // Like
            db.run('INSERT INTO likes (user_id, photo_id) VALUES (?, ?)', [userId, photoId], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error adding like' });
                }
                res.json({ liked: true });
            });
        }
    });
};

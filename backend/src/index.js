const express = require('express');
const cors = require('cors');
require('dotenv').config();

const auth = require('./controllers/auth');
const photos = require('./controllers/photos');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Auth routes
app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);

// Protected photo routes
app.get('/api/photos', authMiddleware, photos.getPhotos);
app.post('/api/photos/:photoId/like', authMiddleware, photos.toggleLike);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

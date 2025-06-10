import { Router } from 'express';
import { PhotoController } from '../controllers/photo.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, PhotoController.getAllPhotos);
router.post('/:id/like', authMiddleware, PhotoController.toggleLike);

export default router; 
import { Request, Response } from 'express';
import { PhotoService } from '../models/photo.model';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export class PhotoController {
  static async getAllPhotos(req: AuthRequest, res: Response) {
    try {
      const photos = await PhotoService.getAll();
      const photosWithLikes = await Promise.all(
        photos.map(async (photo: import('../models/photo.model').IPhoto) => {
          const likes = photo.likes;
          const hasLiked = req.user ? await PhotoService.hasLiked(req.user.id, String(photo._id)) : false;
          return { ...photo.toObject(), likes, hasLiked };
        })
      );
      res.json(photosWithLikes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching photos' });
    }
  }

  static async toggleLike(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const photoId = req.params.id;
      if (!photoId) {
        return res.status(400).json({ message: 'Invalid photo ID' });
      }

      const { hasLiked, likes } = await PhotoService.toggleLike(req.user.id, photoId);
      res.json({ hasLiked, likes });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling like' });
    }
  }
} 
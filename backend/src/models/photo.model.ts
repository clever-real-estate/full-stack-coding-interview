import mongoose, { Schema, Document } from 'mongoose';

export interface IPhoto extends Document {
  title: string;
  description: string;
  image_url: string;
  created_at: Date;
  photographer: string;
  photographer_url: string;
  color: string;
  alt: string;
  likes: number;
  likedBy: mongoose.Types.ObjectId[];
}

const PhotoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  photographer: { type: String },
  photographer_url: { type: String },
  color: { type: String },
  alt: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const PhotoModel = mongoose.model<IPhoto>('Photo', PhotoSchema);

export class PhotoService {
  static async getAll(): Promise<IPhoto[]> {
    return PhotoModel.find().sort({ created_at: -1 }).limit(10);
  }

  static async getLikes(photoId: string): Promise<number> {
    const photo = await PhotoModel.findById(photoId);
    return photo ? photo.likes : 0;
  }

  static async toggleLike(userId: string, photoId: string): Promise<{ hasLiked: boolean; likes: number }> {
    const photo = await PhotoModel.findById(photoId);
    if (!photo) throw new Error('Photo not found');
    const index = photo.likedBy.findIndex((id) => id.toString() === userId);
    let hasLiked = false;
    if (index > -1) {
      photo.likedBy.splice(index, 1);
      photo.likes = Math.max(0, photo.likes - 1);
      hasLiked = false;
    } else {
      photo.likedBy.push(new mongoose.Types.ObjectId(userId));
      photo.likes += 1;
      hasLiked = true;
    }
    await photo.save();
    return { hasLiked, likes: photo.likes };
  }

  static async hasLiked(userId: string, photoId: string): Promise<boolean> {
    const photo = await PhotoModel.findById(photoId);
    return photo ? photo.likedBy.some((id) => id.toString() === userId) : false;
  }
} 
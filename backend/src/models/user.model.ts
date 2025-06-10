import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (this: IUser, next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);

export class UserService {
  static async create(email: string, password: string): Promise<IUser> {
    const user = new UserModel({ email, password });
    await user.save();
    return user;
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  static async verifyPassword(user: IUser, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
} 
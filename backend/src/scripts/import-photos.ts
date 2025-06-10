import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { PhotoModel } from '../models/photo.model';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/clever_photos';
const csvFilePath = path.join(__dirname, '../../../photos.csv');

const importPhotos = async () => {
  try {
    await mongoose.connect(mongoUri);
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }, async (error: Error | undefined, records: any[]) => {
      if (error) {
        console.error('Error parsing CSV:', error);
        return;
      }
      for (const record of records) {
        await PhotoModel.create({
          title: record.alt || '',
          description: '',
          image_url: record['src.large'] || record['src.medium'] || '',
          photographer: record.photographer || '',
          photographer_url: record.photographer_url || '',
          color: record.avg_color || '',
          alt: record.alt || '',
        });
      }
      console.log('Photos imported successfully');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error importing photos:', error);
    process.exit(1);
  }
};

importPhotos(); 
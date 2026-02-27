import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Category } from '../models/category.model.js';

dotenv.config();
await connectDB();
await Category.insertMany([{ name: 'Electronics' }, { name: 'Fashion' }]);
// eslint-disable-next-line no-console
console.log('Seed complete');
process.exit(0);

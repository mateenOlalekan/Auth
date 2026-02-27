import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  slug: { type: String, unique: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

categorySchema.pre('save', function setSlug(next) {
  if (this.isModified('name')) this.slug = slugify(this.name, { lower: true });
  next();
});

export const Category = mongoose.model('Category', categorySchema);

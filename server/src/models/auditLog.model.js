import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);

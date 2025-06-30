import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date },
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);

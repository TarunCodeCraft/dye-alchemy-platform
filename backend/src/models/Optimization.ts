import mongoose from 'mongoose';

const optimizationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fabricWeight: { type: Number, required: true },
  machineType: { type: String, required: true },
  dyeType: { type: String, required: true },
  fabricType: { type: String, required: true },
  temperature: { type: Number, required: true },
  time: { type: Number, required: true },
  ph: { type: Number, required: true },
  chemicalConcentration: { type: Number, required: true },
  result: {
    efficiency: { type: Number, required: true },
    quality: { type: Number, required: true },
    environmentalImpact: { type: Number, required: true },
    recommendations: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export const Optimization = mongoose.model('Optimization', optimizationSchema);
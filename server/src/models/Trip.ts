// src/models/Trip.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ITrip extends Document {
  name: string;
  description: string;
  imageUrl: string;
  date: Date;
  participants?: any[]; // Make it optional
  destinations: mongoose.Types.ObjectId[];
}

const tripSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  date: { type: Date, required: true },
  participants: { type: [Schema.Types.Mixed], default: [] }, 
  destinations: [{ type: mongoose.Types.ObjectId, ref: 'Destination' }],
});

export default mongoose.model<ITrip>('Trip', tripSchema);

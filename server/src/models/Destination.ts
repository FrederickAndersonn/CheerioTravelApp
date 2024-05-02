// src/models/Destination.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDestination extends Document {
    name: string;
    description: string;
    activities: string[];
    photos: string[];
  }
  
  const destinationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    activities: [{ type: String }],
    photos: [{ type: String }],
  });
  

export default mongoose.model<IDestination>('Destination', destinationSchema);
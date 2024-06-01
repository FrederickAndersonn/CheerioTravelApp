// src/index.ts
import express from 'express';
import tripRoutes from './routes/trips';
import destinationRoutes from './routes/destinations';
import mongoose from 'mongoose';


const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://test:test@cluster0.v2nfrdi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any).then(() => {
    app.use(express.json());
    app.use('/trips', tripRoutes);
    app.use('/destinations', destinationRoutes);

    app.listen(3003, () => {
        console.log('Server is running on port 3003');
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

export default app;
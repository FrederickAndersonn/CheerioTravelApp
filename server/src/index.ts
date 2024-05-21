import express from 'express';
import tripRoutes from './routes/trips';
import destinationRoutes from './routes/destinations';
import weatherRoutes from './routes/weather';
import  connectDatabase  from './database';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
 
connectDatabase();
app.use(cors());
app.use(express.json());
app.use('/trips', tripRoutes);
app.use('/destinations', destinationRoutes);
app.use('/weather', weatherRoutes);

app.listen(3000, async () => {
    console.log('Server is running on port 3000');
});

export default app;
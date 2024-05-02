import express from 'express';
import  Trip  from '../models/Trip';
import  Destination from '../models/Destination';
import mongoose from 'mongoose';

const tripRouter = express.Router();

// Create a new trip
tripRouter.post('/', async (req, res) => {
    try {
      const { destinations, ...tripData } = req.body;
      const destinationObjectIds = destinations.map((id: string) => new mongoose.Types.ObjectId(id));
      
      const trip = new Trip({
        ...tripData,
        destinations: destinationObjectIds,
      });
  
      await trip.save();
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create trip', error });
    }
  });

// Delete Trip
tripRouter.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if(!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete trip', error });
  }
});

// Update Trip
tripRouter.put('/:id', async (req, res) => {
  try {
    const tripExists = await Trip.exists({ _id: req.params.id });
    if (!tripExists) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trip', error });
  }
});


// Get all destinations from a trip
tripRouter.get('/:id/destinations', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip.destinations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch destinations', error });
  }
});

// Add destinations to a trip
tripRouter.put('/:id/addDestinations', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const destinations = req.body.destinations.map((id: string) => new mongoose.Types.ObjectId(id));
    trip.destinations.push(...destinations);
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add destinations to trip', error });
  }
});

// Remove destinations from a trip
tripRouter.put('/:id/removeDestinations', async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
  
      const destinationsToRemove = req.body.destinations.map((id: string) => id);
      trip.destinations = trip.destinations.filter(dest => !destinationsToRemove.includes(dest.toString()));
      await trip.save();
  
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Failed to remove destinations from trip', error });
    }
  });

// Find trip based on ID
tripRouter.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trip', error });
  }
});

// Find trips based on name or date or both
tripRouter.get('/', async (req, res) => {
  try {
    const { name, date } = req.query;

    const query: any = {};

    if (name) {
      query.name = { $regex: new RegExp(name as string, 'i') };
    }

    if (date) {
      const parsedDate = new Date(date as string);
      query.date = parsedDate
    }

    const trips = await Trip.find(query);
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trips', error });
  }
});

// Find trips based on destination
tripRouter.get('/byDestination/:id', async (req, res) => {
    try {
      // Check if the destination exists
      const destinationExists = await Destination.exists({ _id: req.params.id });
      if (!destinationExists) {
        return res.status(404).json({ message: 'Destination not found' });
      }
  
      const trips = await Trip.find({ destinations: req.params.id });
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch trips by destination', error });
    }
  });

// Add participants to trip
tripRouter.put('/:id/addParticipants', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.participants?.push(...req.body.participants);
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add participants to trip', error });
  }
});

export default tripRouter;

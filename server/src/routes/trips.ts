import express from 'express';
import  Trip  from '../models/Trip';
import  Destination from '../models/Destination';
import mongoose from 'mongoose';
import { AnyARecord } from 'dns';

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

    const newDestinationIds = req.body.destinations.map((id : any) => new mongoose.Types.ObjectId(id));
    const existingDestinationIds = trip.destinations.map((id : any ) => id.toString());

    const duplicates = newDestinationIds.filter((id : any) => existingDestinationIds.includes(id.toString()));

    if (duplicates.length > 0) {
      return res.status(400).json({ message: 'Some destination IDs are already in the trip', duplicates });
    }

    trip.destinations.push(...newDestinationIds);
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add destinations to trip', error });
  }
});

tripRouter.put('/:id/removeDestinations', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const destinationsToRemove = req.body.destinations.map((id :string) => id);
    const updatedDestinations = trip.destinations.filter(dest => !destinationsToRemove.includes(dest.toString()));

    // Check if any destination IDs were actually removed
    if (updatedDestinations.length === trip.destinations.length) {
      return res.status(400).json({ message: 'No matching destinations found to remove' });
    }

    trip.destinations = updatedDestinations;
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

tripRouter.get('/', async (req, res) => {
  try {
    const { name, dateFrom, dateTo } = req.query;

    const query : any = {};

    if (name) {
      query.name = { $regex: new RegExp(name as string, 'i') };
    }

    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) {
        const parsedDateFrom = new Date(dateFrom as string);
        if (!isNaN(parsedDateFrom.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateFrom as string)) {
          query.date.$gte = parsedDateFrom;
        } else {
          return res.status(400).json({ message: 'Invalid from date format' });
        }
      }
      if (dateTo) {
        const parsedDateTo = new Date(dateTo as string);
        if (!isNaN(parsedDateTo.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateTo as string)) {
          query.date.$lte = parsedDateTo;
        } else {
          return res.status(400).json({ message: 'Invalid to date format' });
        }
      }
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

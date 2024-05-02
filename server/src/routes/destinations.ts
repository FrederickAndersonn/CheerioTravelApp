import express from 'express';
import Destination  from '../models/Destination';

const destinationRouter = express.Router();

// Create a new destination
destinationRouter.post('/', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create destination', error });
  }
});

// Get all destinations
destinationRouter.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch destinations', error });
  }
});

// Get destination by id
destinationRouter.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if(!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch destination', error });
  }
});

// Update a destination
destinationRouter.put('/:id', async (req, res) => {
    try {
      // Check if the destination exists
      const destinationExists = await Destination.exists({ _id: req.params.id });
      if (!destinationExists) {
        return res.status(404).json({ message: 'Destination not found' });
      }

      const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(destination);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update destination', error });
    }
});


// Delete a destination
destinationRouter.delete('/:id', async (req, res) => {
    try {
      const destination = await Destination.findByIdAndDelete(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      res.status(200).json(destination);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete destination', error });
    }
  });
  
  // Search destinations by name
destinationRouter.get('/search/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const regex = new RegExp(name, 'i'); // Case-insensitive search

    const destinations = await Destination.find({ name: regex });

    if (destinations.length === 0) {
      return res.status(404).json({ message: 'No destinations found with that name' });
    }

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search destinations by name', error });
  }
});


export default destinationRouter;

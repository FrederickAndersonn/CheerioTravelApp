import request from 'supertest';
import mongoose from 'mongoose';
import app from '../tripindex';
import Trip from '../models/Trip';
import Destination from '../models/Destination';

afterEach(async () => {
  await Trip.deleteMany({});
  await Destination.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

let destinationIds: mongoose.Types.ObjectId[];

beforeEach(async () => {
  const destinations = await Destination.insertMany([
    { name: 'Destination 1', description: 'Description of destination 1', activities: [], photos: [] },
    { name: 'Destination 2', description: 'Description of destination 2', activities: [], photos: [] },
  ]);

  destinationIds = destinations.map(dest => dest._id);
});

describe('Trip API', () => {


  it('should always be true', async () => {
    var x = 1;
    expect(x).toBe(1);
  })

  it('should create a new trip', async () => {
    const tripData = {
      name: 'New Trip',
      description: 'Description of new trip',
      imageUrl: 'image-url',
      date: '2024-03-21T00:00:00.000Z',
      participants: ['participant1', 'participant2'],
      destinations: destinationIds.map(id => id.toString()),
    };

    const response = await request(app)
      .post('/trips')
      .send(tripData)
      .expect(201);

    expect(response.body).toMatchObject(tripData);
  });

  it('should delete trip by id', async () => {
    const trip = new Trip({
      name: 'Trip to delete',
      description: 'Description of trip to delete',
      imageUrl: 'image-url',
      date: new Date(),
      participants: ['participant1', 'participant2'],
      destinations: destinationIds.map(id => id.toString()),
    });
    await trip.save();
    const response = await request(app).delete(`/trips/${trip._id}`).expect(200);
    expect(response.body).toEqual({});
  });

  it('should update trip by id', async () => {
    const trip = new Trip({
      name: 'Trip to update',
      description: 'Description of trip to update',
      imageUrl: 'image-url',
      date: new Date(),
      participants: ['participant1', 'participant2'],
      destinations: destinationIds.map(id => id.toString()),
    });
    await trip.save();
    const updatedData = {
      name: 'New Trip Name'
    };
    const response = await request(app).put(`/trips/${trip._id}`)
    .send(updatedData)
    .expect(200);
    expect(response.body.name).toBe('New Trip Name');
  });


  it('should fetch all trips', async () => {
    const tripData = [
      { name: 'Trip 1', description: 'Description of trip 1', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-01' },
      { name: 'Trip 2', description: 'Description of trip 2', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-02' },
      { name: 'Trip 3', description: 'Description of trip 3', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-03' },
    ];
  
    await Trip.insertMany(tripData);
  
    const response = await request(app).get('/trips').expect(200);
  
    expect(response.body.length).toBe(3);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Trip 1' }),
      expect.objectContaining({ name: 'Trip 2' }),
      expect.objectContaining({ name: 'Trip 3' }),
    ]));
  });

  it('should find a trip based on ID', async () => {
    const tripData = {
      name: 'Test Trip',
      description: 'Description of test trip',
      imageUrl: 'image-url',
      date: '2024-04-21T00:00:00.000Z',
      participants: ['participant1', 'participant2'],
      destinations: destinationIds.map(id => id.toString()),
    };
  
    const newTrip = await Trip.create(tripData);
  
    const response = await request(app)
      .get(`/trips/${newTrip._id}`)
      .expect(200);
  
    expect(response.body).toMatchObject(tripData);
  });
  
  it('should return 404 if trip not found when fetching by ID', async () => {
    const response = await request(app)
      .get(`/trips/123456789012345678901234`)
      .expect(404);
  
    expect(response.body.message).toBe('Trip not found');
  });

  it('shoul get all destinations for a trip', async () => {
    const trip = await Trip.create({
      name: 'Trip with destinations',
      description: 'Description of trip with destinations',
      imageUrl: 'image-url',
      date: Date.now(),
      participants: ['participant1'],
      destinations: destinationIds
    });

    const response = await request(app)
      .get(`/trips/${trip._id}/destinations`)
      .expect(200);
      expect(response.body).toEqual(expect.arrayContaining(destinationIds.map(id => id.toString())));
  });

  it('should add destinations to a trip', async () => {
    const trip = new Trip({
      name: 'Trip to update',
      description: 'Description of trip to update',
      imageUrl: 'image-url',
      date: Date.now(),
      participants: ['participant1'],
      destinations: [],
    });

    await trip.save();

    const updatedData = {
      destinations: destinationIds,
    };

    const response = await request(app)
      .put(`/trips/${trip._id}/addDestinations`)
      .send(updatedData)
      .expect(200);

    expect(response.body.destinations).toEqual(expect.arrayContaining(destinationIds.map(id => id.toString())));
  });

  it('should not add duplicate destinations to a trip', async () => {
    // Create a trip with some existing destinations
    const trip = await Trip.create({
      name: 'Trip with existing destinations',
      description: 'Description of trip with existing destinations',
      imageUrl: 'image-url',
      date: Date.now(),
      participants: [],
      destinations: [destinationIds[0]], // Assume destinationIds[0] already exists in the trip
    });
  
    // Prepare data with both existing and new destinations
    const requestData = {
      destinations: [destinationIds[0], destinationIds[1]], // destinationIds[0] already exists in the trip
    };
  
    // Send request to add destinations to the trip
    const response = await request(app)
      .put(`/trips/${trip._id}/addDestinations`)
      .send(requestData)
      .expect(400); // Expecting a 400 Bad Request due to duplicate destinations
  
    // Check if the response contains the error message indicating duplicate destinations
    expect(response.body.message).toBe('Some destination IDs are already in the trip');
    expect(response.body.duplicates).toEqual(expect.arrayContaining([destinationIds[0].toString()]));
  });
  

  it('should delete destinations from a trip', async () => {
    const trip = new Trip({
      name: 'Trip to update',
      description: 'Description of trip to update',
      imageUrl: 'image-url',
      date: Date.now(),
      participants: ['participant1'],
      destinations: destinationIds.map(id => id.toString()),
    });

    await trip.save();

    const updatedData = {
      destinations: [destinationIds[0].toString()],
    };

    const response = await request(app)
      .put(`/trips/${trip._id}/removeDestinations`)
      .send(updatedData)
      .expect(200);


    expect(response.body.destinations).not.toContain(destinationIds[0].toString());
  });

  it('should return 404 if trip not found when adding destinations', async () => {
    const response = await request(app)
      .put(`/trips/123456789012345678901234/addDestinations`)
      .send({ destinations: destinationIds })
      .expect(404);

    expect(response.body.message).toBe('Trip not found');
  });

  it('should return 404 if trip not found when removing destinations', async () => {
    const response = await request(app)
      .put(`/trips/123456789012345678901234/removeDestinations`)
      .send({ destinations: destinationIds })
      .expect(404);

    expect(response.body.message).toBe('Trip not found');
  });

  it('should return 404 if trip not found when removing destinations', async () => {
    // Prepare data for the request, specifying the destinations to remove
    const updatedData = {
      destinations: [destinationIds[0].toString()], // Assuming you want to remove the first destination
    };
  
    // Send a PUT request to remove destinations from a non-existent trip
    const response = await request(app)
      .put(`/trips/123456789012345678901234/removeDestinations`)
      .send(updatedData)
      .expect(404);
  
    // Ensure that the response contains the expected error message
    expect(response.body.message).toBe('Trip not found');
  });

  it('should find trips based on name', async () => {
    const tripData = [
      { name: 'Trip 1', description: 'Description of trip 1', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-01' },
      { name: 'Trip 2', description: 'Description of trip 2', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-02' },
      { name: 'Trip 3', description: 'Description of trip 3', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-03' },
    ];
  
    await Trip.insertMany(tripData);
  
    const response = await request(app)
      .get('/trips')
      .query({ name: 'Trip 1' })
      .expect(200);
    

    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Trip 1');
  });
  
  it('should find trips based on date', async () => {
    const tripData = [
      { name: 'Trip 1', description: 'Description of trip 1', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-01' },
      { name: 'Trip 2', description: 'Description of trip 2', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-02' },
      { name: 'Trip 3', description: 'Description of trip 3', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-03' },
    ];
  
    await Trip.insertMany(tripData);
  
    const response = await request(app)
      .get('/trips')
      .query({ date: '2022-01-02' })
      .expect(200);
  
    expect(response.body.length).toBe(1);
  });
  
  it('should find trips based on name and date', async () => {
    const tripData = [
      { name: 'Trip 1', description: 'Description of trip 1', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-01' },
      { name: 'Trip 2', description: 'Description of trip 2', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-02' },
      { name: 'Trip 3', description: 'Description of trip 3', imageUrl: 'image-url', participants: [], destinations: [], date: '2022-01-03' },
    ];
  
    await Trip.insertMany(tripData);
  
    const response = await request(app)
      .get('/trips')
      .query({ name: 'Trip 1', date: '2022-01-01' })
      .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('Trip 1');
  });
  

  it('should find trips based on destination', async () => {
    const trip = new Trip({
      name: 'Trip with destinations',
      description: 'Description of trip with destinations',
      imageUrl: 'image-url',
      date: Date.now(),
      participants: [],
      destinations: destinationIds,
    });

    await trip.save();

    const response = await request(app)
      .get(`/trips/byDestination/${destinationIds[0]}`)
      .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0]._id).toBe(trip._id.toString());
  });
  it('should return 404 if destination not found when finding trips by destination', async () => {
    const response = await request(app)
      .get(`/trips/byDestination/123456789012345678901234`)
      .expect(404);
  
    expect(response.body.message).toBe('Destination not found');
  });

  it('should add participants to a trip', async () => {
    const initialParticipants = ['participant1'];
    const newParticipants = ['participant2', 'participant3'];
  
    const trip = await Trip.create({
      name: 'Trip with participants',
      description: 'Description of trip with participants',
      imageUrl: 'image-url',
      date: Date.now(),
      participants: initialParticipants,
      destinations: [],
    });
  
    const response = await request(app)
      .put(`/trips/${trip._id}/addParticipants`)
      .send({ participants: newParticipants })
      .expect(200);
  
    // Check if participants are added
    expect(response.body.participants).toEqual(expect.arrayContaining([...initialParticipants, ...newParticipants]));
  });
  
  
});

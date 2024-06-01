import request from 'supertest';
import mongoose from 'mongoose';
import app from '../destinationindex'; // Assuming your Express app is exported as 'app'
import  Destination  from '../models/Destination';


  afterEach(async () => {
    await Destination.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

describe('Destination Routes', () => {

    it('should always be true', async () => {
      var x = 1;
      expect(x).toBe(1);
    })
  
    it('should get all destinations', async () => {
      const destinations = [
        {
          name: 'Destination1',
          description: 'Description1',
          activities: ['Activity1'],
          photos: ['photo1.jpg'],
        },
        {
          name: 'Destination2',
          description: 'Description2',
          activities: ['Activity2'],
          photos: ['photo2.jpg'],
        },
      ];
  
      await Destination.insertMany(destinations);
  
      const response = await request(app).get('/destinations');
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(destinations.length);
    });

    it('should find a destination based on ID', async () => {
      
        const destination = {
            name: 'Test Destination',
            description: 'Test Description',
            activities: ['Activity1', 'Activity2'],
            photos: ['photo1.jpg', 'photo2.jpg'],
          };

        const newDestination = await Destination.create(destination);
      
        const response = await request(app)
          .get(`/destinations/${newDestination._id}`)
          .expect(200);
      
        expect(response.body).toMatchObject(destination);
      });
  
    it('should update a destination', async () => {
      const destination = new Destination({
        name: 'Update Test',
        description: 'Test Description',
      });
  
      await destination.save();
  
      const update = { name: 'Updated Destination' };
  
      const response = await request(app)
        .put(`/destinations/${destination._id}`)
        .send(update);
  
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(update.name);
    });
  
    it('should delete a destination', async () => {
      const destination = new Destination({
        name: 'Delete Test',
        description: 'Test Description',
      });
  
      await destination.save();
  
      const response = await request(app).delete(`/destinations/${destination._id}`);
  
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(String(destination._id));
    });
  
    it('should return 404 if destination not found when updating', async () => {
      const update = { name: 'Updated Destination' };
  
      const response = await request(app)
        .put(`/destinations/123456789012345678901234`)
        .send(update);
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Destination not found');
    });
  
    it('should return 404 if destination not found when deleting', async () => {
      const response = await request(app).delete(`/destinations/123456789012345678901234`);
  
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Destination not found');
    });

    it('should handle server error when creating destination', async () => {
    const destination = {
      description: 'Test Description',
      activities: ['Activity1', 'Activity2'],
      photos: ['photo1.jpg', 'photo2.jpg'],
    };

    const response = await request(app).post('/destinations').send(destination);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to create destination');
    });

    it('should search destinations by name', async () => {
  const destinations = [
    {
      name: 'SearchDestination1',
      description: 'Description1',
      activities: ['Activity1'],
      photos: ['photo1.jpg'],
    },
    {
      name: 'SearchDestination2',
      description: 'Description2',
      activities: ['Activity2'],
      photos: ['photo2.jpg'],
    },
    {
      name: 'AnotherDestination',
      description: 'Description3',
      activities: ['Activity3'],
      photos: ['photo3.jpg'],
    },
  ];

  await Destination.insertMany(destinations);

  const searchName = 'Search';

  const response = await request(app).get(`/destinations/search/${searchName}`);

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2); // Expecting two destinations to match the search
  expect(response.body[0].name).toContain(searchName);
  expect(response.body[1].name).toContain(searchName);
});

it('should return 404 if no destinations found by name', async () => {
  const searchName = 'NonExistentDestination';

  const response = await request(app).get(`/destinations/search/${searchName}`);

  expect(response.status).toBe(404);
  expect(response.body.message).toBe('No destinations found with that name');
});

it('should handle server error when searching destinations by name', async () => {
  const searchName = 'Search';

  // Mocking the find function to throw an error
  jest.spyOn(Destination, 'find').mockImplementationOnce(() => {
    throw new Error('Mocked error');
  });

  const response = await request(app).get(`/destinations/search/${searchName}`);

  expect(response.status).toBe(500);
  expect(response.body.message).toBe('Failed to search destinations by name');
});

it('should create a new destination', async () => {
  const destination = {
    name: 'Test Destination',
    description: 'Test Description',
    activities: ['Activity1', 'Activity2'],
    photos: ['photo1.jpg', 'photo2.jpg'],
  };

  const response = await request(app).post('/destinations').send(destination);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('_id');
  expect(response.body.name).toBe(destination.name);
});


});
  
import { get } from 'http';
import {
    createDestination,
    getAllDestinations,
    updateDestination,
    deleteDestination,
    createTrip,
    addDestinationsToTrip,
    removeDestinationsFromTrip,
    getTripById,
    searchTrips,
    getTripsByDestination,
    getDestinationsFromTrip
  } from '../services/api'; // Update the path to your API file
  
  async function testApiFunctions() {
    try {
      // Create a new destination
      const newDestinationData = {
        name: 'Test Destination',
        description: 'This is a test destination',
        activities: ['Hiking', 'Sightseeing'],
        photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
      };
      const createdDestination = await createDestination(newDestinationData);
      console.log('Created Destination:', createdDestination);
  
      // Get all destinations
      const allDestinations = await getAllDestinations();
      console.log('All Destinations:', allDestinations);
  
      // Update a destination
      const updatedDestinationData = {
        name: 'Updated Test Destination',
        description: 'This is an updated test destination',
        activities: ['Hiking', 'Camping'],
        photos: ['https://example.com/photo1.jpg', 'https://example.com/photo3.jpg'],
      };
      const updatedDestination = await updateDestination(createdDestination._id, updatedDestinationData);
      console.log('Updated Destination:', updatedDestination);
  
      // Delete a destination
      const deletedDestination = await deleteDestination(createdDestination._id);
      console.log('Deleted Destination:', deletedDestination);
  
      // Create a new trip
    const newTripData = {
        name: 'Test Trip',
        description: 'This is a test trip',
        imageUrl: 'https://example.com/trip-image.jpg',
        date: new Date().toISOString(),
        participants: ['Alice', 'Bob'],
        destinations: [allDestinations[0]._id, allDestinations[1]._id], // Replace with actual destination IDs
    };
    const createdTrip = await createTrip(newTripData);
    console.log('Created Trip:', createdTrip);

   
     const destinations = await getDestinationsFromTrip(createdTrip._id);
     console.log('Destinations from Trip:', destinations);

  
      // Add destinations to a trip
      const destinationsToAdd = {
        destinations: [allDestinations[0]._id], // Replace with actual destination IDs
      };
      const addedDestinations = await addDestinationsToTrip(createdTrip._id, destinationsToAdd);
      console.log('Added Destinations to Trip:', addedDestinations);
  
      // Remove destinations from a trip
      const destinationsToRemove = {
        destinations: [allDestinations[0]._id.toString()], // Replace with actual destination IDs
      };
      const removedDestinations = await removeDestinationsFromTrip(createdTrip._id, destinationsToRemove);
      console.log('Removed Destinations from Trip:', removedDestinations);
  
      // Get a trip by ID
      const tripById = await getTripById(createdTrip._id);
      console.log('Trip by ID:', tripById);
  
      // Search trips
      const searchParams = {
        name: 'Europe'
      };
      const searchedTrips = await searchTrips(searchParams);
      console.log('Searched Trips:', searchedTrips);
  
      // Get trips by destination
      const tripsByDestination = await getTripsByDestination(allDestinations[0]._id); // Replace with actual destination ID
      console.log('Trips by Destination:', tripsByDestination);
    } catch (error) {
      console.error('API Error:', error);
    }
  }
  
  // Call the test function
  testApiFunctions();
  
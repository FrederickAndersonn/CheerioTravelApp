import axios from 'axios';
const BASE_URL = 'http://localhost:3000'; // Your Express server URL

async function simulateRequests() {
  try {
    // Create destinations
    const destinations = [
      {
        name: 'Paris',
        description: 'The city of love',
        activities: ['Visit Eiffel Tower', 'Explore Louvre Museum'],
        photos: ['paris1.jpg', 'paris2.jpg'],
      },
    ];

    const createdDestinations = await Promise.all(
      destinations.map(destination => axios.post(`${BASE_URL}/destinations`, destination))
    );
    console.log('Created Destinations:', createdDestinations.map(dest => dest.data));

    const destinationIds = createdDestinations.map(dest => dest.data._id);

    // Create a new trip with the created destinations
    const newTrip = {
      name: 'Europe Adventure',
      description: 'Explore the beauty of Europe',
      imageUrl: 'europe.jpg',
      date: new Date('2024-07-01'),
      participants: ['Alice', 'Bob'],
      destinations: destinationIds,
    };


    const otherTrip = {
        name: 'Europe Adventure',
        description: 'Explore',
        imageUrl: 'europe.jpg',
        date: new Date('2024-06-01'),
        participants: ['Alice', 'Bob'],
        destinations: destinationIds,
      };

    const createdTrip = await axios.post(`${BASE_URL}/trips`, newTrip);
    const othercreatedTrip = await axios.post(`${BASE_URL}/trips`, otherTrip);
    console.log('Created Trip:', createdTrip.data);
    console.log('Created Trip:', othercreatedTrip.data);

    // Add destinations to the created trip
    const destinationsToAdd = {
      destinations: [destinationIds[0]], // adding the first destination
    };

    const updatedTrip = await axios.put(`${BASE_URL}/trips/${createdTrip.data._id}/addDestinations`, destinationsToAdd);
    console.log('Updated Trip:', updatedTrip.data);

    // Remove destinations from the created trip
    const destinationsToRemove = {
      destinations: [destinationIds[1]], // removing the second destination
    };

    const removedTrip = await axios.put(`${BASE_URL}/trips/${createdTrip.data._id}/removeDestinations`, destinationsToRemove);
    console.log('Removed Trip:', removedTrip.data);

    // Fetch the trip after modifying destinations
    const fetchedTrip = await axios.get(`${BASE_URL}/trips/${createdTrip.data._id}`);
    console.log('Fetched Trip:', fetchedTrip.data);

    // Find trips based on name
    const tripsByName = await axios.get(`${BASE_URL}/trips?name=Europe`);
    console.log('Trips by Name:', tripsByName.data);

    // Find trips based on date
    const tripsByDate = await axios.get(`${BASE_URL}/trips?date=2024-07-01`);
    console.log('Trips by Date:', tripsByDate.data);

    // Find trips based on destination
    const tripsByDestination = await axios.get(`${BASE_URL}/trips/byDestination/${destinationIds[0]}`);
    console.log('Trips by Destination:', tripsByDestination.data);

  } catch (error) {
    console.error('Error:', (error as any).response ? (error as any).response.data : (error as any).message);
  }
}

simulateRequests();

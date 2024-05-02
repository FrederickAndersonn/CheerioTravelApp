import { searchTrips, getAllDestinations } from '../../../services/api';

export const fetchTripsAndDestinations = async () => {
  try {
    const tripsData = await searchTrips();
    const destinationsData = await getAllDestinations();

    return { trips: tripsData, destinations: destinationsData };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

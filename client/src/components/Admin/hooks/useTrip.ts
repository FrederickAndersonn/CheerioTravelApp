import { useState , useEffect} from 'react';
import { createTrip, deleteTrip , updateTrip, addDestinationsToTrip, removeDestinationsFromTrip } from '../../../services/api';
import { fetchTripsAndDestinations } from '../utils/apiHelpers';

function useTrip() {
    const [trips, setTrips] = useState<any[]>([]);
    const [updateTripId, setUpdateTripId] = useState('');
    const [destinationId, setDestinationId] = useState('');
    const [tripData, setTripData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        date: '',
        participants: [''],
        destinations: [''],
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAndSetTrips();
    }, [searchQuery]);

    const fetchAndSetTrips = async () => {
        try {
            const { trips } = await fetchTripsAndDestinations();

            // Filter trips by search query
            const filteredTrips = trips.filter((trip: any) => 
                trip.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setTrips(filteredTrips);
        } catch (error) {
            console.error('Error fetching trips and destinations:', error);
        }
    };

    const handleTripSubmit = async () => {
        try {
            console.log(tripData);
            await createTrip(tripData);
            alert('Trip created successfully!');
            setTripData({
                name: '',
                description: '',
                imageUrl: '',
                date: '',
                participants: [],
                destinations: [],
            });
            fetchAndSetTrips();
            } catch (error) {
            alert('Error creating trip.');
        }
    };

    const handleDeleteTrip = async (id:any) => {
        try {
          await deleteTrip(id);
          alert('Trip deleted successfully!');
          const updatedTrips = trips.filter((trip) => trip._id.toString() !== id);
          setTrips(updatedTrips);
          fetchAndSetTrips();
        } catch (error) {
          alert('Error deleting trip.');
        }
    };

    const handleUpdateTrip = async () => {
        try {
            // Create updatedData object with only the filled fields
            const updatedData: any = {};
        
            if (tripData.name.trim() !== '') {
                updatedData.name = tripData.name;
            }
        
            if (tripData.description.trim() !== '') {
                updatedData.description = tripData.description;
            }
        
            if (tripData.imageUrl.trim() !== '') {
                updatedData.imageUrl = tripData.imageUrl;
            }
        
            if (tripData.date.trim() !== '') {
                updatedData.date = tripData.date;
            }
        
            updatedData.participants = tripData.participants.filter(participant => participant.trim() !== '');
            updatedData.destinations = tripData.destinations.filter(destination => destination.trim() !== '');
        
            // Remove empty arrays from updatedData
            if (updatedData.participants.length === 0) {
                delete updatedData.participants;
            }
        
            if (updatedData.destinations.length === 0) {
                delete updatedData.destinations;
            }
        
            console.log(updateTripId);
            console.log(updatedData);
        
            await updateTrip(updateTripId, updatedData);
            alert('Trip updated successfully!');
            setUpdateTripId('');
            setTripData({
                name: '',
                description: '',
                imageUrl: '',
                date: '',
                participants: [],
                destinations: [],
            });
            fetchTripsAndDestinations();
        } catch (error) {
            alert('Error updating trip.');
            console.error(error);
        }
    };

    const handleRemoveDestinationFromTrip = async (tripId :string) => {
        try {
          await removeDestinationsFromTrip(tripId, { destinations: [destinationId] });
          alert('Destination added to trip successfully!');
          setDestinationId('');
          fetchTripsAndDestinations();
        } catch (error) {
          alert('Error adding destination to trip.');
          console.error(error);
        }
    };

    const handleAddDestinationToTrip = async (tripId :string) => {
        try {
          await addDestinationsToTrip(tripId, { destinations: [destinationId] });
          alert('Destination added to trip successfully!');
          setDestinationId('');
          fetchTripsAndDestinations();
        } catch (error) {
          alert('Error adding destination to trip.');
          console.error(error);
        }
    };
    
  return (
    {
      trips,
      tripData,
      setTripData,
      updateTripId,
      setUpdateTripId,
      destinationId,
      setDestinationId,
      searchQuery,
      setSearchQuery,
      fetchAndSetTrips,
      handleTripSubmit,
      handleDeleteTrip,
      handleUpdateTrip,
      handleRemoveDestinationFromTrip,
      handleAddDestinationToTrip
    }
  )
}

export default useTrip
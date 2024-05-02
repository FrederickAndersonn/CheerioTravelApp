import { 
    createDestination, 
    deleteDestination,
    updateDestination,
    searchDestinationsByName
} from '../../../services/api';
import { useState, useEffect } from 'react';
import { fetchTripsAndDestinations } from '../utils/apiHelpers';

function useDestination() {
    const [destinationData, setDestinationData] = useState({
        name: '',
        description: '',
        activities: [''],
        photos: [''],
    });
    const [destinationId, setDestinationId] = useState('');
    const [destinations, setDestinations] = useState<any[]>([]);
    const [updateDestinationId, setUpdateDestinationId] = useState('');
    const [searchDestinationQuery, setSearchDestinationQuery] = useState('');

    useEffect(() => {
        fetchAndSetDestinations();
    }, [searchDestinationQuery]);

    const fetchAndSetDestinations = async () => {
        try {
            const { destinations } = await fetchTripsAndDestinations();
            
            // Filter destinations by search query
            const filteredDestinations = destinations.filter((destination: any) => 
                destination.name.toLowerCase().includes(searchDestinationQuery.toLowerCase())
            );
            
            setDestinations(filteredDestinations);
        } catch (error) {
            console.error('Error fetching trips and destinations:', error);
        }
    };

    const handleDestinationSubmit = async () => {
        try {
            await createDestination(destinationData);
            alert('Destination created successfully!');
            setDestinationData({
                name: '',
                description: '',
                activities: [],
                photos: [],
            });
            fetchAndSetDestinations();
        } catch (error) {
            alert('Error creating destination.');
            console.error(error);
        }
    };

    const handleDeleteDestination = async (tripId: string) => {
        try {
            await deleteDestination(tripId);
            alert('Destination deleted successfully!');
            setDestinationId('');
            fetchAndSetDestinations();
        } catch (error) {
            alert('Error deleting destination.');
            console.error(error);
        }
    };

    const handleUpdateDestination = async () => {
        try {
            // Create updatedData object with only the filled fields
            const updatedData: any = {};
        
            if (destinationData.name.trim() !== '') {
                updatedData.name = destinationData.name;
            }
        
            if (destinationData.description.trim() !== '') {
                updatedData.description = destinationData.description;
            }
        
            updatedData.activities = destinationData.activities.filter(activity => activity.trim() !== '');
            updatedData.photos = destinationData.photos.filter(photo => photo.trim() !== '');
        
            // Remove empty arrays from updatedData
            if (updatedData.activities.length === 0) {
                delete updatedData.activities;
            }
        
            if (updatedData.photos.length === 0) {
                delete updatedData.photos;
            }
        
            await updateDestination(updateDestinationId, updatedData);
            alert('Destination updated successfully!');
            setDestinationId('');
            setDestinationData({
                name: '',
                description: '',
                activities: [],
                photos: [],
            });
            fetchAndSetDestinations();
        } catch (error) {
            alert('Error updating destination.');
            console.error(error);
        }
    };

    return {
        destinationData,
        destinationId,
        destinations,
        updateDestinationId,
        searchDestinationQuery,
        searchDestinationsByName,
        setDestinationData,
        setDestinationId,
        setDestinations,
        setUpdateDestinationId,
        setSearchDestinationQuery,
        handleDestinationSubmit,
        handleDeleteDestination,
        handleUpdateDestination,
        fetchAndSetDestinations
    };
}

export default useDestination;

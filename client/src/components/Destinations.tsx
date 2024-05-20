import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDestinationsFromTrip, getDestinationById, getTripById, addParticipantsToTrip } from '../services/api';
import Layout from '../components/Layout';

const Destination = () => {
    const navigate = useNavigate();
    const { tripId } = useParams();
    const [destinations, setDestinations] = useState([]);
    const [loadedDestinations, setLoadedDestinations] = useState<any[]>([]);
    const [trip, setTrip] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState('');
    const [weather, setWeather] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const tripData = await getTripById(tripId ?? '');
            const destinationIds = await getDestinationsFromTrip(tripId ?? '');
            const destinationDetails = await Promise.all(destinationIds.map((id: string) => getDestinationById(id)));
      
            setTrip(tripData);
            setDestinations(destinationIds);
            setLoadedDestinations(destinationDetails);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
      
        fetchData();
      }, [tripId]);
      
      useEffect(() => {
        if (Object.keys(trip).length === 0) {
          return; 
        }
      
        const intervalId = setInterval(() => {
          const tripDate = new Date(trip?.date).getTime(); // Use optional chaining
          const now = new Date().getTime();
      
          if (!tripDate || isNaN(tripDate)) {
            setTimeLeft('Date not available');
            return;
          }
      
          const timeDifference = tripDate - now;
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
          setTimeLeft(`${days} ${hours} ${minutes} ${seconds}`);
        }, 1000);
      
        return () => {
          clearInterval(intervalId);
        };
      }, [trip]);

      useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = '6c10bec1473d772497f49848894b3180'; 

                const weatherPromises = loadedDestinations.map(async (destination) => {
                    console.log(destination);
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination.name}&units=metric&appid=${apiKey}`;
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    return data;
                });

                const weatherData = await Promise.all(weatherPromises);
                setWeather(weatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, [loadedDestinations]);
      
  
  const handleFindOtherTrips = () => {
    navigate('/trips');
  };

  const handleJoinNow = async () => {
    const participantName = prompt('Name:');
    
    if (participantName) {
        try {
            await addParticipantsToTrip(tripId ?? '', { participants: [participantName] });
            alert(`Welcome aboard ${participantName}. You have been added to the trip.`);
        } catch (error) {
            console.error('Error adding participant:', error);
            alert('Failed to add participant to the trip.');
        }
    }
};

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
        <div className="container mx-auto p-4 h-full">
            <div className="flex h-full">
                <div className="w-1/2 h-full pr-4">
                <p className='text-4xl font-bold m-auto'>{trip.name}</p>
                <p className='text-xl mt-4'>{trip.description}</p>
                <p className='text-xl mt-4'>Participants: {trip.participants?.length}</p>
                <div className="flex justify-between bg-custom-black items-center mt-4 ">
                    {timeLeft.split(' ').map((unit, index) => (
                        <div key={index} className="flex flex-col justify-center items-center w-24 h-24 text-white rounded">
                        <span className="text-xl font-bold">{unit}</span>
                        <span className="text-lg">{['days', 'hours', 'minutes', 'seconds'][index]}</span>
                        </div>
                    ))}
                </div>
                <div className='conatiner mx-auto flex items-center justify-center mb-16'>
                    {weather.map((weather : any, index : any) => (
                            <div key={index} className="flex flex-col justify-center items-center w-[200px] h-[200px] bg-custom-black text-white rounded mt-16">
                                <span className="text-xl">{weather.name}</span>
                                <span className="text-sm">{weather.weather?.[0]?.description}</span>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} alt="Weather Icon" />
                                <span className="text-3xl font-bold">{weather.main?.temp.toFixed(1)}°C</span>
                            </div>
                    ))}
                </div>
                <button
                    className="bg-custom-red text-white px-4 py-2 rounded"
                    onClick={handleFindOtherTrips}
                    style={{ width: '150px' }} // Set a specific width
                    >
                    Find Other Trips
                </button>
                <button
                className="bg-green-500 text-white px-4 py-2 rounded ml-6"
                onClick={handleJoinNow}
                style={{ width: '150px' }} // Set the same width as the first button
                >
                    Join Now
                </button>
            </div>
            <div className="w-1/2 max-h-[calc(100vh-2rem)] h-full pl-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Destinations</h2>
                </div>
                    {loadedDestinations.map((destination: any, index) => (
                         <div key={destinations[index]} className="border border-slate-400 rounded-lg p-4  mb-2 shadow-md">
                            <h3 className="text-lg font-bold">{destination.name}</h3>
                            <p>{destination.description}</p>
                            <p>Activities: {destination.activities ? destination.activities.join(', ') : 'No activities available'}</p>
                            <div className="flex overflow-x-auto">
                                {destination.photos && destination.photos.length > 0 ? (
                                    destination.photos.map((photo: string, photoIndex: number) => (
                                    <img key={photoIndex} src={photo} alt={destination.name} className="w-1/2 h-32 object-fit m-1" />
                                    ))
                                ) : (
                                    <p>No photos available</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default Destination;

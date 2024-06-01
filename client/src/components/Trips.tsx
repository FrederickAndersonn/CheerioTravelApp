import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchTrips,
  getTripsByDestination,
  getAllDestinations,
} from "../services/api";
import Layout from "./Layout";

const Trips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchTrips({ name: searchTerm, dateFrom, dateTo });
      setTrips(data);
    };

    const fetchDestinations = async () => {
      const data = await getAllDestinations();
      setDestinations(data);
    };

    fetchData();
    fetchDestinations();
  }, [searchTerm, dateFrom, dateTo]);

  const handleExploreClick = (trip: any) => {
    navigate(`/destination/${trip._id}`);
  };

  const handleDestinationChange = async (destinationId: string) => {
    if (destinationId === "") {
      const data = await searchTrips({ name: searchTerm, dateFrom, dateTo });
      setTrips(data);
      setSelectedDestination("");
    } else {
      setSelectedDestination(destinationId);
      const tripsByDestination = await getTripsByDestination(destinationId);
      setTrips(tripsByDestination);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="w-1/4">
          <label htmlFor="destination" className="mr-2">
              Search by Name:
            </label>
            <input
              type="text"
              placeholder="Search by Name"
              className="border p-2 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-1/4">
          <label htmlFor="destination" className="mr-2">
              From:
            </label>
            <input
              type="date"
              placeholder="From Date"
              className="border p-2 rounded w-full"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="w-1/4">
          <label htmlFor="destination" className="mr-2">
             To:
            </label>
            <input
              type="date"
              placeholder="To Date"
              className="border p-2 rounded w-full"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div className="relative w-1/4">
            <label htmlFor="destination" className="mr-2">
              Search by Destinations:
            </label>
            <select
              id="destination"
              className="border p-2 rounded w-full"
              value={selectedDestination}
              onChange={(e) => handleDestinationChange(e.target.value)}
            >
              <option value="">All Destinations</option>
              {destinations.map((destination: any) => (
                <option key={destination._id} value={destination._id}>
                  {destination.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip: any) => (
            <div key={trip._id} className="border p-4 rounded">
              <h2 className="text-xl font-bold">{trip.name}</h2>
              <img
                src={trip.imageUrl}
                alt={trip.name}
                className="my-2 w-full h-32 object-cover"
              />
              <p>
                Date: {trip.date.split("T")[0].split("-").reverse().join("/")}
              </p>
              <p>
                Participants:{" "}
                {
                  trip.participants.filter(
                    (participant: any) => participant !== ""
                  ).length
                }
              </p>
              <button
                className="bg-custom-black text-white px-4 py-2 rounded mt-2"
                onClick={() => handleExploreClick(trip)}
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Trips;

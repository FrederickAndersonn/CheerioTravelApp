import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchTrips,
  getTripsByDestination,
  getAllDestinations,
} from "../services/api";
import Layout from "./Layout";

// Define types for Trip, Destination, and SearchParams
interface Trip {
  _id: string;
  name: string;
  date: string;
  imageUrl: string;
  participants: string[];
}

interface Destination {
  _id: string;
  name: string;
}

interface SearchParams {
  name: string;
  dateFrom: string;
  dateTo: string;
}

const Trips: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data: Trip[] = await searchTrips({ name: searchTerm, dateFrom, dateTo });
      setTrips(data);
    };

    const fetchDestinations = async () => {
      const data: Destination[] = await getAllDestinations();
      setDestinations(data);
    };

    fetchData();
    fetchDestinations();
  }, [searchTerm, dateFrom, dateTo]);

  const handleExploreClick = (trip: Trip): void => {
    navigate(`/destination/${trip._id}`);
  };

  const handleDestinationChange = async (destinationId: string): Promise<void> => {
    if (destinationId === "") {
      const data: Trip[] = await searchTrips({ name: searchTerm, dateFrom, dateTo });
      setTrips(data);
      setSelectedDestination("");
    } else {
      setSelectedDestination(destinationId);
      const tripsByDestination: Trip[] = await getTripsByDestination(destinationId);
      setTrips(tripsByDestination);
    }
  };

  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>): void => {
    const dateValue = event.target.value;
    if (dateValue) {
      const parsedDate = new Date(dateValue);
      if (!isNaN(parsedDate.getTime())) {
        const formattedDate = parsedDate.toISOString().split("T")[0];
        setter(formattedDate);
      }
    } else {
      setter("");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="w-1/4">
            <label htmlFor="searchTerm" className="mr-2">
              Search by Name:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search by Name"
              className="border p-2 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="dateFrom" className="mr-2">
              From:
            </label>
            <input
              type="date"
              id="dateFrom"
              placeholder="From Date"
              className="border p-2 rounded w-full"
              value={dateFrom}
              onChange={handleDateChange(setDateFrom)}
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="dateTo" className="mr-2">
              To:
            </label>
            <input
              type="date"
              id="dateTo"
              placeholder="To Date"
              className="border p-2 rounded w-full"
              value={dateTo}
              onChange={handleDateChange(setDateTo)}
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
              {destinations.map((destination) => (
                <option key={destination._id} value={destination._id}>
                  {destination.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip) => (
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
                {trip.participants.filter((participant) => participant !== "").length}
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

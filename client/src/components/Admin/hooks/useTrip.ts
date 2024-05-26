import { useState, useEffect } from "react";
import { createTrip, deleteTrip, updateTrip } from "../../../services/api";
import { fetchTripsAndDestinations } from "../utils/apiHelpers";

function useTrip() {
  const [trips, setTrips] = useState<any[]>([]);
  const [updateTripId, setUpdateTripId] = useState("");
  const [tripData, setTripData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    date: "",
    participants: [""],
    destinations: [""],
  });
  const [searchQuery, setSearchQuery] = useState("");

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
    } catch (error: any) {
      let errorMessage =
        "Error creating trip. Please try again later." +
        JSON.stringify(error.response.data);
      alert(errorMessage);
    }
  };

  const handleTripSubmit = async () => {
    try {
      const trimmedTripData = {
        name: tripData.name.trim(),
        description: tripData.description.trim(),
        imageUrl: tripData.imageUrl.trim(),
        date: tripData.date.trim(),
        participants: tripData.participants.filter(
          (participant) => participant.trim() !== ""
        ),
        destinations: tripData.destinations.filter(
          (destination) => destination.trim() !== ""
        ),
      };

      await createTrip(trimmedTripData);
      alert("Trip created successfully!");
      setTripData({
        name: "",
        description: "",
        imageUrl: "",
        date: "",
        participants: [],
        destinations: [],
      });
      fetchAndSetTrips();
    } catch (error: any) {
      let errorMessage =
        "Error creating trip. Please try again later." +
        JSON.stringify(error.response.data);
      alert(errorMessage);
    }
  };

  const handleDeleteTrip = async (id: any) => {
    try {
      await deleteTrip(id);
      alert("Trip deleted successfully!");
      const updatedTrips = trips.filter((trip) => trip._id.toString() !== id);
      setTrips(updatedTrips);
      fetchAndSetTrips();
    } catch (error: any) {
      let errorMessage =
        "Error deleting trip. Please try again later." +
        JSON.stringify(error.response.data);
      alert(errorMessage);
    }
  };

  const handleUpdateTrip = async () => {
    try {
      // Create updatedData object with only the filled fields
      const updatedData: any = {};

      if (tripData.name.trim() !== "") {
        updatedData.name = tripData.name;
      }

      if (tripData.description.trim() !== "") {
        updatedData.description = tripData.description;
      }

      if (tripData.imageUrl.trim() !== "") {
        updatedData.imageUrl = tripData.imageUrl;
      }

      if (tripData.date.trim() !== "") {
        updatedData.date = tripData.date;
      }

      updatedData.participants = tripData.participants.filter(
        (participant) => participant.trim() !== ""
      );
      updatedData.destinations = tripData.destinations.filter(
        (destination) => destination.trim() !== ""
      );

      // Remove empty arrays from updatedData
      if (updatedData.participants.length === 0) {
        delete updatedData.participants;
      }

      if (updatedData.destinations.length === 0) {
        delete updatedData.destinations;
      }

      await updateTrip(updateTripId, updatedData);
      alert("Trip updated successfully!");
      setUpdateTripId("");
      setTripData({
        name: "",
        description: "",
        imageUrl: "",
        date: "",
        participants: [],
        destinations: [],
      });
      fetchTripsAndDestinations();
    } catch (error: any) {
      let errorMessage =
        "Error updating trip. Please try again later." +
        JSON.stringify(error.response.data);
      alert(errorMessage);
    }
  };

  return {
    trips,
    tripData,
    setTripData,
    updateTripId,
    setUpdateTripId,
    searchQuery,
    setSearchQuery,
    fetchAndSetTrips,
    handleTripSubmit,
    handleDeleteTrip,
    handleUpdateTrip,
  };
}

export default useTrip;

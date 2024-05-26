import { useEffect } from "react";
import Layout from "../Layout";
import deleteIcon from "../../assets/delete.png";
import useDestination from "./hooks/useDestination";
import useTrip from "./hooks/useTrip";
import {
  removeDestinationsFromTrip,
  addDestinationsToTrip,
} from "../../services/api";

function Admin() {
  const {
    destinationData,
    destinationId,
    destinations,
    updateDestinationId,
    setDestinationData,
    setDestinationId,
    setUpdateDestinationId,
    handleDestinationSubmit,
    handleDeleteDestination,
    handleUpdateDestination,
    fetchAndSetDestinations,
    searchDestinationQuery,
    setSearchDestinationQuery,
  } = useDestination();

  const {
    trips,
    tripData,
    setTripData,
    updateTripId,
    setUpdateTripId,
    fetchAndSetTrips,
    handleTripSubmit,
    handleDeleteTrip,
    handleUpdateTrip,
    searchQuery,
    setSearchQuery,
  } = useTrip();

  useEffect(() => {
    fetchAndSetTrips();
    fetchAndSetDestinations();
  }, []);

  const handleRemoveDestinationFromTrip = async (tripId: string) => {
    const destinationIds = destinationId.split(", ").map((id) => id.trim());
    try {
      await removeDestinationsFromTrip(tripId, {
        destinations: destinationIds,
      });
      alert("Destinations removed from trip successfully!");
      setDestinationId("");
      fetchAndSetTrips();
    } catch (error: any) {
      let errorMessage =
        "Error removing destinations from trip. Please try again later." +
        JSON.stringify(error.response.data);
      alert(errorMessage);
    }
  };

  const handleAddDestinationToTrip = async (tripId: string) => {
    const destinationIds = destinationId.split(", ").map((id) => id.trim());
    try {
      await addDestinationsToTrip(tripId, { destinations: destinationIds });
      alert("Destinations added to trip successfully!");
      setDestinationId("");
      fetchAndSetTrips();
    } catch (error: any) {
      let errorMessage =
        "Error Adding Destination to Trip. Please try again later." +
        JSON.stringify(error.response.data);
      alert(errorMessage);
    }
  };

  return (
    <Layout>
      <div className="flex" style={{ maxHeight: "85vh", overflowY: "auto" }}>
        {/* Left Section for Creating Destinations and Trips */}
        <div
          className="w-1/3 p-4 border-r text-xs"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <h2 className="text-xl font-bold mb-4">Create Destination</h2>
          <input
            type="text"
            placeholder="Name"
            value={destinationData.name}
            onChange={(e) =>
              setDestinationData({ ...destinationData, name: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={destinationData.description}
            onChange={(e) =>
              setDestinationData({
                ...destinationData,
                description: e.target.value,
              })
            }
            className="border p-2 mb-2 w-full"
          ></textarea>
          <input
            type="text"
            placeholder="Activities (comma-separated. , + space)"
            value={destinationData.activities.join(", ")}
            onChange={(e) =>
              setDestinationData({
                ...destinationData,
                activities: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Photos (comma-separated URLs. , + space)"
            value={destinationData.photos.join(", ")}
            onChange={(e) =>
              setDestinationData({
                ...destinationData,
                photos: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-4 w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleDestinationSubmit}
          >
            Create Destination
          </button>

          <h2 className="text-xl font-bold mt-8 mb-4">Create Trip</h2>
          <input
            type="text"
            placeholder="Name"
            value={tripData.name}
            onChange={(e) => setTripData({ ...tripData, name: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={tripData.description}
            onChange={(e) =>
              setTripData({ ...tripData, description: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={tripData.imageUrl}
            onChange={(e) =>
              setTripData({ ...tripData, imageUrl: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="date"
            placeholder="Date"
            value={tripData.date}
            onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Participants (comma-separated. , + space)) "
            value={tripData.participants.join(", ")}
            onChange={(e) =>
              setTripData({
                ...tripData,
                participants: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Destinations (Destination IDs comma-separated. , + space)"
            value={tripData.destinations.join(", ")}
            onChange={(e) =>
              setTripData({
                ...tripData,
                destinations: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-4 w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleTripSubmit}
          >
            Create Trip
          </button>

          <h2 className="text-xl font-bold mt-8 mb-4">Update Destination</h2>
          <input
            type="text"
            placeholder="ID"
            value={updateDestinationId}
            onChange={(e) => setUpdateDestinationId(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Name"
            value={destinationData.name}
            onChange={(e) =>
              setDestinationData({ ...destinationData, name: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={destinationData.description}
            onChange={(e) =>
              setDestinationData({
                ...destinationData,
                description: e.target.value,
              })
            }
            className="border p-2 mb-2 w-full"
          ></textarea>
          <input
            type="text"
            placeholder="Activities (comma-separated. , + space)"
            value={destinationData.activities.join(", ")}
            onChange={(e) =>
              setDestinationData({
                ...destinationData,
                activities: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Photos (comma-separated URLs. , + space)"
            value={destinationData.photos.join(", ")}
            onChange={(e) =>
              setDestinationData({
                ...destinationData,
                photos: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-4 w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdateDestination}
          >
            Update Destination
          </button>

          <h2 className="text-xl font-bold mt-8 mb-4">Update Trip</h2>
          <input
            type="text"
            placeholder="ID"
            value={updateTripId}
            onChange={(e) => setUpdateTripId(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Name"
            value={tripData.name}
            onChange={(e) => setTripData({ ...tripData, name: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={tripData.description}
            onChange={(e) =>
              setTripData({ ...tripData, description: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            value={tripData.imageUrl}
            onChange={(e) =>
              setTripData({ ...tripData, imageUrl: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="date"
            placeholder="Date"
            value={tripData.date}
            onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Participants (comma-separated. , + space)"
            value={tripData.participants.join(", ")}
            onChange={(e) =>
              setTripData({
                ...tripData,
                participants: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Destinations (Destination IDs comma-separated. , + space)"
            value={tripData.destinations.join(", ")}
            onChange={(e) =>
              setTripData({
                ...tripData,
                destinations: e.target.value.split(", "),
              })
            }
            className="border p-2 mb-4 w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdateTrip}
          >
            Update Trip
          </button>
        </div>

        {/* MIDDLE  Section for Creating Destinations and Trips */}
        <div
          className="w-1/3 p-4 border-r"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <h2 className="text-xl font-bold mb-4">All Trips</h2>

          <input
            type="text"
            placeholder="Search Trips"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              fetchAndSetTrips();
            }}
            className="border p-2 mb-4 w-full"
          />
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="mb-4 text-xs border-2 p-2 rounded overflow-auto"
            >
              <h3 className="text-xs font-bold">{trip.name}</h3>
              <p>ID: {trip._id}</p>
              <p>Date: {trip.date}</p>
              <p>Participants: {trip.participants.join(", ")}</p>
              <p>Destinations: {trip.destinations.join(", ")}</p>
              <div className="flex mt-2">
                <input
                  type="text"
                  placeholder="(Destination IDs comma-separated. , + space)"
                  value={destinationId}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setDestinationId(e.target.value);
                  }}
                  className="border p-2 mr-2 w-40 text-xs"
                />
                <button
                  className="bg-green-500 text-[8px] text-white p-1 rounded"
                  onClick={() => handleAddDestinationToTrip(trip._id)}
                >
                  Add Destination
                </button>
                <button
                  className="bg-red-500 text-[8px] text-white p-1 rounded"
                  onClick={() => handleRemoveDestinationFromTrip(trip._id)}
                >
                  Delete Destination
                </button>
                <button
                  className=" text-white p-1 rounded mr-2"
                  onClick={() => handleDeleteTrip(trip._id)}
                >
                  <img src={deleteIcon} alt="delete" className="w-6 " />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div
          className="w-1/3 p-4 text-xs"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <h2 className="text-xl font-bold mb-4">All Destinations</h2>
          <input
            type="text"
            placeholder="Search Destinations"
            value={searchDestinationQuery}
            onChange={(e) => {
              setSearchDestinationQuery(e.target.value);
              fetchAndSetDestinations();
            }}
            className="border p-2 mb-4 w-full"
          />
          {destinations.map((destination) => (
            <div
              key={destination._id}
              className="mb-4 border-2 p-2 relative rounded overflow-auto"
            >
              <h3 className="text-s font-bold">{destination.name}</h3>
              <p>ID: {destination._id}</p>
              <p>Description: {destination.description}</p>
              <p>Activities: {destination.activities.join(", ")}</p>
              <p className="mb-6">Photos: {destination.photos.join(", ")}</p>
              <button
                className=" text-white px-2 py-2 rounded mt-2 absolute bottom-1 right-1"
                onClick={() => handleDeleteDestination(destination._id)}
              >
                <img src={deleteIcon} alt="delete" className="w-6 " />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Admin;

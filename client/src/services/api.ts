import axios from 'axios';

export interface IDestination {
    _id?: string;
    name: string;
    description: string;
    activities: string[];
    photos: string[];
  }
  
export interface ITrip {
    _id?: string;
    name: string;
    description: string;
    imageUrl: string;
    date: string;
    participants: string[];
    destinations: string[];
  }

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Destinations API
export const createDestination = async (data: IDestination) => {
  const response = await api.post('/destinations', data);
  return response.data;
};

export const getAllDestinations = async () => {
  const response = await api.get('/destinations');
  return response.data;
};

export const getDestinationById = async (id: string) => {
  const response = await api.get(`/destinations/${id}`);
  return response.data;
};

export const updateDestination = async (id: string, data: any) => {
  console.log("Updating destination: ", id, data);
  const response = await api.put(`/destinations/${id}`, data);
  return response.data;
};

export const deleteDestination = async (id: string) => {
  const response = await api.delete(`/destinations/${id}`);
  return response.data;
};

export const searchDestinationsByName = async (name: string) => {
  const response = await api.get(`/destinations/search/${name}`);
  return response.data;
};

export const checkDestinationExistence = async (id: string) => {
  try {
    await getDestinationById(id);
    return true;
  } catch (error) {
    return false;
  }
};

// Trips API
export const createTrip = async (data: ITrip) => {
  const response = await api.post('/trips', data);
  return response.data;
};

export const deleteTrip = async (id: string) => {
  const response = await api.delete(`/trips/${id}`);
  return response.data;
};

export const updateTrip = async (id: string, data: any) => {
  const response = await api.put(`/trips/${id}`, data);
  return response.data;
};

export const getDestinationsFromTrip = async (id: string) => {
  const response = await api.get(`/trips/${id}/destinations`);
  return response.data;
};

export const addDestinationsToTrip = async (id: string, data: any) => {
  const response = await api.put(`/trips/${id}/addDestinations`, data);
  return response.data;
};

export const removeDestinationsFromTrip = async (id: string, data: any) => {
  const response = await api.put(`/trips/${id}/removeDestinations`, data);
  return response.data;
};

export const getTripById = async (id: string) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const searchTrips = async (params?: {name?: string, date?: string}) => {
    const response = await api.get('/trips', { params });
    return response.data;
};

export const getTripsByDestination = async (id: string) => {
  const response = await api.get(`/trips/byDestination/${id}`);
  return response.data;
};

export const addParticipantsToTrip = async (id: string, data: any) => {
  const response = await api.put(`/trips/${id}/addParticipants`, data);
  return response.data;
};

export const getWeatherByName = async (name: string) => {
  const response = await api.get(`/weather/${name}`);
  return response.data;
};



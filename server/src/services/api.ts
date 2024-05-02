import axios from 'axios';

interface Destination {
    name: string;
    description: string;
    activities: string[];
    photos: string[];
  }
  
  interface Trip {
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
export const createDestination = async (data: Destination) => {
  const response = await api.post('/destinations', data);
  return response.data;
};

export const getAllDestinations = async () => {
  const response = await api.get('/destinations');
  return response.data;
};

export const updateDestination = async (id: string, data: any) => {
  const response = await api.put(`/destinations/${id}`, data);
  return response.data;
};

export const deleteDestination = async (id: string) => {
  const response = await api.delete(`/destinations/${id}`);
  return response.data;
};

// Trips API
export const createTrip = async (data: Trip) => {
  const response = await api.post('/trips', data);
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

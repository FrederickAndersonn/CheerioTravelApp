# Table of Contents
1. [Cheerio Travel App](#cheerio-travel-app)
2. [Description](#description)
3. [Features](#features)
   - [Main Functionality](#main-functionality)
   - [Freestyle Functionality](#freestyle-functionality)
4. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Usage](#usage)
   - [Backend Tests](#backend-tests)
6. [Technologies Used](#technologies-used)
7. [Routes Structure](#routes-structure)
   - [Backend Routes](#backend-routes)
   - [Frontend Routes](#frontend-routes)
8. [Contributing](#contributing)

# Cheerio Travel App
![Main Window](/pictures/main.png "Main Window")

## Description
Cheerio Travel App is a platform where users can search for trips and destinations. Admins can create, update, and delete trips and destinations. The app also provides additional features like trivia to access the admin page, current weather information for each destination, and a countdown till the trip date.

## Features

### Main Functionality
1. CRUD (Create, Read, Update, Delete) operations for destinations and trips.
2. Search and filter functionality for trips and destinations.

### Freestyle Functionality
1. Separate Admin and User Pages.
![User](/pictures/user.png "User")
![Admin](/pictures/admin.png "Admin")
2. Trivia game to access the Admin Page (using an external API).
![Trivia](/pictures/trivia.png "Trivia")
3. Current weather information for each destination (using an external API).
4. Countdown timer until the trip date
![Weather and Timer](/pictures/weather.png "Weather")
5. Add Participants to trip (By Inputing name)
![Participants](/pictures/participants.png "Participants")

## Installation

### Prerequisites
- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn (version 1.x or higher)
- MongoDB (version 4.x or higher)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone [repository URL]
   ```
2. Navigate to the backend directory:
   ```sh
   cd server
   ```
3. Install dependencies:
   ```sh
   npm install

4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Usage
1. Open your web browser and go to the port shown after running `npm run dev`.
2. Navigate through the app to explore trips and destinations.
3. Admins can log in through the Admin Page using a trivia game. (If Trivia API is down just head to `url/admin` directly)
4. Creating Updating Data. You can Put More than one Data with comma (Ex: 6626475d5f04e7d7bd73871e, 6652f36d4315a8c3e9760e47). For Updating You can just put in the data you want to update and let the rest be nothing. 
![Create](/pictures/create.png "create")
![Update](/pictures/update.png "update")

### Backend Tests
1. Navigate to the server directory:
   ```sh
   cd server
   ```
2. Run tests:
   ```sh
   npm test
   ```

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, Mongoose, Jest, Nodemon
- **Frontend**: React, Vite, Tailwind CSS
- **External APIs**: OpenWeatherMap API for weather information , Opentdb API for trivia questions

## Routes Structure

### Backend Routes

#### Destination Routes
- `POST /destinations` - Create a new destination
- `GET /destinations` - Get all destinations
- `GET /destinations/:id` - Get a destination by ID
- `PUT /destinations/:id` - Update a destination by ID
- `DELETE /destinations/:id` - Delete a destination by ID
- `GET /destinations/search/:name` - Search destinations by name

#### Trip Routes
- `POST /trips` - Create a new trip
- `DELETE /trips/:id` - Delete a trip by ID
- `PUT /trips/:id` - Update a trip by ID
- `GET /trips/:id/destinations` - Get all destinations from a trip
- `PUT /trips/:id/addDestinations` - Add destinations to a trip
- `PUT /trips/:id/removeDestinations` - Remove destinations from a trip
- `GET /trips/:id` - Get a trip by ID
- `GET /trips` - Find trips based on name or date
- `GET /trips/byDestination/:id` - Find trips based on destination
- `PUT /trips/:id/addParticipants` - Add participants to a trip

#### Weather Route
- `GET /weather/:destinationName` - Get current weather for a destination

### Frontend Routes
- `/` - Home page
- `/trips` - Trips page
- `/destination/:tripId` - Destination details page
- `/admin` - Admin page

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. Make your changes.
4. Commit your changes:
   ```sh
   git commit -m "Add some feature"
   ```
5. Push to the branch:
   ```sh
   git push origin feature/your-feature
   ```
6. Open a pull request.


This README provides a comprehensive guide to understanding, setting up, and using the Cheerio Travel App. If you have any specific questions or need further assistance, feel free to ask!
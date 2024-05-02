import mongoose from 'mongoose';
import Destination, { IDestination } from '../models/Destination';
import Trip, { ITrip } from '../models/Trip';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

const populateGermanDestinations = async (): Promise<void> => {
    try {
      const destinationsData: IDestination[] = [
        {
          name: 'Berlin',
          description: 'Capital City with Rich History',
          activities: ['Visit Brandenburg Gate', 'Explore Museum Island', 'Walk along the Berlin Wall'],
          photos: ['https://www.kreiszeitung.de/assets/images/28/403/28403717-brandenburger-tor-wahrzeichen-hauptstadt-berlin-abendsonne-2l6bhKL1aFec.jpg', 'berlin2.jpg', 'berlin3.jpg'],
        } as IDestination,
        {
          name: 'Munich',
          description: 'Bavarian Charm and Oktoberfest',
          activities: ['Visit Marienplatz', 'Explore Neuschwanstein Castle', 'Enjoy Oktoberfest'],
          photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_München.jpg/1200px-Stadtbild_München.jpg', 'munich2.jpg', 'munich3.jpg'],
        } as IDestination,
        {
          name: 'Hamburg',
          description: 'Gateway to the World',
          activities: ['Visit Miniatur Wunderland', 'Explore Speicherstadt', 'Take a harbor cruise'],
          photos: ['hamburg1.jpg', 'hamburg2.jpg', 'hamburg3.jpg'],
        } as IDestination,
        {
          name: 'Heidelberg',
          description: 'Historic University Town',
          activities: ['Visit Heidelberg Castle', 'Explore Old Town', 'Take a Philosopher\'s Walk'],
          photos: ['heidelberg1.jpg', 'heidelberg2.jpg', 'heidelberg3.jpg'],
        } as IDestination
      ];
  
      await Destination.insertMany(destinationsData);
      console.log('German Destinations seeded successfully');
    } catch (error) {
      console.error('Error seeding German Destinations:', error);
    }
  };

const populateIndonesianDestinations = async (): Promise<void> => {
    try {
      const destinationsData: IDestination[] = [
        {
          name: 'Bali',
          description: 'The Island of Gods',
          activities: ['Beach Relaxation', 'Temple Visits', 'Surfing'],
          photos: ['https://imageio.forbes.com/specials-images/imageserve/675172642/pura-ulun-danu-bratan-temple-in-Bali-/960x0.jpg?format=jpg&width=960','bali2.jpg', 'bali3.jpg'],
        } as IDestination,
        {
          name: 'Yogyakarta',
          description: 'Cultural Heart of Java',
          activities: ['Visit Borobudur', 'Explore Kraton Palace', 'Try Batik Art'],
          photos: ['https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/java/di-yogyakarta/image11.jpg', 'yogyakarta2.jpg', 'yogyakarta3.jpg'],
        } as IDestination,
        {
          name: 'Komodo Island',
          description: 'Home of the Komodo Dragon',
          activities: ['Komodo Dragon Safari', 'Snorkeling', 'Hiking'],
          photos: ['komodo1.jpg', 'komodo2.jpg', 'komodo3.jpg'],
        } as IDestination,
        {
          name: 'Raja Ampat',
          description: 'Paradise for Divers',
          activities: ['Diving', 'Island Hopping', 'Bird Watching'],
          photos: ['rajaampat1.jpg', 'rajaampat2.jpg', 'rajaampat3.jpg'],
        } as IDestination
      ];
  
      await Destination.insertMany(destinationsData);
      console.log('Indonesian Destinations seeded successfully');
    } catch (error) {
      console.error('Error seeding Indonesian Destinations:', error);
    }
  };

  const populateJapaneseDestinations = async (): Promise<void> => {
    try {
      const destinationsData: IDestination[] = [
        {
          name: 'Tokyo',
          description: 'The Capital City of Japan',
          activities: ['Visit Tokyo Tower', 'Explore Shibuya Crossing', 'Experience Asakusa'],
          photos: ['https://media.cntraveler.com/photos/63482b255e7943ad4006df0b/16:9/w_2560%2Cc_limit/tokyoGettyImages-1031467664.jpeg', 'tokyo2.jpg', 'tokyo3.jpg'],
        } as IDestination,
        {
          name: 'Kyoto',
          description: 'Historical City with Temples and Gardens',
          activities: ['Visit Kinkaku-ji (Golden Pavilion)', 'Explore Fushimi Inari Shrine', 'Stroll through Gion District'],
          photos: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fboutiquejapan.com%2Fkyoto-guide%2F&psig=AOvVaw1WRYCTNHiRZmvWYrLcdrEL&ust=1713870772783000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCH5KbY1YUDFQAAAAAdAAAAABAE', 'kyoto2.jpg', 'kyoto3.jpg'],
        } as IDestination,
        {
          name: 'Osaka',
          description: 'The Kitchen of Japan',
          activities: ['Visit Osaka Castle', 'Explore Dotonbori', 'Experience Universal Studios Japan'],
          photos: ['osaka1.jpg', 'osaka2.jpg', 'osaka3.jpg'],
        } as IDestination,
        {
          name: 'Hiroshima',
          description: 'City of Peace and History',
          activities: ['Visit Hiroshima Peace Memorial Park', 'Explore Itsukushima Shrine on Miyajima Island', 'Learn about WWII History'],
          photos: ['hiroshima1.jpg', 'hiroshima2.jpg', 'hiroshima3.jpg'],
        } as IDestination
      ];
  
      await Destination.insertMany(destinationsData);
      console.log('Japanese Destinations seeded successfully');
    } catch (error) {
      console.error('Error seeding Japanese Destinations:', error);
    }
  };

  const populateAmericanDestinations = async (): Promise<void> => {
    try {
      const destinationsData: IDestination[] = [
        {
          name: 'New York',
          description: 'The City That Never Sleeps',
          activities: ['Visit Times Square', 'Explore Central Park', 'See the Statue of Liberty'],
          photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5E2LjLMALpRmdFlWX6CYrmhhK582HPnjzxGGanfvwQ&s', 'newyork2.jpg', 'newyork3.jpg'],
        } as IDestination,
        {
          name: 'Los Angeles',
          description: 'City of Angels',
          activities: ['Visit Hollywood', 'Explore Venice Beach', 'See Disneyland'],
          photos: ['https://upload.wikimedia.org/wikipedia/commons/3/32/20190616154621%21Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg', 'losangeles2.jpg', 'losangeles3.jpg'],
        } as IDestination
      ];
      await Destination.insertMany(destinationsData);
      console.log('American Destinations seeded successfully');
    } catch (error) {
        console.error('Error seeding American Destinations:', error);
    }
  };

  const populateHdaDestination = async (): Promise<void> => {
    try {
      const destinationsData: IDestination[] = [
        {
          name: 'D14',
          description: 'Sad Place',
          activities: ['Coding'],
          photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXQYdm5Ou_thY95cZiH3tW6Q_n8JpIGucjpga0huvmg&s', 'd142.jpg', 'd143.jpg'],
        } as IDestination,
        {
            name: 'Mensa',
            description: 'Sad Food',
            activities: ['Eat'],
            photos: ['https://fbw.h-da.de/fileadmin/_processed_/d/5/csm_Mensa_Schoefferstrasse_9a458448d5.jpg', 'd142.jpg', 'd143.jpg'],
          } as IDestination
        ];
        await Destination.insertMany(destinationsData);
        console.log('HDA Destinations seeded successfully');
    } catch (error) {
        console.error('Error seeding HDA Destinations:', error);
    }
  };
  // Seed trips
  const populateTrips = async (): Promise<void> => {
    try {
      // Fetch all destinations
      const destinations = await Destination.find({}).select('name _id');
  
      // Extract destination names
      const destinationNames = destinations.map(dest => dest.name);
  
      const tripData: ITrip[] = [
        {
          name: 'German Adventure',
          description: 'Explore the beauty of Germany',
          imageUrl: 'https://www.deutschland.de/sites/default/files/media/image/shutterstock_410747884.jpg',
          date: new Date('2024-08-15'),
          participants: ['Alice', 'Bob'],
          destinations: destinations.filter(dest => destinationNames.includes(dest.name) && ['Berlin', 'Munich'].includes(dest.name)).map(dest => dest._id),
        } as ITrip,
        {
          name: 'Indonesian Discovery',
          description: 'Discover the wonders of Indonesia',
          imageUrl: 'https://www.indonesia.travel/content/dam/indtravelrevamp/home-revamp/JF-labuanbajo.jpg',
          date: new Date('2024-09-10'),
          participants: ['Charlie', 'David'],
          destinations: destinations.filter(dest => destinationNames.includes(dest.name) && ['Bali', 'Yogyakarta'].includes(dest.name)).map(dest => dest._id),
        } as ITrip,
        {
          name: 'Japanese Journey',
          description: 'Experience the culture of Japan',
          imageUrl: 'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1674030135/blog/bnbtltnp5nqbdevfcbmn.jpg',
          date: new Date('2024-10-05'),
          participants: ['Eve', 'Frank'],
          destinations: destinations.filter(dest => destinationNames.includes(dest.name) && ['Tokyo', 'Kyoto'].includes(dest.name)).map(dest => dest._id),
        } as ITrip,
        {
          name: 'American Wonders',
          description: 'Experience the culture of the United States',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoMemYOrp3mRwRH0jN3NuMcZ7E9O8gSnaNa5GGwDgQg&s',
          date: new Date('2024-11-15'),
          participants: ['George', 'Harry'],
          destinations: destinations.filter(dest => destinationNames.includes(dest.name) && ['New York', 'Los Angeles'].includes(dest.name)).map(dest => dest._id),
        } as ITrip,
        {
          name: 'HDA Tour',
          description: 'Tour HDA Destinations',
          imageUrl: 'https://img.echo-online.de/lokales/darmstadt/ncmyf1-HDA-061222/alternates/LANDSCAPE_480/HDA%20061222',
          date: new Date('2024-12-01'),
          participants: ['test'],
          destinations: destinations.filter(dest => destinationNames.includes(dest.name) && ['D14', 'Mensa'].includes(dest.name)).map(dest => dest._id),
        } as ITrip
      ];
  
      await Trip.insertMany(tripData);
      console.log('Trips seeded successfully');
    } catch (error) {
      console.error('Error seeding Trips:', error);
    }
  };
  

// Seed the database
const seedDatabase = async (): Promise<void> => {
  await populateIndonesianDestinations();
  await populateGermanDestinations();
  await populateJapaneseDestinations();
  await populateHdaDestination();
  await populateAmericanDestinations();
  await populateTrips();
  mongoose.connection.close();
};

seedDatabase().catch(error => console.error('Seeding error:', error));
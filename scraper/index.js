const Scraper = require('./scraper');
const DBUploader = require('./dbUploader');

const run = async () => {
  try {
    const restaurants = await getRestaurants();
    await uploadRestaurantsToDB(restaurants);
  } catch(error) {
    console.error('An error occurred:', error.message);
  }
} 

const getRestaurants = async () => {
  const scraper = new Scraper();

  // Scraping can be flaky. Attempt scraping multiple times
  for (let i = 0; i < 3; i++) {
    console.log('Scraping attempt:', i + 1);

    await scraper.run();
    console.log(`Found ${scraper.getRestaurants().length} restaurants`);

    scraper.removeDuplicates();
    console.log(`Duplicates removed, ${scraper.getRestaurants().length} restaurants remained`);

    console.log('==========');
  }
  return scraper.getRestaurants();
}

const uploadRestaurantsToDB = async (restaurants) => {
  if(!restaurants || restaurants.length === 0) {
    console.log('No restaurants to upload to the DB');
    return;
  }

  console.log('Connecting to the database');
  const dbUploader = new DBUploader();
  await dbUploader.connect();

  console.log('Clearing old data');
  await dbUploader.clearCollection();

  console.log('Uploading new data');
  await dbUploader.uploadRestaurants(restaurants);

  console.log('Closing connection');
  await dbUploader.disconnect();
}

run();

const rp = require('request-promise');
const cheerio = require('cheerio');

const { baseUrl, query, itemsPerPage, ratingsMap, selectors, regEx, timeout } = require('./utils')

class Scraper {
  constructor() {
    this.rateLimiterDelay = 1500;
    this.restaurants = [];
    this.totalPages = 12;
  }

  run = async () => {
    await this.scrapeCards(1);
  }

  getRestaurants = () => this.restaurants;

  removeDuplicates = () => {
    this.restaurants = this.restaurants.filter((r, index, self) =>
      index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(r))
    )
  }

  setTotalPages = $ => {
    const totalItemsText = $('h1').text();
    const match = totalItemsText.match(regEx.totalItems);
  
    if (match && match.length > 0) {
      const totalItems = Number(match[0].replace(/[\.,]/g, ''));
      this.totalPages = Math.ceil(totalItems / itemsPerPage);
      console.log("Total pages to scrape:", this.totalPages);
    } else {
      console.log("Failed to find total items in the page", totalItemsText);
      this.totalPages = 0; 
    }
  }

  scrapeDetails = async (link) => {
    const options = {
      uri: link,
      transform: body => cheerio.load(body)
    };

    const $ = await rp(options).catch((err) => {
      delete err.response;
      console.log(`Failed to load detail page for phone scraping: ${link}`);
    });

    if(!$) {
      return null;
    }

    const phoneLink = $(selectors.phone).attr('href');
    const phone = phoneLink ? phoneLink.replace('tel:', '').trim() : null;
    const location = $(selectors.location).first().text().trim();
    const description = $(selectors.description).text().trim();

    return [phone, location, description];
  }
  
  scrapeCards = async (currentPage) => {
    const that = this;
    const start = new Date();
    const options = {
      uri: baseUrl + query + currentPage,
      transform: body => {
        return cheerio.load(body);
      }
    };

    const $ = await rp(options).catch((err) => {
      delete err.response
      console.log(err)
    });

    if (!$) {
      console.log('Skipping current page due to request failure.');
      return;
    }

    if (this.totalPages === 1) {
      this.setTotalPages($);
    }

    // due to errors try to collect cards if fail then simply continue
    try {
      const cards = $(selectors.cards);
      cards.each(async function () {
        const $card = $(this);
        const $icons = $card.find(selectors.rating);
        
        let rating = 0;
        let distinction = 'None';

        $icons.each(function(){
          const $icon = $(this);
          const src = $icon.attr('src') || '';

          if(src.includes('1star')){
            rating += 1;
          } else if(src.includes('bib-gourmand')){
            distinction = 'Bib Gourmand';
          }
        });

        if(rating == 1) {
          distinction = 'Michelin 1 star'
        } else if(rating == 2){
          distinction = 'Michelin 2 star'
        } else if(rating == 3){
          distinction = 'Michelin 3 star'
        }

        const name = $card.find(selectors.name).text().trim();
        const link = `${baseUrl}${$card.find(selectors.link).attr('href')}`;
        const city = $card.find(selectors.city).text().trim();
        const type = $card.find(selectors.type).text().split('·')[1].trim();
        const img = $card.find(selectors.img).attr('ci-bg-url');
        const price = $card.find(selectors.type).text().split('·')[0].trim();
        // const lat = $card.data('lat');
        // const lng = $card.data('lng');

        const details = await that.scrapeDetails(link);
        const phone = details[0];
        const location = details[1];
        const description = details[2];

        console.log(description);

        that.restaurants.push({ 
          restaurant_name: name,
          city: city,
          location: location,
          type: type,
          rating: rating,
          phone: phone,
          img: img,
          price: price,
          description: description,
        });
      });
    }
    catch (err) {
      console.log(err)
    }

    const end = new Date();
    const delay = this.rateLimiterDelay - (end - start)
    await timeout(delay)

    if (currentPage < this.totalPages) {
      return this.scrapeCards(currentPage + 1);
    }
    return;
  }

  


}

module.exports = Scraper;

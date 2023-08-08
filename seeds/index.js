const Campground = require('../models/campgrounds');
const { descriptors, places } = require('./seedHelpers');
const cities = require('./cities');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("CONNECTED TO DATABASE");
    })
    .catch(err => {
        console.log(err);
    });

const sample = array => array[ Math.floor( Math.random() * array.length ) ];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const randomCity = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 5000) + 10;
        const camp = new Campground ({
            author: '64945a927d66c53fb23e1e80',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[randomCity].name}, ${cities[randomCity].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[randomCity].lon, cities[randomCity].lat]
            },
            price,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, modi. Itaque porro velit maiores dolorem, possimus libero iste dignissimos magnam modi necessitatibus a? Expedita dolore aspernatur, molestias provident libero voluptatum?',
            images: [
                {
                  url: 'https://res.cloudinary.com/djwtbhg6r/image/upload/v1689351542/YelpCamp/olw8rvgpxdtcph77focg.jpg',       
                  filename: 'YelpCamp/olw8rvgpxdtcph77focg',
                },
                {
                  url: 'https://res.cloudinary.com/djwtbhg6r/image/upload/v1689351548/YelpCamp/htlh111bega4tm8zomiw.jpg',       
                  filename: 'YelpCamp/htlh111bega4tm8zomiw',
                }
            ]
        });
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/firstDB')
  .then(() => console.log('Conneted to MongoDB.'))
  .catch(err => console.error('Could not connect to MongoDB.', err));
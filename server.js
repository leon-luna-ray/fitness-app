const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connection to mongo db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false
});

// require routes
app.use(require('./routes/html-routes.js'));
app.use(require('./routes/api-routes.js'));

app.listen(PORT, () => {
  console.log(`
  🤖 The app is running on port ${PORT}
  `);
});

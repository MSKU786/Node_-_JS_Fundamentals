const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of express application
const app = express();
const port = 8000;

// middleware to parse json bodies from request
app.use(bodyParser.json());

// In memory database
let rides = [];

// auto increment id for new rides
let nextRideId = 1;

// Endpoint to create a new ride with the given details on body
app.post('/rides', (req, res) => {
  const { rider_name, pickup_location, destination } = req.body;

  // Validation of input if not validation return error;
  if (!rider_name || !pickup_location || !destination) {
    return res.status(400).json({ error: 'Missing Required fields' });
  }

  // Add new ride with the givendata default completed is false

  const newride = {
    id: nextRideId++,
    rider_name,
    pickup_location,
    destination,
    completed: false,
  };

  rides.push(newride);

  return res.status(201).json(newride);
});

// This endpoint marks ride as complemented

app.put('/rides/:rideId', (req, res) => {
  const rideId = parseInt(req.params.id, 10);

  // find the ride with matching id
  const ride = rides.find((r) => r.id === rideId);

  // if ride id doesn't exist return error;
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }

  // Mark the ride as completed.
  ride.completed = true;

  return res.json(ride);
});

// This endpoint retrives all the rides
app.get('/rides', (req, res) => {
  return res.json(rides);
});

app.listen(port, () => {
  console.log('ride sharing service is runniong on port ', port);
});

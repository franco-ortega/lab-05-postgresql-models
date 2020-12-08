require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const Pizza = require('./lib/models/pizza');

// const Pizza = require('./lib/models/Pizza');

// Pizza
//   .insert({ title: 'greek', toppings: 'greensss', sauce: 'white', price: 12 })
//   .then(console.log);

// Create a pizza
app.post('/pizza', (req, res) => {
  Pizza
    .insert(req.body)
    .then(pizza => res.send(pizza));
});

// Get all pizzas
app.get('/pizza', (req, res) => {
  Pizza
    .find()
    .then(pizza => res.send(pizza));
});

// Get one pizza by ID
app.get('/pizza/:id', (req, res) => {
  const pizzaId = req.params.id;
  Pizza
    .findById(pizzaId)
    .then(pizza => res.send(pizza));
});

// Update one pizza by ID
app.put('/pizza/:id', (req, res) => {
  const pizzaId = req.params.id;
  Pizza
    .update(pizzaId, req.body)
    .then(pizza => res.send(pizza));
});

// Delete one pizza by ID
app.delete('/pizza/:id', (req, res) => {
  const pizzaId = req.params.id;
  Pizza
    .delete(pizzaId)
    .then(pizza => res.send(pizza));
});



app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Heellloooo');
});

app.listen(1234, () => {
    console.log('started on PORT 1234');
});

module.exports = app;

const { pool } = require("pg");

module.exports = class Pizza {
    id;
    title;
    toppings;
    sauce;
    price;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.toppings = row.toppings;
      this.sauce = row.sauce;
      this.price = row.price;
    }

    // CRUD METHODS
    
    // Create
    static insert({ title, toppings, sauce, price }) {
      const { rows } = pool.query(
        'INSERT INTO pizzas (title, toppings, sauce, price) VALUES ($1, $2, $3, $4)',
        [title, toppings, sauce, price]  
      );
      return new Pizza(rows[0]);
    }

  // Read

  //Update

  //Delete
    
};

// console.log(Pizza.insert({ title: 'greek', toppings: 'greensss', sauce: 'white', price: 12 }));
console.log('testing pizzas');

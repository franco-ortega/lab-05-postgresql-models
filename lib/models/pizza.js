const pool = require('../utils/pool');

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
    static async insert({ title, toppings, sauce, price }) {
      const { rows } = await pool.query(
        'INSERT INTO pizzas (title, toppings, sauce, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, toppings, sauce, price]  
      );
      return new Pizza(rows[0]);
    }

    // Read
    static async find() {
      const { rows } = await pool.query('SELECT * FROM pizzas');
      return rows.map(row => new Pizza(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM pizzas WHERE id=$1',
        [id]
      );
      return new Pizza(rows[0]);
    }

    //Update
    static async update(id, { title, toppings, sauce, price }) {
      const { rows } = await pool.query(
        `UPDATE pizzas
          SET title=$1,
          toppings=$2,
          sauce=$3,
          price=$4
          WHERE id=$5
          RETURNING *
          `,
        [title, toppings, sauce, price, id]
      );
      return new Pizza(rows[0]);
    }

    //Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM pizzas WHERE id=$1 RETURNING *',
        [id]
      );
      return new Pizza(rows[0]);
    }
};

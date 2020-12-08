const pool = require('../utils/pool');

module.exports = class Potion {
    id;
    title;
    flavor;
    color;
    price;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.flavor = row.flavor;
      this.color = row.color;
      this.price = row.price;
    }

    // CRUD METHODS
    // Create
    static async insert({ title, flavor, color, price }) {
      const { rows } = await pool.query(
        'INSERT INTO potions (title, flavor, color, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, flavor, color, price]
      );
      return new Potion(rows[0]);
    }
  
    // Read
    static async find() {
      const { rows } = await pool.query('SELECT * FROM potions');
      return rows.map(row => new Potion(row));
    }
  
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM potions WHERE id=$1',
        [id]
      );
      return new Potion(rows[0]);
    }
  
    //Update
    static async update(id, { title, flavor, color, price }) {
      const { rows } = await pool.query(
        `UPDATE potions
            SET title=$1,
            flavor=$2,
            color=$3,
            price=$4
            WHERE id=$5
            RETURNING *
            `,
        [title, flavor, color, price, id]
      );
      return new Potion(rows[0]);
    }
  
    //Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM potions WHERE id=$1 RETURNING *',
        [id]
      );
      return new Potion(rows[0]);
    } 
};

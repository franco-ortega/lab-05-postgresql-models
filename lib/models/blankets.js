const pool = require('../utils/pool');

module.exports = class Blanket {
    id;
    title;
    color;
    size;
    price;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.color = row.color;
      this.size = row.size;
      this.price = row.price;
    }

    // CRUD METHODS
    
    // Create
    static async insert({ title, color, size, price }) {
      const { rows } = await pool.query(
        'INSERT INTO blankets (title, color, size, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, color, size, price]
      );
      return new Blanket(rows[0]);
    }
  
    // Read
    static async find() {
      const { rows } = await pool.query('SELECT * FROM blankets');
  
      return rows.map(row => new Blanket(row));
    }
  
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM blankets WHERE id=$1',
        [id]
      );
  
      return new Blanket(rows[0]);
    }
  
    //Update
    static async update(id, { title, color, size, price }) {
      const { rows } = await pool.query(
        `UPDATE blankets
            SET title=$1,
            color=$2,
            size=$3,
            price=$4
            WHERE id=$5
            RETURNING *
            `,
        [title, color, size, price, id]
      );
      return new Blanket(rows[0]);
    }
  
    //Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM blankets WHERE id=$1 RETURNING *',
        [id]
      );
      return new Blanket(rows[0]);
    }
      
};
  

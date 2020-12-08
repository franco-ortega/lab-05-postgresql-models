const pool = require('../utils/pool');

module.exports = class Planet {
    id;
    title;
    color;
    size;
    rings;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.color = row.color;
      this.size = row.size;
      this.rings = row.rings;
    }

    // CRUD METHODS    
    // Create
    static async insert({ title, color, size, rings }) {
      const { rows } = await pool.query(
        'INSERT INTO planets (title, color, size, rings) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, color, size, rings]
      );
      return new Planet(rows[0]);
    }
  
    // Read
    static async find() {
      const { rows } = await pool.query('SELECT * FROM planets');
      return rows.map(row => new Planet(row));
    }
  
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM planets WHERE id=$1',
        [id]
      );
      return new Planet(rows[0]);
    }
  
    //Update
    static async update(id, { title, color, size, rings }) {
      const { rows } = await pool.query(
        `UPDATE planets
            SET title=$1,
            color=$2,
            size=$3,
            rings=$4
            WHERE id=$5
            RETURNING *
            `,
        [title, color, size, rings, id]
      );
      return new Planet(rows[0]);
    }
  
    //Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM planets WHERE id=$1 RETURNING *',
        [id]
      );
      return new Planet(rows[0]);
    }
};

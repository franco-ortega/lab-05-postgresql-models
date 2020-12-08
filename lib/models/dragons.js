const pool = require('../utils/pool');

module.exports = class Dragon {
    id;
    species;
    color;
    terrain;
    legs;

    constructor(row) {
      this.id = row.id;
      this.species = row.species;
      this.color = row.color;
      this.terrain = row.terrain;
      this.legs = row.legs;
    }

    // CRUD METHODS
    
    // Create
    static async insert({ species, color, terrain, legs }) {
      const { rows } = await pool.query(
        'INSERT INTO dragons (species, color, terrain, legs) VALUES ($1, $2, $3, $4) RETURNING *',
        [species, color, terrain, legs]
      );
      return new Dragon(rows[0]);
    }
  
    // Read
    static async find() {
      const { rows } = await pool.query('SELECT * FROM dragons');
  
      return rows.map(row => new Dragon(row));
    }
  
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM dragons WHERE id=$1',
        [id]
      );
  
      return new Dragon(rows[0]);
    }
  
    //Update
    static async update(id, { species, color, terrain, legs }) {
      const { rows } = await pool.query(
        `UPDATE dragons
            SET species=$1,
            color=$2,
            terrain=$3,
            legs=$4
            WHERE id=$5
            RETURNING *
            `,
        [species, color, terrain, legs, id]
      );
      return new Dragon(rows[0]);
    }
  
    //Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM dragons WHERE id=$1 RETURNING *',
        [id]
      );
      return new Dragon(rows[0]);
    }
      
};
  

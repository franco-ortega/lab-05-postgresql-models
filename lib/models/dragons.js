const pool = require('../utils/pool');

module.exports = class Dragon {
    id;
    species;
    color;
    tertain;
    legs;

    constructor(row) {
      this.id = row.id;
      this.species = row.species;
      this.color = row.color;
      this.tertain = row.tertain;
      this.legs = row.legs;
    }

    // CRUD METHODS
    
    // Create
    static async insert({ species, color, tertain, legs }) {
      const { rows } = await pool.query(
        'INSERT INTO dragons (species, color, tertain, legs) VALUES ($1, $2, $3, $4) RETURNING *',
        [species, color, tertain, legs]
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
    static async update(id, { species, color, tertain, legs }) {
      const { rows } = await pool.query(
        `UPDATE dragons
            SET species=$1,
            color=$2,
            tertain=$3,
            legs=$4
            WHERE id=$5
            RETURNING *
            `,
        [species, color, tertain, legs, id]
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
  

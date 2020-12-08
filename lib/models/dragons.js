const pool = require('../utils/pool');

module.exports = class Dragon {
    id;
    species;
    color;
    size;
    legs;

    constructor(row) {
      this.id = row.id;
      this.species = row.species;
      this.color = row.color;
      this.size = row.size;
      this.legs = row.legs;
    }

};

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
};

const fs = require('fs');
const request = require('supertest');
const app = require('../index.js');
const pool = require('../lib/utils/pool.js');
const Pizza = require('../lib/models/pizza.js');

describe('app endpoints in index.js', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  //   it('responds with Heellloooo to test if things are connected correctly', () => {
  //     return request(app)
  //       .get('/')
  //       .then(res => {
  //         expect(res.text).toEqual('Heellloooo');
  //       });
  //   });

  it('creates a pizza via POST', async() => {
    const response = await request(app)
      .post('/pizza')
      .send({
        title: 'veggie',
        toppings: 'mushroom, black olive, artichoke',
        sauce: 'marinara',
        price: '13'
      });
    expect(response.body).toEqual({
      id: '1',
      title: 'veggie',
      toppings: 'mushroom, black olive, artichoke',
      sauce: 'marinara',
      price: '13'
    });
  });

  it('finds one pizza via GET', async() => {
    const pizza = await Pizza.insert({ title: 'fun',
      toppings: 'pineapple, jalapeno',
      sauce: 'marinara',
      price: '15' });

    const response = await request(app)
      .get(`/pizza/${pizza.id}`);
      
    expect(response.body).toEqual(pizza);
  });

  it('updates one pizza via PUT', async() => {
    const pizza = await Pizza.insert({ title: 'vegan',
      toppings: 'leaves, twigs',
      sauce: 'none',
      price: '20' });

    const response = await request(app)
      .put(`/pizza/${pizza.id}`)
      .send({
        title: 'vegan',
        toppings: 'artichoke, broccoli',
        sauce: 'olive oil',
        price: '10'
      });
      
    expect(response.body).toEqual({
      ...pizza,
      title: 'vegan',
      toppings: 'artichoke, broccoli',
      sauce: 'olive oil',
      price: '10'
    });
  });

});

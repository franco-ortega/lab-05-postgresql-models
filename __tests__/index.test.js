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

  it('finds all pizzas via GET', async() => {
    const pizza1 = await Pizza.insert({ title: 'fun',
      toppings: 'pineapple, jalapeno',
      sauce: 'marinara',
      price: '15' }
    );
    const pizza2 = await Pizza.insert({ title: 'wow',
      toppings: 'pb, jam',
      sauce: 'butter',
      price: '25' });
      
    const response = await request(app)
      .get('/pizza');
      
    expect(response.body).toEqual([pizza1, pizza2]);
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

  it('deletes one pizza via DELETE', async() => {
    const pizza = await Pizza.insert({ title: 'meaty',
      toppings: 'cow, pig',
      sauce: 'blood',
      price: '5' });

    const response = await request(app)
      .delete(`/pizza/${pizza.id}`);
      
    expect(response.body).toEqual({
      ...pizza,
      title: 'meaty',
      toppings: 'cow, pig',
      sauce: 'blood',
      price: '5'
    });
  });

});

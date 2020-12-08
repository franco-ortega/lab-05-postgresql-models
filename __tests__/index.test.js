const fs = require('fs');
const request = require('supertest');
const app = require('../index.js');
const pool = require('../lib/utils/pool.js');

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

});

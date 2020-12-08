const request = require('supertest');
const app = require('../index.js');

describe('app endpoints in index.js', () => {
  it('responds with hellooo to test if things are connected correctly between the test and tested file', () => {
    return request(app).get('/')
      .then(res => {
        expect(res.body).toEqual('Heellloooo');
      });
  });
});

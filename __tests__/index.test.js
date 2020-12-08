const request = require('supertest');
const app = require('../index.js');

describe('app endpoints in index.js', () => {
  it('responds with Heellloooo to test if things are connected correctly', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).toEqual('Heellloooo');
      });
  });
});

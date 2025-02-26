const request = require('supertest');
const app = require('../index.js');

describe('TaskChase API', () => {
  it('Get all Products', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('products');
  });
});
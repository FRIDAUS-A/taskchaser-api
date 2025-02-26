const request = require('supertest');
const app = require('../index.js');

describe('TaskChaser Users API', () => {
  it('Register a User', async () => {
    const res = await request(app)
          .post('/api/v1/users')
          .send({
            name: 'John Doe',
            email: 'johndoe@example23.com',
            password: 'SecurePass123',
            phone: '09165051305',
          })
          .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('success');
  });

  it('Login a User', async () => {
    const res = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'johndoe@example23.com',
            password: 'SecurePass123',
          })
          .set('Accept', 'application/json');
    expect(res.statusCode).toEqual(202);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toBe('success');
  })
});
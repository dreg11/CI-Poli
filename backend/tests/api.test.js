const request = require('supertest');
const app = require('../index');

describe('GET /todos', () => {
  it('debe responder con un array', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

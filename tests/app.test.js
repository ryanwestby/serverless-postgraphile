const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should respond the POST method', async () => {
    const query = {
      query: `{
        __schema {
          types {
            name
          }
        }
      }`
    };
    const response = await request(app).post('/').set('Accept', 'application/json').send(query);
    expect(response.statusCode).toBe(200);

    // Even though our connection string is to a local database,
    // the query will return info from the introspection cache.
    // This test therefore is a good way to make sure the introspection cache was written correctly
    expect(JSON.parse(response.res.text).data.__schema.types.length).toBeGreaterThan(0);
  });
});
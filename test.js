const request = require('supertest');
const app = require('./index');

describe('Arvrtise Threads API', () => {
  it('should return default error badge when /arvrtise-threads/ is accessed', async () => {
    const response = await request(app).get('/arvrtise-threads/');
    expect(response.status).toBe(400);
    expect(response.header['content-type']).toBe('image/svg+xml; charset=utf-8');
  });

  it('should return default error badge when an invalid username is provided', async () => {
    const response = await request(app).get('/arvrtise-threads/invalid_username');
    expect(response.status).toBe(404);
    expect(response.header['content-type']).toBe('image/svg+xml; charset=utf-8');
  });

  it('should return a custom badge with the provided valid username', async () => {
    const response = await request(app).get('/arvrtise-threads/zuck');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('image/svg+xml; charset=utf-8');
  });

  it('should return a badge with custom parameters', async () => {
    const response = await request(app)
      .get('/arvrtise-threads/zuck')
      .query({
        color: 'red',
        style: 'flat',
        width: 15,
        scale: 2,
        labelColor: 'white',
        icon: false,
        label: 'Followers',
        gradient: false,
      });
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('image/svg+xml; charset=utf-8');
  });

  it('should handle missing page entries', async () => {
    const response = await request(app).get('/missing/');
    expect(response.status).toBe(404);
    expect(response.header['content-type']).toBe('text/html; charset=utf-8');
  });
});

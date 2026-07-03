import nock from 'nock';
import { VagoClient } from '../src/client';
import { VagoAuthError, VagoNotFoundError, VagoValidationError } from '../src/errors';

describe('VagoClient', () => {
  const client = new VagoClient({ apiKey: 'test-key', baseUrl: 'https://api.test' });

  afterEach(() => {
    nock.cleanAll();
  });

  it('lists jobs with auth header', async () => {
    nock('https://api.test', {
      reqheaders: { authorization: 'Api-Key test-key' },
    })
      .get('/api/jobs/')
      .query({ limit: 2 })
      .reply(200, { count: 1, next: null, previous: null, results: [{ id: 1, name: 'sync' }] });

    const jobs = await client.jobs.list({ limit: 2 });
    expect(jobs.results).toHaveLength(1);
    expect(jobs.results[0].name).toBe('sync');
  });

  it('throws VagoAuthError on 401', async () => {
    nock('https://api.test').get('/api/users/me/').reply(401, { detail: 'bad key' });
    await expect(client.users.me()).rejects.toBeInstanceOf(VagoAuthError);
  });

  it('throws VagoNotFoundError on 404', async () => {
    nock('https://api.test').get('/api/products/99/').reply(404, { detail: 'missing' });
    await expect(client.products.get(99)).rejects.toBeInstanceOf(VagoNotFoundError);
  });

  it('throws VagoValidationError on 400', async () => {
    nock('https://api.test').post('/api/jobs/').reply(400, { detail: 'invalid' });
    await expect(client.post('/api/jobs/', {})).rejects.toBeInstanceOf(VagoValidationError);
  });
});

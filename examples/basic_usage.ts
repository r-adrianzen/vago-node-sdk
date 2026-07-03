import { VagoClient } from '../src';

const vago = new VagoClient({
  apiKey: process.env.VAGO_API_KEY || '',
  baseUrl: process.env.VAGO_BASE_URL || 'https://www.vagocloud.com',
});

async function main() {
  const jobs = await vago.jobs.list({ limit: 5 });
  console.log('Jobs:', jobs.results);

  const summary = await vago.jobs.summary();
  console.log('Summary:', summary);
}

main().catch(console.error);

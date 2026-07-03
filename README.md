# VAGO Cloud Node.js SDK

![CI](https://github.com/r-adrianzen/vago-node-sdk/actions/workflows/ci.yml/badge.svg)
![npm](https://img.shields.io/npm/v/vago-node-sdk)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Official Node.js SDK for the [VAGO Cloud](https://www.vagocloud.com) API.

## Installation

```bash
npm install vago-node-sdk
```

O desde el repo:

```bash
npm install r-adrianzen/vago-node-sdk
```

## Quick start

```typescript
import { VagoClient } from 'vago-node-sdk';

const vago = new VagoClient({
  apiKey: process.env.VAGO_API_KEY!,
  baseUrl: 'https://www.vagocloud.com',
});

async function main() {
  const jobs = await vago.jobs.list({ limit: 5 });
  console.log(jobs.results);
}

main();
```

## Configuration

| Option      | Required | Default                          | Description                |
|-------------|----------|----------------------------------|----------------------------|
| `apiKey`    | Yes      | -                                | API key de VAGO Cloud      |
| `baseUrl`   | No       | `https://www.vagocloud.com`      | Base URL de la API         |
| `timeout`   | No       | `30`                             | Timeout en segundos        |

## Resources

- `vago.jobs` — sync jobs & daily aggregates
- `vago.channels` — marketplace channels
- `vago.tenants` — tenant management
- `vago.users` — users
- `vago.products` — products & SKUs
- `vago.analytics` — analytics endpoints

## License

MIT © VAGO Cloud

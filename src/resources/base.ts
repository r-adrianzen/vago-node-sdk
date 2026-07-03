import { VagoClient } from '../client';

export abstract class BaseResource {
  constructor(protected readonly client: VagoClient) {}
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

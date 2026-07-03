import { BaseResource, PaginatedResponse } from './base';

export interface Tenant {
  id: number;
  name: string;
  slug: string;
  plan: string;
}

export interface TenantsListParams {
  plan?: string;
  limit?: number;
  offset?: number;
}

export class TenantsResource extends BaseResource {
  list(params?: TenantsListParams): Promise<PaginatedResponse<Tenant>> {
    return this.client.get<PaginatedResponse<Tenant>>('/api/tenants/', params);
  }

  get(id: number): Promise<Tenant> {
    return this.client.get<Tenant>(`/api/tenants/${id}/`);
  }
}

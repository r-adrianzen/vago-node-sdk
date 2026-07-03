import { BaseResource, PaginatedResponse } from './base';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface UsersListParams {
  role?: string;
  limit?: number;
  offset?: number;
}

export class UsersResource extends BaseResource {
  list(params?: UsersListParams): Promise<PaginatedResponse<User>> {
    return this.client.get<PaginatedResponse<User>>('/api/users/', params);
  }

  get(id: number): Promise<User> {
    return this.client.get<User>(`/api/users/${id}/`);
  }

  me(): Promise<User> {
    return this.client.get<User>('/api/users/me/');
  }
}

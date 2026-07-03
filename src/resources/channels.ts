import { BaseResource, PaginatedResponse } from './base';

export interface Channel {
  id: number;
  name: string;
  slug: string;
  active: boolean;
}

export interface ChannelsListParams {
  active?: boolean;
  limit?: number;
  offset?: number;
}

export class ChannelsResource extends BaseResource {
  list(params?: ChannelsListParams): Promise<PaginatedResponse<Channel>> {
    return this.client.get<PaginatedResponse<Channel>>('/api/channels/', params);
  }

  get(id: number): Promise<Channel> {
    return this.client.get<Channel>(`/api/channels/${id}/`);
  }
}

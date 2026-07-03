import { BaseResource, PaginatedResponse } from './base';

export interface Job {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DailyAggregate {
  date: string;
  total: number;
  succeeded: number;
  failed: number;
}

export interface JobsListParams {
  status?: string;
  limit?: number;
  offset?: number;
}

export class JobsResource extends BaseResource {
  list(params?: JobsListParams): Promise<PaginatedResponse<Job>> {
    return this.client.get<PaginatedResponse<Job>>('/api/jobs/', params);
  }

  get(id: number): Promise<Job> {
    return this.client.get<Job>(`/api/jobs/${id}/`);
  }

  summary(): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>('/api/jobs/summary/');
  }

  dailyMetrics(params?: { start?: string; end?: string }): Promise<PaginatedResponse<DailyAggregate>> {
    return this.client.get<PaginatedResponse<DailyAggregate>>('/api/jobs/daily-metrics/', params);
  }
}

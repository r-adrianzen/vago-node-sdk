import { BaseResource } from './base';

export interface SnapshotParams {
  tenant?: number;
  channel?: number;
}

export class AnalyticsResource extends BaseResource {
  snapshot(params?: SnapshotParams): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>('/api/analytics/snapshot/', params);
  }

  trends(params?: { days?: number }): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>('/api/analytics/trends/', params);
  }
}

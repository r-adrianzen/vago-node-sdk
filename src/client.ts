import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { VagoAuthError, VagoError, VagoNotFoundError, VagoValidationError } from './errors';
import { JobsResource } from './resources/jobs';
import { ChannelsResource } from './resources/channels';
import { TenantsResource } from './resources/tenants';
import { UsersResource } from './resources/users';
import { ProductsResource } from './resources/products';
import { AnalyticsResource } from './resources/analytics';

export interface VagoClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class VagoClient {
  private readonly http: AxiosInstance;

  public readonly jobs: JobsResource;
  public readonly channels: ChannelsResource;
  public readonly tenants: TenantsResource;
  public readonly users: UsersResource;
  public readonly products: ProductsResource;
  public readonly analytics: AnalyticsResource;

  constructor(options: VagoClientOptions) {
    const baseURL = (options.baseUrl || 'https://www.vagocloud.com').replace(/\/$/, '');
    this.http = axios.create({
      baseURL,
      timeout: (options.timeout || 30) * 1000,
      headers: {
        Authorization: `Api-Key ${options.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) {
          return Promise.reject(new VagoError(error.message || 'Network error'));
        }
        const status = error.response.status;
        const data = error.response.data;
        const message = data?.detail || data?.message || error.message || 'VAGO API error';
        if (status === 401 || status === 403) {
          return Promise.reject(new VagoAuthError(message, data));
        }
        if (status === 404) {
          return Promise.reject(new VagoNotFoundError(message, data));
        }
        if (status === 400 || status === 422) {
          return Promise.reject(new VagoValidationError(message, data));
        }
        return Promise.reject(new VagoError(message, status, data));
      },
    );

    this.jobs = new JobsResource(this);
    this.channels = new ChannelsResource(this);
    this.tenants = new TenantsResource(this);
    this.users = new UsersResource(this);
    this.products = new ProductsResource(this);
    this.analytics = new AnalyticsResource(this);
  }

  async request<T = unknown>(method: string, path: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response = await this.http.request<T>({ method, url: path, ...options });
    return response.data;
  }

  async get<T = unknown>(path: string, params?: Record<string, unknown> | unknown): Promise<T> {
    return this.request<T>('GET', path, { params });
  }

  async post<T = unknown>(path: string, data?: unknown): Promise<T> {
    return this.request<T>('POST', path, { data });
  }

  async patch<T = unknown>(path: string, data?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, { data });
  }

  async delete<T = unknown>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}

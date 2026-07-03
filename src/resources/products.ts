import { BaseResource, PaginatedResponse } from './base';

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  currency: string;
}

export interface ProductsListParams {
  sku?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export class ProductsResource extends BaseResource {
  list(params?: ProductsListParams): Promise<PaginatedResponse<Product>> {
    return this.client.get<PaginatedResponse<Product>>('/api/products/', params);
  }

  get(id: number): Promise<Product> {
    return this.client.get<Product>(`/api/products/${id}/`);
  }
}

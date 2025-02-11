export interface CreateObjectRequest {
  name: string;
  data: Record<string, any>;
}

export interface ObjectResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

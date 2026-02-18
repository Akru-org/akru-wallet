interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      return { data, error: null, status: res.status };
    } catch (e) {
      return { data: null, error: (e as Error).message, status: 0 };
    }
  }

  async post<T, B = unknown>(endpoint: string, body: B): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return { data, error: null, status: res.status };
    } catch (e) {
      return { data: null, error: (e as Error).message, status: 0 };
    }
  }
}

export const apiClient = new ApiClient();
export default ApiClient;

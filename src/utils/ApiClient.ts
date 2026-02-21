interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? (typeof import.meta !== "undefined" ? import.meta.env?.VITE_API_BASE_URL ?? "" : "");
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  private defaultHeaders(extra?: HeadersInit): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(extra as Record<string, string>),
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async get<T>(endpoint: string, headers?: HeadersInit): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: this.defaultHeaders(headers),
      });
      const data = await res.json();
      return { data, error: null, status: res.status };
    } catch (e) {
      return { data: null, error: (e as Error).message, status: 0 };
    }
  }

  async post<T, B = unknown>(endpoint: string, body: B, headers?: HeadersInit): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: this.defaultHeaders(headers),
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return { data, error: null, status: res.status };
    } catch (e) {
      return { data: null, error: (e as Error).message, status: 0 };
    }
  }

  async patch<T, B = unknown>(endpoint: string, body: B, headers?: HeadersInit): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PATCH",
        headers: this.defaultHeaders(headers),
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

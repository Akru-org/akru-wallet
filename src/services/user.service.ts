import { apiClient } from "@/utils/ApiClient";
import { ENDPOINTS } from "@/constants/endpoints";

export interface SyncUserPayload {
  uid: string;
  email: string;
  alias: string;
}

export interface UpdateMePayload {
  alias: string;
}

export interface UpdateMeResponse {
  id: string;
  firebaseUid: string;
  email: string;
  alias?: string;
  kycStatus: string;
  role: string;
  createdAt: string;
}

export const userService = {
  async syncUser(payload: SyncUserPayload) {
    return apiClient.post<{ data: unknown }>(ENDPOINTS.USERS_SYNC, payload);
  },

  async updateMe(payload: UpdateMePayload) {
    return apiClient.patch<{ data: UpdateMeResponse }>(ENDPOINTS.USERS_ME, payload);
  },
};

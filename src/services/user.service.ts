import { apiClient } from "@/utils/ApiClient";
import { ENDPOINTS } from "@/constants/endpoints";
import type { KycStatusValue } from "@/constants/kycStatus";

export interface SyncUserPayload {
  uid: string;
  email: string;
  alias: string;
}

export interface UpdateMePayload {
  alias: string;
}

export interface ProfileResponse {
  id: string;
  firebaseUid: string;
  email: string;
  alias?: string;
  kycStatus: KycStatusValue;
  role: string;
  createdAt: string;
}

export interface UpdateMeResponse extends ProfileResponse {}

export interface UpdateKycPayload {
  kycStatus: KycStatusValue;
}

export const userService = {
  async syncUser(payload: SyncUserPayload) {
    return apiClient.post<{ data: unknown }>(ENDPOINTS.USERS_SYNC, payload);
  },

  async getProfile() {
    return apiClient.get<{ data: ProfileResponse }>(ENDPOINTS.USERS_ME);
  },

  async updateMe(payload: UpdateMePayload) {
    return apiClient.patch<{ data: UpdateMeResponse }>(ENDPOINTS.USERS_ME, payload);
  },

  async updateKyc(payload: UpdateKycPayload) {
    return apiClient.patch<{ data: ProfileResponse }>(ENDPOINTS.USERS_ME_KYC, payload);
  },
};

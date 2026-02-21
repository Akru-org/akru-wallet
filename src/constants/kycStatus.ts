/**
 * Estados de KYC (alineados con el backend).
 * Usar el valor para enviar al API y KYC_STATUS_LABELS para mostrar al usuario.
 */
export const KycStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type KycStatusValue = (typeof KycStatus)[keyof typeof KycStatus];

export const KYC_STATUS_LABELS: Record<KycStatusValue, string> = {
  [KycStatus.PENDING]: "Pendiente",
  [KycStatus.APPROVED]: "Aprobado",
  [KycStatus.REJECTED]: "Rechazado",
};

export const KYC_STATUS_VALUES: KycStatusValue[] = ["PENDING", "APPROVED", "REJECTED"];

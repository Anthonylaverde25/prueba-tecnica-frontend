// src/features/customers/domain/Invoice.ts
export type InvoiceStatus = 'Paid' | 'Pending';

export interface Invoice {
  id: string;
  clientId: string; // Foreign Key to Client
  service: string;
  period: string;
  amount: number;
  status: InvoiceStatus;
}

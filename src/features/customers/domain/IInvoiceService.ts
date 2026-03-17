// src/features/customers/domain/IInvoiceService.ts
import type { Invoice } from './Invoice';

export interface IInvoiceService {
  getInvoicesByClientId(clientId: string): Promise<Invoice[]>;
  payInvoice(id: string): Promise<Invoice>;
}

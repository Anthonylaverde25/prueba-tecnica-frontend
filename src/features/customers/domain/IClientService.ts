// src/features/customers/domain/IClientService.ts
import type { Client } from './Client';

export interface IClientService {
  getClientById(id: string): Promise<Client | null>;
  getClientByQuery(query: string): Promise<Client | null>;
}

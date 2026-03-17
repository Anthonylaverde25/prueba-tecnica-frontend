// src/features/customers/infrastructure/ApiClientService.ts
import type { Client } from "../domain/Client";
import type { IClientService } from "../domain/IClientService";

export class ApiClientService implements IClientService {
  private readonly baseUrl = `${import.meta.env.VITE_API_BASE_URL}/clients`;

  async getClientById(id: string): Promise<Client | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error("Error fetching client record");
      return await response.json();
    } catch (error) {
      console.error("ApiClientService Error:", error);
      throw error;
    }
  }

  async getClientByQuery(query: string): Promise<Client | null> {
    try {
      // First, try direct ID lookup
      const clientById = await this.getClientById(query);
      if (clientById) return clientById;

      // If not found, try email lookup
      const response = await fetch(
        `${this.baseUrl}?email=${encodeURIComponent(query)}`,
      );
      if (!response.ok) throw new Error("Error searching client by email");

      const clients: Client[] = await response.json();
      return clients.length > 0 ? clients[0] : null;
    } catch (error) {
      console.error("ApiClientService Query Error:", error);
      throw error;
    }
  }
}

// src/features/customers/infrastructure/ApiInvoiceService.ts
import type { Invoice } from "../domain/Invoice";
import type { IInvoiceService } from "../domain/IInvoiceService";

export class ApiInvoiceService implements IInvoiceService {
  private readonly baseUrl = `${import.meta.env.VITE_API_BASE_URL}/documents`;

  async getInvoicesByClientId(clientId: string): Promise<Invoice[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error("Error fetching document records");

      const allDocuments: Invoice[] = await response.json();

      return allDocuments.filter((doc) => doc.clientId === clientId);
    } catch (error) {
      console.error("ApiInvoiceService Error:", error);
      throw error;
    }
  }

  async payInvoice(id: string): Promise<Invoice> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Paid" }),
      });
      if (!response.ok) throw new Error("Error processing payment");
      return await response.json();
    } catch (error) {
      console.error("ApiInvoiceService Payment Error:", error);
      throw error;
    }
  }
}

// src/features/customers/hooks/useInvoices.ts
import { useState } from "react";
import type { Invoice } from "../domain/Invoice";
import type { Client } from "../domain/Client";
import { ApiInvoiceService } from "../infrastructure/ApiInvoiceService";
import { ApiClientService } from "../infrastructure/ApiClientService";

const invoiceService = new ApiInvoiceService();
const clientService = new ApiClientService();

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Find client by ID or Email
      const clientData = await clientService.getClientByQuery(query);

      if (!clientData) {
        setError(`No account found for: ${query}`);
        setClient(null);
        setInvoices([]);
      } else {
        setClient(clientData);
        const invoiceData = await invoiceService.getInvoicesByClientId(
          clientData.id,
        );
        setInvoices(invoiceData);
      }
    } catch (err) {
      setError("Internal server error while fetching secure records.");
      setClient(null);
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const payInvoice = async (invoiceId: string) => {
    try {
      const updatedInvoice = await invoiceService.payInvoice(invoiceId);
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === invoiceId ? updatedInvoice : inv)),
      );
    } catch (err) {
      console.error("Payment failed:", err);
      throw err;
    }
  };

  return {
    invoices,
    client,
    isLoading,
    error,
    fetchData,
    payInvoice,
  };
};

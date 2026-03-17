import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

interface Props {
  onSearch: (id: string) => void;
  isLoading: boolean;
}

export const CustomerSearchForm = ({ onSearch, isLoading }: Props) => {
  const [customerId, setCustomerId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = customerId.trim();
    if (cleanId) {
      onSearch(cleanId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
      <div className="flex flex-col sm:flex-row items-end gap-3">
        <Input
          id="customerId"
          label="ID de Cuenta o Dirección de Correo"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="ej. 1001 o anthony@example.com"
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isLoading || !customerId.trim()}
          isLoading={isLoading}
          size="lg"
          className="px-10 h-[50px]"
        >
          Buscar Registro
        </Button>
      </div>
      <p className="text-[10px] text-slate-400 font-medium text-left px-1 uppercase tracking-widest">
        Presione Enter o haga clic para buscar en nuestra base de datos segura
      </p>
    </form>
  );
};

// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CustomerSearchPage } from "./features/customers/pages/CustomerSearchPage";
import { CustomerResultsPage } from "./features/customers/pages/CustomerResultsPage";
import { NotificationProvider } from "./core/contexts/NotificationContext";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
          <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 h-16 flex-shrink-0">
            <div className="px-8 h-full flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-slate-900 flex items-center justify-center">
                  <span className="text-white font-black text-sm">P</span>
                </div>
                <span className="text-sm font-black tracking-[0.2em] text-slate-900 uppercase">
                  Prueba <span className="text-blue-600">Técnica</span>
                </span>
              </div>
            </div>
          </nav>

          <main className="flex-1 w-full overflow-hidden">
            <Routes>
              <Route path="/search" element={<CustomerSearchPage />} />
              <Route
                path="/results/:customerId"
                element={<CustomerResultsPage />}
              />
              <Route path="/" element={<Navigate to="/search" replace />} />
              <Route path="*" element={<Navigate to="/search" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;

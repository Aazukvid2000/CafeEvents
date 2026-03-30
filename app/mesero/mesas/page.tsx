"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMesas } from "../actions";

interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  ubicacion: string | null;
  disponible: boolean;
}

export default function MesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const data = await getMesas();
        setMesas(data);
      } catch (error) {
        console.error("Error al cargar mesas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/mesero" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">🪑 Selecciona una Mesa</h1>
          <p className="text-slate-400">Elige la mesa para registrar un nuevo pedido</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
          </div>
        ) : (
          <>
            {mesas.length === 0 ? (
              <div className="bg-slate-800 p-12 rounded-lg border border-slate-700 text-center">
                <p className="text-slate-300 text-lg">No hay mesas disponibles</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mesas.map((mesa) => (
                  <Link key={mesa.id} href={`/mesero/pedidos/new?mesaId=${mesa.id}`}>
                    <div
                      className={`p-6 rounded-lg border-2 transition-all cursor-pointer h-full ${
                        mesa.disponible
                          ? "bg-gradient-to-br from-green-900 to-green-950 border-green-600 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30"
                          : "bg-gradient-to-br from-red-900 to-red-950 border-red-600 opacity-60"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{mesa.disponible ? "🪑" : "❌"}</div>
                        <h3 className="text-xl font-bold text-white mb-2">Mesa {mesa.numero}</h3>
                        <p className="text-sm mb-3">
                          {mesa.disponible ? (
                            <span className="text-green-300">✓ Disponible</span>
                          ) : (
                            <span className="text-red-300">Ocupada</span>
                          )}
                        </p>
                        <div className="text-xs text-slate-300 space-y-1">
                          <p>Capacidad: {mesa.capacidad} personas</p>
                          {mesa.ubicacion && <p>{mesa.ubicacion}</p>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

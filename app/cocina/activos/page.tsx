"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPedidosActivos } from "@/app/mesero/actions";

interface DetallePedido {
  id: number;
  cantidad: number;
  precioUnitario: number;
  producto: {
    nombre: string;
    descripcion: string | null;
  } | null;
}

interface Pedido {
  id: number;
  estado: string;
  total: number;
  observaciones: string | null;
  fechaCreacion: string | Date;
  mesa: {
    numero: number;
  };
  usuario: {
    nombre: string;
  };
  detallesPedido: DetallePedido[];
}

export default function PedidosActivosCocinaPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchPedidos = async () => {
    try {
      const data = await getPedidosActivos();
      // Convertir Decimal a number para compatibilidad con React
      const convertedData: Pedido[] = data.map((p: any) => ({
        ...p,
        total: Number(p.total),
        detallesPedido: p.detallesPedido.map((d: any) => ({
          ...d,
          precioUnitario: Number(d.precioUnitario),
        })),
      }));
      setPedidos(convertedData);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  // Auto-refresh cada 5 segundos
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchPedidos();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Separar por estado
  const pedidosPendientes = pedidos.filter((p) => p.estado === "PENDIENTE");
  const pedidosPreparando = pedidos.filter((p) => p.estado === "PREPARANDO");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/cocina" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Volver
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🔴 Pedidos Activos</h1>
              <p className="text-slate-400">Pedidos en cola y en preparación</p>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded font-bold transition ${
                autoRefresh
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              {autoRefresh ? "🔄 Auto" : "⏸ Manual"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Pendientes */}
            <div>
              <div className="bg-red-900 border-2 border-red-600 p-6 rounded-lg mb-4">
                <h2 className="text-2xl font-bold text-white">⏳ En Cola ({pedidosPendientes.length})</h2>
              </div>

              {pedidosPendientes.length === 0 ? (
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
                  <p className="text-slate-400">No hay pedidos en cola</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pedidosPendientes.map((pedido) => (
                    <Link key={pedido.id} href={`/cocina/pedidos/${pedido.id}`}>
                      <div className="bg-slate-800 border-2 border-red-600 p-4 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-white">
                            Mesa {pedido.mesa.numero}
                          </h3>
                          <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                            #{pedido.id}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">
                          Mesero: {pedido.usuario.nombre}
                        </p>
                        <ul className="text-sm text-slate-300 space-y-1 mb-3">
                          {pedido.detallesPedido.map((detalle) => (
                            <li key={detalle.id}>
                              • {detalle.cantidad}x {detalle.producto?.nombre}
                            </li>
                          ))}
                        </ul>
                        {pedido.observaciones && (
                          <div className="bg-yellow-900 border border-yellow-600 p-2 rounded text-sm text-yellow-100">
                            ⚠️ {pedido.observaciones}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Preparando */}
            <div>
              <div className="bg-orange-900 border-2 border-orange-600 p-6 rounded-lg mb-4">
                <h2 className="text-2xl font-bold text-white">🍳 Preparando ({pedidosPreparando.length})</h2>
              </div>

              {pedidosPreparando.length === 0 ? (
                <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
                  <p className="text-slate-400">No hay pedidos en preparación</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pedidosPreparando.map((pedido) => (
                    <Link key={pedido.id} href={`/cocina/pedidos/${pedido.id}`}>
                      <div className="bg-slate-800 border-2 border-orange-600 p-4 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-white">
                            Mesa {pedido.mesa.numero}
                          </h3>
                          <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded">
                            #{pedido.id}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">
                          Mesero: {pedido.usuario.nombre}
                        </p>
                        <ul className="text-sm text-slate-300 space-y-1 mb-3">
                          {pedido.detallesPedido.map((detalle) => (
                            <li key={detalle.id}>
                              • {detalle.cantidad}x {detalle.producto?.nombre}
                            </li>
                          ))}
                        </ul>
                        {pedido.observaciones && (
                          <div className="bg-yellow-900 border border-yellow-600 p-2 rounded text-sm text-yellow-100">
                            ⚠️ {pedido.observaciones}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

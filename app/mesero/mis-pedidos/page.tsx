"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPedidosPorMesero } from "@/app/mesero/actions";

interface DetallePedido {
  id: number;
  cantidad: number;
  precioUnitario: number;
  producto: {
    nombre: string;
  } | null;
}

interface Pedido {
  id: number;
  estado: string;
  total: number;
  fechaCreacion: string;
  mesa: {
    numero: number;
  };
  detallesPedido: DetallePedido[];
}

const USUARIO_ID = 1;

export default function MisPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidosPorMesero(USUARIO_ID);
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

    fetchPedidos();
  }, []);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "PENDIENTE":
        return "bg-yellow-900 border-yellow-600";
      case "PREPARANDO":
        return "bg-orange-900 border-orange-600";
      case "LISTO":
        return "bg-green-900 border-green-600";
      case "ENTREGADO":
        return "bg-blue-900 border-blue-600";
      case "CANCELADO":
        return "bg-red-900 border-red-600";
      default:
        return "bg-slate-700 border-slate-600";
    }
  };

  const getStatusLabel = (estado: string) => {
    const labels: { [key: string]: string } = {
      PENDIENTE: "⏳ Pendiente",
      PREPARANDO: "🍳 Preparando",
      LISTO: "✅ Listo",
      ENTREGADO: "🚚 Entregado",
      CANCELADO: "❌ Cancelado",
    };
    return labels[estado] || estado;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/mesero" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">📋 Mis Pedidos</h1>
          <p className="text-slate-400">Historial de pedidos registrados</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="bg-slate-800 p-12 rounded-lg border border-slate-700 text-center">
            <p className="text-slate-300 text-lg mb-4">No tienes pedidos aún</p>
            <Link href="/mesero/mesas" className="text-blue-400 hover:text-blue-300">
              Crear nuevo pedido →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className={`p-6 rounded-lg border-2 ${getStatusColor(pedido.estado)}`}
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Mesa {pedido.mesa.numero}
                    </h3>
                    <p className="text-sm text-slate-300">
                      ID Pedido: #{pedido.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-block bg-slate-900 px-4 py-2 rounded">
                      <p className="text-sm text-slate-300">Estado</p>
                      <p className="text-lg font-bold text-white">
                        {getStatusLabel(pedido.estado)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-slate-900 p-4 rounded mb-4">
                  <p className="text-sm font-semibold text-slate-300 mb-3">Productos:</p>
                  <ul className="space-y-2">
                    {pedido.detallesPedido.map((detalle) => (
                      <li key={detalle.id} className="text-sm text-slate-300 flex justify-between">
                        <span>
                          {detalle.cantidad}x {detalle.producto?.nombre || "Producto"}
                        </span>
                        <span className="text-amber-400">
                          ${(detalle.cantidad * detalle.precioUnitario).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total y Fecha */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-slate-300">
                    {new Date(pedido.fechaCreacion).toLocaleString("es-MX")}
                  </p>
                  <div className="text-right">
                    <p className="text-sm text-slate-300">Total:</p>
                    <p className="text-2xl font-bold text-amber-400">
                      ${Number(pedido.total).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

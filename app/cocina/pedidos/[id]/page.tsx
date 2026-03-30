"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPedidoById, marcarPedidoListo } from "@/app/mesero/actions";

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

export default function DetallePedidoCocinaPage() {
  const params = useParams();
  const pedidoId = parseInt(params.id as string);

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [marcando, setMarcando] = useState(false);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const data = await getPedidoById(pedidoId);
        if (data) {
          // Convertir Decimal a number para compatibilidad con React
          const convertedData: Pedido = {
            ...data,
            total: Number(data.total),
            detallesPedido: data.detallesPedido.map((d: any) => ({
              ...d,
              precioUnitario: Number(d.precioUnitario),
            })),
          };
          setPedido(convertedData);
        }
      } catch (error) {
        console.error("Error al cargar pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();
  }, [pedidoId]);

  const handleMarcarListo = async () => {
    try {
      setMarcando(true);
      await marcarPedidoListo(pedidoId);
      // Actualizar estado local
      if (pedido) {
        setPedido({ ...pedido, estado: "LISTO" });
      }
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = "/cocina/activos";
      }, 1500);
    } catch (error) {
      console.error("Error al marcar como listo:", error);
      setMarcando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400"></div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Pedido no encontrado</p>
          <Link href="/cocina/activos" className="text-red-400 hover:text-red-300">
            Volver a pedidos activos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/cocina/activos" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Volver a activos
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Pedido #{pedido.id} - Mesa {pedido.mesa.numero}
          </h1>
          <div className="flex gap-2 items-center">
            <span className={`inline-block px-3 py-1 rounded font-bold ${
              pedido.estado === "PREPARANDO"
                ? "bg-orange-600 text-white"
                : "bg-yellow-600 text-white"
            }`}>
              {pedido.estado === "PREPARANDO" ? "🍳 Preparando" : "⏳ Pendiente"}
            </span>
            <p className="text-slate-400 text-sm">
              {new Date(pedido.fechaCreacion).toLocaleTimeString("es-MX")}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Detalles del Pedido */}
          <div className="lg:col-span-2">
            
            {/* Información del Cliente */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">👤 Información</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Mesero</p>
                  <p className="text-white font-bold">{pedido.usuario.nombre}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Hora del Pedido</p>
                  <p className="text-white font-bold">
                    {new Date(pedido.fechaCreacion).toLocaleTimeString("es-MX")}
                  </p>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">🍽️ Productos</h2>

              <div className="space-y-3">
                {pedido.detallesPedido.map((detalle) => (
                  <div key={detalle.id} className="bg-slate-700 p-4 rounded border-l-4 border-amber-500">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-lg font-bold text-white">
                          {detalle.producto?.nombre}
                        </p>
                        {detalle.producto?.descripcion && (
                          <p className="text-sm text-slate-400 mt-1">
                            {detalle.producto.descripcion}
                          </p>
                        )}
                      </div>
                      <span className="bg-amber-600 text-white px-3 py-1 rounded font-bold">
                        x{detalle.cantidad}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observaciones */}
            {pedido.observaciones && (
              <div className="bg-yellow-900 border-2 border-yellow-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-100 mb-3">⚠️ Observaciones Especiales</h3>
                <p className="text-yellow-100 text-lg">{pedido.observaciones}</p>
              </div>
            )}

          </div>

          {/* Panel de Acciones */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-slate-800 p-6 rounded-lg border-2 border-red-600">
              
              <h3 className="text-2xl font-bold text-white mb-6">Acciones</h3>

              {/* Contador de Tiempo */}
              <div className="bg-slate-700 p-4 rounded mb-6 text-center">
                <p className="text-slate-400 text-sm mb-2">Tiempo desde pedido</p>
                <p className="text-3xl font-bold text-amber-400">
                  {Math.floor(
                    (new Date().getTime() - new Date(pedido.fechaCreacion).getTime()) / 1000 / 60
                  )}m
                </p>
              </div>

              {/* Botón Principal */}
              {pedido.estado === "PENDIENTE" ? (
                <button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition mb-3"
                  disabled={marcando}
                >
                  {marcando ? "Procesando..." : "🍳 Comenzar Preparación"}
                </button>
              ) : (
                <button
                  onClick={handleMarcarListo}
                  disabled={marcando}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition mb-3"
                >
                  {marcando ? "Marcando..." : "✅ Marcar Como Listo"}
                </button>
              )}

              {/* Info */}
              <div className="bg-slate-700 p-4 rounded text-center">
                <p className="text-slate-400 text-sm">Cantidad de Productos</p>
                <p className="text-3xl font-bold text-white">
                  {pedido.detallesPedido.reduce((sum, d) => sum + d.cantidad, 0)}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

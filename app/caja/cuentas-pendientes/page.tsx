"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCuentasPendientes } from "@/app/mesero/actions";

interface DetallePedido {
  id: number;
  cantidad: number;
  precioUnitario: number;
  producto: {
    nombre: string;
  } | null;
}

interface Cuenta {
  id: number;
  subtotal: string | number;
  impuesto: string | number;
  total: string | number;
  metodoPago: string;
  fechaCreacion: string | Date;
  pedido: {
    mesa: {
      numero: number;
    };
    usuario: {
      nombre: string;
    };
    detallesPedido: DetallePedido[];
  };
}

export default function CuentasPendientesPage() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const data = await getCuentasPendientes();
        // Convertir Decimal a number para compatibilidad con React
        const convertedData: Cuenta[] = data.map((c: any) => ({
          ...c,
          subtotal: Number(c.subtotal),
          impuesto: Number(c.impuesto),
          total: Number(c.total),
          pedido: {
            ...c.pedido,
            detallesPedido: c.pedido.detallesPedido.map((d: any) => ({
              ...d,
              precioUnitario: Number(d.precioUnitario),
            })),
          },
        }));
        setCuentas(convertedData);
      } catch (error) {
        console.error("Error al cargar cuentas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuentas();
  }, []);

  const totalaPorCobrar = cuentas.reduce((sum, c) => sum + Number(c.total), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/caja" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
            ← Volver
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">💰 Cuentas Pendientes</h1>
              <p className="text-slate-400">Pedidos listos para cobrar</p>
            </div>
            <div className="bg-green-900 border-2 border-green-600 p-4 rounded-lg text-right">
              <p className="text-sm text-green-300">Total a Cobrar</p>
              <p className="text-3xl font-bold text-green-400">
                ${totalaPorCobrar.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
        ) : cuentas.length === 0 ? (
          <div className="bg-slate-800 p-12 rounded-lg border border-slate-700 text-center">
            <p className="text-slate-300 text-lg mb-4">No hay cuentas pendientes</p>
            <p className="text-slate-400">Todos los pedidos han sido cobrados ✓</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {cuentas.map((cuenta) => (
              <Link key={cuenta.id} href={`/caja/cobrar/${cuenta.id}`}>
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-lg border-2 border-green-600 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 transition cursor-pointer">
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Mesa */}
                    <div className="bg-slate-900 p-4 rounded">
                      <p className="text-slate-400 text-sm mb-1">Mesa</p>
                      <p className="text-2xl font-bold text-white">
                        #{cuenta.pedido.mesa.numero}
                      </p>
                    </div>

                    {/* Mesero */}
                    <div className="bg-slate-900 p-4 rounded">
                      <p className="text-slate-400 text-sm mb-1">Mesero</p>
                      <p className="text-lg font-bold text-white">
                        {cuenta.pedido.usuario.nombre}
                      </p>
                    </div>

                    {/* Cantidad de Items */}
                    <div className="bg-slate-900 p-4 rounded">
                      <p className="text-slate-400 text-sm mb-1">Productos</p>
                      <p className="text-2xl font-bold text-white">
                        {cuenta.pedido.detallesPedido.reduce((sum, d) => sum + d.cantidad, 0)}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="bg-green-900 border border-green-600 p-4 rounded text-right">
                      <p className="text-slate-300 text-sm mb-1">Total a Cobrar</p>
                      <p className="text-3xl font-bold text-green-400">
                        ${Number(cuenta.total).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Desglose */}
                  <div className="bg-slate-800 p-4 rounded border border-slate-600">
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-slate-400 text-xs">Subtotal</p>
                        <p className="text-lg font-bold text-white">
                          ${Number(cuenta.subtotal).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Impuesto (15%)</p>
                        <p className="text-lg font-bold text-yellow-400">
                          ${Number(cuenta.impuesto).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Hora de Registro</p>
                        <p className="text-sm text-slate-300">
                          {new Date(cuenta.fechaCreacion).toLocaleTimeString("es-MX")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Productos Preview */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-300 mb-2">Productos:</p>
                    <div className="flex flex-wrap gap-2">
                      {cuenta.pedido.detallesPedido.slice(0, 3).map((detalle) => (
                        <span
                          key={detalle.id}
                          className="text-xs bg-slate-700 px-3 py-1 rounded text-slate-300"
                        >
                          {detalle.cantidad}x {detalle.producto?.nombre}
                        </span>
                      ))}
                      {cuenta.pedido.detallesPedido.length > 3 && (
                        <span className="text-xs bg-slate-700 px-3 py-1 rounded text-slate-400">
                          +{cuenta.pedido.detallesPedido.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

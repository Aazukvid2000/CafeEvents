"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCuentaById, pagarCuenta } from "@/app/mesero/actions";

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
  pagada: boolean;
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

export default function CobrarPage() {
  const params = useParams();
  const cuentaId = parseInt(params.pedidoId as string);

  const [cuenta, setCuenta] = useState<Cuenta | null>(null);
  const [loading, setLoading] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [metodoPago, setMetodoPago] = useState("EFECTIVO");
  const [referencia, setReferencia] = useState("");
  const [pagado, setPagado] = useState(false);

  useEffect(() => {
    const fetchCuenta = async () => {
      try {
        const data = await getCuentaById(cuentaId);
        if (data) {
          // Convertir Decimal a number para compatibilidad con React
          const convertedData: Cuenta = {
            ...data,
            subtotal: Number(data.subtotal),
            impuesto: Number(data.impuesto),
            total: Number(data.total),
            pedido: {
              ...data.pedido,
              detallesPedido: data.pedido.detallesPedido.map((d: any) => ({
                ...d,
                precioUnitario: Number(d.precioUnitario),
              })),
            },
          } as Cuenta;
          setCuenta(convertedData);
        }
      } catch (error) {
        console.error("Error al cargar cuenta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuenta();
  }, [cuentaId]);

  const handlePagar = async () => {
    if (!cuenta) return;

    try {
      setProcesando(true);
      await pagarCuenta(cuenta.id, metodoPago, referencia || undefined);
      setPagado(true);

      // Mostrar confirmación y redirigir después de 3 segundos
      setTimeout(() => {
        window.location.href = "/caja/cuentas-pendientes";
      }, 3000);
    } catch (error) {
      console.error("Error al procesar pago:", error);
      setProcesando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (!cuenta) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Cuenta no encontrada</p>
          <Link href="/caja/cuentas-pendientes" className="text-green-400 hover:text-green-300">
            Volver a cuentas pendientes
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
          <Link href="/caja/cuentas-pendientes" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Volver a cuentas
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            💳 Procesar Pago - Mesa {cuenta.pedido.mesa.numero}
          </h1>
        </div>

        {pagado ? (
          <div className="bg-green-900 border-2 border-green-500 p-12 rounded-lg text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-green-300 mb-2">¡Pago Procesado!</h2>
            <p className="text-green-200 text-lg mb-6">
              La cuenta ha sido pagada correctamente
            </p>
            <p className="text-green-100 mb-4">
              Redirigiendo en 3 segundos...
            </p>
            <Link href="/caja/cuentas-pendientes" className="text-green-400 hover:text-green-300 font-bold">
              O haz clic aquí para volver
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Detalles de la Cuenta */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Info General */}
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">👤 Información</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Mesero</p>
                    <p className="text-xl font-bold text-white">{cuenta.pedido.usuario.nombre}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Hora del Pedido</p>
                    <p className="text-white">
                      {new Date(cuenta.fechaCreacion).toLocaleTimeString("es-MX")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4">🛒 Productos</h2>
                <div className="space-y-3">
                  {cuenta.pedido.detallesPedido.map((detalle) => (
                    <div
                      key={detalle.id}
                      className="flex justify-between items-center p-3 bg-slate-700 rounded border-l-4 border-green-500"
                    >
                      <div>
                        <p className="font-bold text-white">{detalle.producto?.nombre}</p>
                        <p className="text-sm text-slate-400">{detalle.cantidad}x ${detalle.precioUnitario.toFixed(2)}</p>
                      </div>
                      <p className="text-lg font-bold text-green-400">
                        ${(detalle.cantidad * detalle.precioUnitario).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Panel de Pago */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-gradient-to-b from-green-900 to-slate-800 p-6 rounded-lg border-2 border-green-600 space-y-6">
                
                {/* Resumen Financiero */}
                <div className="bg-slate-900 p-4 rounded space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Subtotal</span>
                    <span className="text-white font-bold">${Number(cuenta.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Impuesto (15%)</span>
                    <span className="text-yellow-400 font-bold">${Number(cuenta.impuesto).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 flex justify-between">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-green-400">
                      ${Number(cuenta.total).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Método de Pago */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Método de Pago
                  </label>
                  <select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                    disabled={procesando}
                  >
                    <option value="EFECTIVO">💵 Efectivo</option>
                    <option value="TARJETA">💳 Tarjeta</option>
                    <option value="TRANSFERENCIA">📱 Transferencia</option>
                    <option value="OTRO">📋 Otro</option>
                  </select>
                </div>

                {/* Referencia (para tarjeta o transferencia) */}
                {(metodoPago === "TARJETA" || metodoPago === "TRANSFERENCIA") && (
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Referencia / Número
                    </label>
                    <input
                      type="text"
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                      placeholder="Ej: 123456789"
                      className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2"
                      disabled={procesando}
                    />
                  </div>
                )}

                {/* Botón de Pago */}
                <button
                  onClick={handlePagar}
                  disabled={procesando}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition"
                >
                  {procesando ? "Procesando..." : `✓ Cobrar $${Number(cuenta.total).toFixed(2)}`}
                </button>

                {/* Nota de Seguridad */}
                <div className="bg-slate-900 p-3 rounded text-center">
                  <p className="text-xs text-slate-400">
                    ✓ Pago seguro registrado en el sistema
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

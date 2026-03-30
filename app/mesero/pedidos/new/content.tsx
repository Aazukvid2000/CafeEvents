"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  crearPedido,
  getProductos,
  getMesaById,
  agregarDetallePedido,
  enviarPedidoACocina,
} from "@/app/mesero/actions";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string | null;
}

interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  ubicacion: string | null;
}

interface CarritoItem {
  productoId: number;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

const USUARIO_ID = 1; // En producción, obtener del contexto de sesión

export default function NuevoPedidoContent() {
  const searchParams = useSearchParams();
  const mesaId = parseInt(searchParams.get("mesaId") || "0");

  const [mesa, setMesa] = useState<Mesa | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [pedidoId, setPedidoId] = useState<number | null>(null);
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mesaData, productosData] = await Promise.all([
          getMesaById(mesaId),
          getProductos(),
        ]);
        setMesa(mesaData);
        // Convertir Decimal a number para compatibilidad con React
        const convertedProductos: Producto[] = productosData.map((p: any) => ({
          ...p,
          precio: Number(p.precio),
        }));
        setProductos(convertedProductos);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mesaId) {
      fetchData();
    }
  }, [mesaId]);

  // Iniciar pedido
  const iniciarPedido = async () => {
    try {
      const nuevoPedido = await crearPedido(mesaId, USUARIO_ID);
      setPedidoId(nuevoPedido.id);
    } catch (error) {
      console.error("Error al crear pedido:", error);
    }
  };

  // Agregar producto al carrito
  const agregarAlCarrito = async (producto: Producto) => {
    const precioNum = typeof producto.precio === "string" ? parseFloat(producto.precio) : producto.precio;
    const existente = carrito.find((item) => item.productoId === producto.id);

    if (existente) {
      setCarrito(
        carrito.map((item) =>
          item.productoId === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
                subtotal: (item.cantidad + 1) * item.precio,
              }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          productoId: producto.id,
          nombre: producto.nombre,
          cantidad: 1,
          precio: precioNum,
          subtotal: precioNum,
        },
      ]);
    }
  };

  // Aumentar cantidad
  const aumentarCantidad = (productoId: number) => {
    setCarrito(
      carrito.map((item) =>
        item.productoId === productoId
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: (item.cantidad + 1) * item.precio,
            }
          : item
      )
    );
  };

  // Disminuir cantidad
  const disminuirCantidad = (productoId: number) => {
    setCarrito(
      carrito
        .map((item) =>
          item.productoId === productoId && item.cantidad > 1
            ? {
                ...item,
                cantidad: item.cantidad - 1,
                subtotal: (item.cantidad - 1) * item.precio,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Eliminar del carrito
  const eliminarDelCarrito = (productoId: number) => {
    setCarrito(carrito.filter((item) => item.productoId !== productoId));
  };

  // Enviar pedido a cocina
  const enviarPedido = async () => {
    if (!pedidoId || carrito.length === 0) return;

    try {
      setEnviando(true);

      // Agregar todos los detalles del carrito
      for (const item of carrito) {
        await agregarDetallePedido(
          pedidoId,
          item.productoId,
          item.cantidad,
          item.precio,
          observaciones || undefined
        );
      }

      // Enviar pedido a cocina
      await enviarPedidoACocina(pedidoId, observaciones || undefined);

      // Redirigir a mis pedidos
      window.location.href = "/mesero/mis-pedidos";
    } catch (error) {
      console.error("Error al enviar pedido:", error);
      setEnviando(false);
    }
  };

  const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/mesero/mesas" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Seleccionar otra mesa
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            📝 Nuevo Pedido - Mesa {mesa?.numero}
          </h1>
          <p className="text-slate-400">Capacidad: {mesa?.capacidad} personas</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Menú de Productos */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">🍽️ Menú de Productos</h2>

              {productos.length === 0 ? (
                <p className="text-slate-400">No hay productos disponibles</p>
              ) : (
                <div className="space-y-4">
                  {productos.map((producto) => (
                    <div
                      key={producto.id}
                      className="bg-slate-700 p-4 rounded-lg flex justify-between items-center hover:bg-slate-600 transition"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{producto.nombre}</h3>
                        <p className="text-xs text-slate-400 mb-1">{producto.categoria}</p>
                        {producto.descripcion && (
                          <p className="text-sm text-slate-300">{producto.descripcion}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-amber-400">
                          ${(typeof producto.precio === "string" ? parseFloat(producto.precio) : producto.precio).toFixed(2)}
                        </p>
                        <button
                          onClick={() => agregarAlCarrito(producto)}
                          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Carrito y Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              
              {/* Carrito */}
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">🛒 Carrito</h2>

                {carrito.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">Carrito vacío</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {carrito.map((item) => (
                      <div key={item.productoId} className="bg-slate-700 p-3 rounded">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold text-white text-sm">{item.nombre}</span>
                          <button
                            onClick={() => eliminarDelCarrito(item.productoId)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => disminuirCantidad(item.productoId)}
                              className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs"
                            >
                              -
                            </button>
                            <span className="text-white font-bold w-6 text-center">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() => aumentarCantidad(item.productoId)}
                              className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-amber-400 font-bold">
                            ${item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Observaciones y Total */}
              <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-4">
                
                {/* Observaciones */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    📝 Observaciones especiales
                  </label>
                  <textarea
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Ej: Sin cilantro, sin picante..."
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 text-sm"
                    rows={3}
                  />
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between mb-3">
                    <span className="text-slate-300">Subtotal:</span>
                    <span className="text-white font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-amber-400">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Botones */}
                {pedidoId ? (
                  <button
                    onClick={enviarPedido}
                    disabled={carrito.length === 0 || enviando}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition"
                  >
                    {enviando ? "Enviando..." : "✓ Enviar a Cocina"}
                  </button>
                ) : (
                  <button
                    onClick={iniciarPedido}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
                  >
                    Iniciar Pedido
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

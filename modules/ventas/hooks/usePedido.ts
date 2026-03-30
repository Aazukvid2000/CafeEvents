// src/modules/ventas/hooks/usePedido.ts
import { useState } from 'react';
import { Producto } from '../types/producto';
import { DetallePedido, Pedido } from '../types/pedido';

export const usePedido = (mesaId: number, usuarioId: number, pedidoExistente?: Pedido) => {
  const [detalles, setDetalles] = useState<DetallePedido[]>(pedidoExistente?.detalles || []);

  const agregarProducto = (producto: Producto) => {
    if (!producto.disponible) return; 

    setDetalles((prev) => {
      const existe = prev.find((d) => d.productoId === producto.id);
      if (existe) {
        return prev.map((d) =>
          d.productoId === producto.id
            ? { ...d, cantidad: d.cantidad + 1, subtotal: (d.cantidad + 1) * Number(producto.precio) }
            : d
        );
      }
      return [...prev, {
        productoId: producto.id,
        producto,
        cantidad: 1,
        precioUnitario: Number(producto.precio),
        subtotal: Number(producto.precio),
        observaciones: ""
      }];
    });
  };

  const actualizarNota = (productoId: number, nota: string) => {
    setDetalles(prev => prev.map(d => 
      d.productoId === productoId ? { ...d, observaciones: nota } : d
    ));
  };

  const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return;
    setDetalles(prev => prev.map(d => 
      d.productoId === productoId 
        ? { ...d, cantidad: nuevaCantidad, subtotal: nuevaCantidad * d.precioUnitario } 
        : d
    ));
  };

  const eliminarProducto = (productoId: number) => {
    setDetalles((prev) => prev.filter((d) => d.productoId !== productoId));
  };

  // S2: Anulación del pedido (Limpia el estado sin generar cobro)
  const anularPedido = () => {
    setDetalles([]);
  };

  const obtenerTotal = () => detalles.reduce((acc, item) => acc + item.subtotal, 0);

  const enviarPedido = () => {
    if (detalles.length === 0) return;
    const pedidoFinal: Pedido = {
      id: pedidoExistente?.id,
      mesaId,
      usuarioId,
      estado: 'PENDIENTE', 
      total: obtenerTotal(),
      detalles,
    };
    console.log("Paso 8: Sistema envía comanda digital a cocina", pedidoFinal); 
  };

  return { 
    detalles, 
    agregarProducto, 
    eliminarProducto, 
    actualizarNota, 
    actualizarCantidad,
    anularPedido,
    total: obtenerTotal(), 
    enviarPedido 
  };
};
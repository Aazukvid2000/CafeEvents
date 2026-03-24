"use server";

import { prisma } from "@/lib/prisma";
import { EstadoPedido } from "@prisma/client";

// ============================================
// MESAS
// ============================================

export async function getMesas() {
  try {
    return await prisma.mesa.findMany({
      orderBy: { numero: "asc" },
    });
  } catch (error) {
    console.error("Error al obtener mesas:", error);
    throw new Error("Error al obtener mesas");
  }
}

export async function getMesaById(id: number) {
  try {
    return await prisma.mesa.findUnique({
      where: { id },
      include: { pedidos: true },
    });
  } catch (error) {
    console.error("Error al obtener mesa:", error);
    throw new Error("Error al obtener mesa");
  }
}

// ============================================
// PRODUCTOS
// ============================================

export async function getProductos() {
  try {
    return await prisma.producto.findMany({
      where: { disponible: true },
      orderBy: { categoria: "asc" },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error("Error al obtener productos");
  }
}

export async function getProductosByCategoria(categoria: string) {
  try {
    return await prisma.producto.findMany({
      where: { categoria, disponible: true },
    });
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw new Error("Error al obtener productos");
  }
}

// ============================================
// PEDIDOS - CREAR Y ACTUALIZAR
// ============================================

export async function crearPedido(mesaId: number, usuarioId: number) {
  try {
    const pedido = await prisma.pedido.create({
      data: {
        mesaId,
        usuarioId,
        estado: EstadoPedido.PENDIENTE,
        total: 0,
      },
      include: { detallesPedido: true },
    });
    return pedido;
  } catch (error) {
    console.error("Error al crear pedido:", error);
    throw new Error("Error al crear pedido");
  }
}

export async function agregarDetallePedido(
  pedidoId: number,
  productoId: number,
  cantidad: number,
  precioUnitario: number,
  observaciones?: string
) {
  try {
    const precioNum = Number(precioUnitario);
    const subtotal = cantidad * precioNum;

    const detalle = await prisma.detallePedido.create({
      data: {
        pedidoId,
        productoId,
        cantidad,
        precioUnitario: precioNum,
        subtotal,
        observaciones,
      },
    });

    // Actualizar total del pedido
    const detalles = await prisma.detallePedido.findMany({
      where: { pedidoId },
    });

    const totalPedido = detalles.reduce((sum, d) => sum + Number(d.subtotal), 0);

    await prisma.pedido.update({
      where: { id: pedidoId },
      data: { total: totalPedido },
    });

    return detalle;
  } catch (error) {
    console.error("Error al agregar detalle de pedido:", error);
    throw new Error("Error al agregar producto al pedido");
  }
}

export async function actualizarDetallePedido(
  detalleId: number,
  cantidad: number
) {
  try {
    const detalle = await prisma.detallePedido.findUnique({
      where: { id: detalleId },
    });

    if (!detalle) throw new Error("Detalle no encontrado");

    const subtotal = cantidad * Number(detalle.precioUnitario);

    const actualizado = await prisma.detallePedido.update({
      where: { id: detalleId },
      data: { cantidad, subtotal },
    });

    // Recalcular total del pedido
    const detalles = await prisma.detallePedido.findMany({
      where: { pedidoId: detalle.pedidoId },
    });

    const totalPedido = detalles.reduce((sum, d) => sum + Number(d.subtotal), 0);

    await prisma.pedido.update({
      where: { id: detalle.pedidoId },
      data: { total: totalPedido },
    });

    return actualizado;
  } catch (error) {
    console.error("Error al actualizar detalle:", error);
    throw new Error("Error al actualizar producto");
  }
}

export async function eliminarDetallePedido(detalleId: number) {
  try {
    const detalle = await prisma.detallePedido.findUnique({
      where: { id: detalleId },
    });

    if (!detalle) throw new Error("Detalle no encontrado");

    await prisma.detallePedido.delete({
      where: { id: detalleId },
    });

    // Recalcular total del pedido
    const detalles = await prisma.detallePedido.findMany({
      where: { pedidoId: detalle.pedidoId },
    });

    const totalPedido = detalles.reduce((sum, d) => sum + Number(d.subtotal), 0);

    await prisma.pedido.update({
      where: { id: detalle.pedidoId },
      data: { total: totalPedido },
    });

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar detalle:", error);
    throw new Error("Error al eliminar producto");
  }
}

// ============================================
// PEDIDOS - CONSULTAS
// ============================================

export async function getPedidoById(id: number) {
  try {
    return await prisma.pedido.findUnique({
      where: { id },
      include: {
        mesa: true,
        usuario: true,
        detallesPedido: {
          include: { producto: true },
        },
      },
    });
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    throw new Error("Error al obtener pedido");
  }
}

export async function getPedidosPorMesero(usuarioId: number) {
  try {
    return await prisma.pedido.findMany({
      where: { usuarioId },
      include: {
        mesa: true,
        detallesPedido: {
          include: { producto: true },
        },
      },
      orderBy: { fechaCreacion: "desc" },
    });
  } catch (error) {
    console.error("Error al obtener pedidos del mesero:", error);
    throw new Error("Error al obtener pedidos");
  }
}

export async function getPedidosActivos() {
  try {
    return await prisma.pedido.findMany({
      where: {
        estado: {
          in: [EstadoPedido.PENDIENTE, EstadoPedido.PREPARANDO],
        },
      },
      include: {
        mesa: true,
        usuario: true,
        detallesPedido: {
          include: { producto: true },
        },
      },
      orderBy: { fechaCreacion: "asc" },
    });
  } catch (error) {
    console.error("Error al obtener pedidos activos:", error);
    throw new Error("Error al obtener pedidos activos");
  }
}

// ============================================
// PEDIDOS - CAMBIAR ESTADO
// ============================================

export async function enviarPedidoACocina(pedidoId: number, observaciones?: string) {
  try {
    const pedido = await prisma.pedido.update({
      where: { id: pedidoId },
      data: {
        estado: EstadoPedido.PREPARANDO,
        observaciones,
      },
    });
    return pedido;
  } catch (error) {
    console.error("Error al enviar pedido a cocina:", error);
    throw new Error("Error al enviar pedido");
  }
}

export async function marcarPedidoListo(pedidoId: number) {
  try {
    const pedido = await prisma.pedido.update({
      where: { id: pedidoId },
      data: { estado: EstadoPedido.LISTO },
    });
    return pedido;
  } catch (error) {
    console.error("Error al marcar pedido como listo:", error);
    throw new Error("Error al marcar pedido");
  }
}

export async function entregarPedido(pedidoId: number) {
  try {
    const pedido = await prisma.pedido.update({
      where: { id: pedidoId },
      data: { estado: EstadoPedido.ENTREGADO },
    });
    return pedido;
  } catch (error) {
    console.error("Error al entregar pedido:", error);
    throw new Error("Error al entregar pedido");
  }
}

export async function cancelarPedido(pedidoId: number) {
  try {
    const pedido = await prisma.pedido.update({
      where: { id: pedidoId },
      data: { estado: EstadoPedido.CANCELADO },
    });
    return pedido;
  } catch (error) {
    console.error("Error al cancelar pedido:", error);
    throw new Error("Error al cancelar pedido");
  }
}

// ============================================
// CUENTAS
// ============================================

export async function crearCuenta(
  pedidoId: number,
  usuarioId: number,
  metodoPago: string
) {
  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: pedidoId },
    });

    if (!pedido) throw new Error("Pedido no encontrado");

    const impuesto = Number(pedido.total) * 0.15; // 15% de impuesto
    const total = Number(pedido.total) + impuesto;

    const cuenta = await prisma.cuenta.create({
      data: {
        pedidoId,
        usuarioId,
        subtotal: pedido.total,
        impuesto: impuesto,
        total: total,
        metodoPago: metodoPago as any,
        pagada: false,
      },
    });

    return cuenta;
  } catch (error) {
    console.error("Error al crear cuenta:", error);
    throw new Error("Error al crear cuenta");
  }
}

export async function getCuentasPendientes() {
  try {
    return await prisma.cuenta.findMany({
      where: { pagada: false },
      include: {
        pedido: {
          include: {
            mesa: true,
            usuario: true,
          },
        },
      },
      orderBy: { fechaCreacion: "desc" },
    });
  } catch (error) {
    console.error("Error al obtener cuentas pendientes:", error);
    throw new Error("Error al obtener cuentas");
  }
}

export async function getCuentaById(id: number) {
  try {
    return await prisma.cuenta.findUnique({
      where: { id },
      include: {
        pedido: {
          include: {
            mesa: true,
            usuario: true,
            detallesPedido: {
              include: { producto: true },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error al obtener cuenta:", error);
    throw new Error("Error al obtener cuenta");
  }
}

export async function pagarCuenta(
  cuentaId: number,
  tipoPago: string,
  referencia?: string
) {
  try {
    const cuenta = await prisma.cuenta.update({
      where: { id: cuentaId },
      data: {
        pagada: true,
        fechaPago: new Date(),
        metodoPago: tipoPago as any,
      },
    });

    // Registrar el pago
    if (cuenta.pedidoId) {
      const pedido = await prisma.pedido.findUnique({
        where: { id: cuenta.pedidoId },
        include: { usuario: true },
      });

      if (pedido?.usuarioId) {
        await prisma.pago.create({
          data: {
            usuarioId: pedido.usuarioId,
            monto: cuenta.total,
            tipo: tipoPago as any,
            referencia,
            confirmado: true,
          },
        });
      }
    }

    return cuenta;
  } catch (error) {
    console.error("Error al pagar cuenta:", error);
    throw new Error("Error al procesar pago");
  }
}

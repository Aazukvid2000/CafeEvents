"use server";

import { prisma } from "@/lib/prisma";

export async function getCocinaActions() {
  // Re-exportar acciones desde mesero/actions
  const { getPedidosActivos, marcarPedidoListo, getPedidoById } = await import("@/app/mesero/actions");
  return { getPedidosActivos, marcarPedidoListo, getPedidoById };
}

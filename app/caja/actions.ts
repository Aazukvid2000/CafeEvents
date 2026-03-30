"use server";

import { prisma } from "@/lib/prisma";

export async function getCajaActions() {
  // Re-exportar acciones desde mesero/actions
  const { getCuentasPendientes, getCuentaById, pagarCuenta } = await import("@/app/mesero/actions");
  return { getCuentasPendientes, getCuentaById, pagarCuenta };
}

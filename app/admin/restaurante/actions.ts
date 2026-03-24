"use server";

import { prisma } from "@/lib/prisma";

// =====================================================
// MESAS
// =====================================================

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
    });
  } catch (error) {
    console.error("Error al obtener mesa:", error);
    throw new Error("Error al obtener mesa");
  }
}

export async function crearMesa(
  numero: number,
  capacidad: number,
  ubicacion?: string
) {
  try {
    // Verificar que no existe una mesa con el mismo número
    const existente = await prisma.mesa.findUnique({
      where: { numero },
    });

    if (existente) {
      throw new Error(`Ya existe una mesa con el número ${numero}`);
    }

    return await prisma.mesa.create({
      data: {
        numero,
        capacidad,
        ubicacion: ubicacion || null,
        disponible: true,
      },
    });
  } catch (error) {
    console.error("Error al crear mesa:", error);
    throw error;
  }
}

export async function actualizarMesa(
  id: number,
  numero?: number,
  capacidad?: number,
  ubicacion?: string,
  disponible?: boolean
) {
  try {
    // Si se cambia el número, verificar que no exista otro con ese número
    if (numero !== undefined) {
      const existente = await prisma.mesa.findUnique({
        where: { numero },
      });

      if (existente && existente.id !== id) {
        throw new Error(`Ya existe otra mesa con el número ${numero}`);
      }
    }

    const data: any = {};
    if (numero !== undefined) data.numero = numero;
    if (capacidad !== undefined) data.capacidad = capacidad;
    if (ubicacion !== undefined) data.ubicacion = ubicacion || null;
    if (disponible !== undefined) data.disponible = disponible;

    return await prisma.mesa.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error al actualizar mesa:", error);
    throw error;
  }
}

export async function eliminarMesa(id: number) {
  try {
    return await prisma.mesa.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error al eliminar mesa:", error);
    throw new Error("Error al eliminar mesa");
  }
}

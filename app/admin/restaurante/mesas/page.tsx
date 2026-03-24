"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMesas, crearMesa, actualizarMesa, eliminarMesa } from "../actions";

interface Mesa {
  id: number;
  numero: number;
  capacidad: number;
  ubicacion: string | null;
  disponible: boolean;
  fechaCreacion: string | Date;
  fechaActualizacion?: string | Date;
}

export default function GestionMesasPage() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrando, setMostrando] = useState<"lista" | "crear" | "editar">("lista");
  const [mesaSeleccionada, setMesaSeleccionada] = useState<Mesa | null>(null);

  // Formulario
  const [numero, setNumero] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    try {
      setLoading(true);
      const data = await getMesas();
      setMesas(data);
    } catch (error) {
      console.error("Error al cargar mesas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async () => {
    if (!numero || !capacidad) {
      alert("Número y capacidad son requeridos");
      return;
    }

    try {
      await crearMesa(
        parseInt(numero),
        parseInt(capacidad),
        ubicacion || undefined
      );
      alert("Mesa creada exitosamente");
      setNumero("");
      setCapacidad("");
      setUbicacion("");
      setMostrando("lista");
      cargarMesas();
    } catch (error: any) {
      alert(error.message || "Error al crear mesa");
    }
  };

  const handleActualizar = async () => {
    if (!mesaSeleccionada || !numero || !capacidad) {
      alert("Todos los campos son requeridos");
      return;
    }

    try {
      await actualizarMesa(
        mesaSeleccionada.id,
        parseInt(numero),
        parseInt(capacidad),
        ubicacion || undefined
      );
      alert("Mesa actualizada exitosamente");
      setNumero("");
      setCapacidad("");
      setUbicacion("");
      setMesaSeleccionada(null);
      setMostrando("lista");
      cargarMesas();
    } catch (error: any) {
      alert(error.message || "Error al actualizar mesa");
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta mesa?")) {
      return;
    }

    try {
      await eliminarMesa(id);
      alert("Mesa eliminada exitosamente");
      cargarMesas();
    } catch (error) {
      alert("Error al eliminar mesa");
    }
  };

  const handleEditar = (mesa: Mesa) => {
    setMesaSeleccionada(mesa);
    setNumero(mesa.numero.toString());
    setCapacidad(mesa.capacidad.toString());
    setUbicacion(mesa.ubicacion || "");
    setMostrando("editar");
  };

  const handleCancelar = () => {
    setNumero("");
    setCapacidad("");
    setUbicacion("");
    setMesaSeleccionada(null);
    setMostrando("lista");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">🪑 Gestión de Mesas</h1>
          <p className="text-slate-400">Crea, edita y elimina las mesas del restaurante</p>
        </div>

        {mostrando === "lista" ? (
          <>
            {/* Botón crear */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setMostrando("crear");
                  setNumero("");
                  setCapacidad("");
                  setUbicacion("");
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                + Crear Nueva Mesa
              </button>
            </div>

            {/* Lista de mesas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mesas.map((mesa) => (
                <div
                  key={mesa.id}
                  className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-400">
                        Mesa {mesa.numero}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Capacidad: {mesa.capacidad} personas
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        mesa.disponible
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {mesa.disponible ? "Disponible" : "Ocupada"}
                    </span>
                  </div>

                  {mesa.ubicacion && (
                    <p className="text-slate-300 mb-4">📍 {mesa.ubicacion}</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditar(mesa)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(mesa.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {mesas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-4">No hay mesas creadas</p>
                <button
                  onClick={() => setMostrando("crear")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Crear la primera mesa
                </button>
              </div>
            )}
          </>
        ) : mostrando === "crear" ? (
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              ➕ Crear Nueva Mesa
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Número de Mesa *
                </label>
                <input
                  type="number"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Ej: 1"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Capacidad (personas) *
                </label>
                <input
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  placeholder="Ej: 4"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Ubicación (opcional)
                </label>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Ej: Terraza, Salón principal"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCrear}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded font-semibold transition"
                >
                  ✓ Crear Mesa
                </button>
                <button
                  onClick={handleCancelar}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-3 rounded font-semibold transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              ✏️ Editar Mesa {mesaSeleccionada?.numero}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Número de Mesa *
                </label>
                <input
                  type="number"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Capacidad (personas) *
                </label>
                <input
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Ubicación (opcional)
                </label>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleActualizar}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded font-semibold transition"
                >
                  ✓ Actualizar Mesa
                </button>
                <button
                  onClick={handleCancelar}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-3 rounded font-semibold transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";

export default function CocinaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">👨‍🍳 Pantalla KDS - Cocina</h1>
          <p className="text-slate-400">Sistema de Gestión de Cocina (Kitchen Display System)</p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pedidos Activos */}
          <Link href="/cocina/activos" className="group">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-red-500 transition-all h-full">
              <div className="text-4xl mb-3">🔴</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-red-400">Pedidos Activos</h2>
              <p className="text-slate-400 text-sm mb-4">
                Visualiza todos los pedidos pendientes de preparar
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition">
                Ver Pedidos →
              </button>
            </div>
          </Link>

          {/* En Preparación */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-yellow-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">🟡</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400">En Preparación</h2>
              <p className="text-slate-400 text-sm mb-4">
                Pedidos que están siendo preparados actualmente
              </p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Preparación →
              </button>
            </div>
          </div>

          {/* Listos para Servir */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-green-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">🟢</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-400">Listos para Servir</h2>
              <p className="text-slate-400 text-sm mb-4">
                Pedidos completados y listos para entregar
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Listos →
              </button>
            </div>
          </div>

          {/* Recetas */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">📖</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400">Recetas</h2>
              <p className="text-slate-400 text-sm mb-4">
                Consulta recetas e ingredientes de los productos
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Recetas →
              </button>
            </div>
          </div>

          {/* Inventario */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-purple-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">📦</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400">Inventario</h2>
              <p className="text-slate-400 text-sm mb-4">
                Verifica disponibilidad de insumos en cocina
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Insumos →
              </button>
            </div>
          </div>

          {/* Avisos Especiales */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-orange-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">⚠️</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400">Avisos Especiales</h2>
              <p className="text-slate-400 text-sm mb-4">
                Órdenes especiales y alergias de clientes
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Avisos →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

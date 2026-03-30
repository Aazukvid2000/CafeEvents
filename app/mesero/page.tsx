import Link from "next/link";

export default function MeseroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">👨‍💼 App de Mesero</h1>
          <p className="text-slate-400">Sistema de toma de pedidos</p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Tomar Nuevo Pedido */}
          <Link href="/mesero/mesas" className="group">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-green-500 transition-all h-full">
              <div className="text-4xl mb-3">📝</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-400">Nuevo Pedido</h2>
              <p className="text-slate-400 text-sm mb-4">
                Registra nuevos pedidos y agrega productos al carrito
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition">
                Seleccionar Mesa →
              </button>
            </div>
          </Link>

          {/* Mis Pedidos */}
          <Link href="/mesero/mis-pedidos" className="group">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-all h-full">
              <div className="text-4xl mb-3">📋</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400">Mis Pedidos</h2>
              <p className="text-slate-400 text-sm mb-4">
                Gestiona los pedidos que has registrado hoy
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition">
                Ver Historial →
              </button>
            </div>
          </Link>

          {/* Menú Disponible */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-purple-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">🍽️</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400">Menú Disponible</h2>
              <p className="text-slate-400 text-sm mb-4">
                Consulta todos los productos disponibles del restaurante
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Menú →
              </button>
            </div>
          </div>

          {/* Cuentas Pendientes */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-red-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">💰</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-red-400">Cuentas Pendientes</h2>
              <p className="text-slate-400 text-sm mb-4">
                Visualiza las cuentas listas para cobrar
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Cuentas →
              </button>
            </div>
          </div>

          {/* Mi Desempeño */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">📊</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400">Mi Desempeño</h2>
              <p className="text-slate-400 text-sm mb-4">
                Consulta tus ventas y comisiones del día
              </p>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Reportes →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

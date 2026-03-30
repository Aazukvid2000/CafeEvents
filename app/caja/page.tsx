import Link from "next/link";

export default function CajaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">💳 Punto de Venta - Caja</h1>
          <p className="text-slate-400">Sistema de Cobro y Gestión de Pagos</p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Cuentas Pendientes */}
          <Link href="/caja/cuentas-pendientes" className="group">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-green-500 transition-all h-full">
              <div className="text-4xl mb-3">💰</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-green-400">Cuentas Pendientes</h2>
              <p className="text-slate-400 text-sm mb-4">
                Lista de cuentas listas para cobrar
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition">
                Procesar Cobro →
              </button>
            </div>
          </Link>

          {/* Procesar Pago */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">💳</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400">Procesar Pago</h2>
              <p className="text-slate-400 text-sm mb-4">
                Registra pagos en efectivo, tarjeta o transferencia
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Nuevo Pago →
              </button>
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-yellow-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">💵</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400">Métodos de Pago</h2>
              <p className="text-slate-400 text-sm mb-4">
                Gestiona métodos de pago disponibles (Efectivo, Tarjeta, etc.)
              </p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Configurar →
              </button>
            </div>
          </div>

          {/* Cierre de Caja */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-red-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">🔒</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-red-400">Cierre de Caja</h2>
              <p className="text-slate-400 text-sm mb-4">
                Realiza el cierre y arqueo de caja al final del día
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Cerrar Caja →
              </button>
            </div>
          </div>

          {/* Historial */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-purple-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">📋</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400">Historial</h2>
              <p className="text-slate-400 text-sm mb-4">
                Consulta el historial de pagos y transacciones del día
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Historial →
              </button>
            </div>
          </div>

          {/* Reporte de Ventas */}
          <div className="group cursor-not-allowed">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all h-full opacity-60">
              <div className="text-4xl mb-3">📊</div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400">Reporte de Ventas</h2>
              <p className="text-slate-400 text-sm mb-4">
                Visualiza reportes de ventas y comisiones del día
              </p>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm transition" disabled>
                Ver Reporte →
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">⚙️ Panel de Administración</h1>
          <p className="text-slate-400">Gestión integral del restaurante y eventos</p>
        </div>

        {/* Módulo: Gestión de Usuarios */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">👥 Gestión de Usuarios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-all">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="text-sm font-bold text-white mb-2">Usuarios</h3>
              <p className="text-slate-400 text-xs mb-3">Crear, editar o eliminar usuarios</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition">
                Gestionar
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-green-500 transition-all">
              <div className="text-3xl mb-2">🎭</div>
              <h3 className="text-sm font-bold text-white mb-2">Roles y Permisos</h3>
              <p className="text-slate-400 text-xs mb-3">Configurar roles y accesos</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">
                Configurar
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition-all">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="text-sm font-bold text-white mb-2">Registro de Actividad</h3>
              <p className="text-slate-400 text-xs mb-3">Log de auditoría del sistema</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Log
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-red-500 transition-all">
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="text-sm font-bold text-white mb-2">Seguridad</h3>
              <p className="text-slate-400 text-xs mb-3">Gestionar seguridad del sistema</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition">
                Configurar
              </button>
            </div>

          </div>
        </div>

        {/* Módulo: Gestión de Restaurante */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">🍽️ Gestión de Restaurante</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-amber-500 transition-all">
              <div className="text-3xl mb-2">🪑</div>
              <h3 className="text-sm font-bold text-white mb-2">Mesas</h3>
              <p className="text-slate-400 text-xs mb-3">Crear y gestionar mesas</p>
              <Link href="/admin/restaurante/mesas">
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-xs transition">
                  Gestionar
                </button>
              </Link>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-orange-500 transition-all">
              <div className="text-3xl mb-2">🍽️</div>
              <h3 className="text-sm font-bold text-white mb-2">Productos</h3>
              <p className="text-slate-400 text-xs mb-3">CRUD de productos y menú</p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs transition">
                Gestionar
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all">
              <div className="text-3xl mb-2">📖</div>
              <h3 className="text-sm font-bold text-white mb-2">Recetas</h3>
              <p className="text-slate-400 text-xs mb-3">Gestionar recetas e ingredientes</p>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-xs transition">
                Gestionar
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-pink-500 transition-all">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="text-sm font-bold text-white mb-2">Pedidos</h3>
              <p className="text-slate-400 text-xs mb-3">Historial y gestión de pedidos</p>
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Pedidos
              </button>
            </div>

          </div>
        </div>

        {/* Módulo: Gestión de Eventos */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">🎉 Gestión de Eventos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-teal-500 transition-all">
              <div className="text-3xl mb-2">🏛️</div>
              <h3 className="text-sm font-bold text-white mb-2">Salones</h3>
              <p className="text-slate-400 text-xs mb-3">Gestionar salones de eventos</p>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs transition">
                Gestionar
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-indigo-500 transition-all">
              <div className="text-3xl mb-2">🎊</div>
              <h3 className="text-sm font-bold text-white mb-2">Eventos</h3>
              <p className="text-slate-400 text-xs mb-3">Crear y editar eventos</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs transition">
                Gestionar
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-all">
              <div className="text-3xl mb-2">📜</div>
              <h3 className="text-sm font-bold text-white mb-2">Cotizaciones</h3>
              <p className="text-slate-400 text-xs mb-3">Gestionar cotizaciones de eventos</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Cotizaciones
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-green-500 transition-all">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-sm font-bold text-white mb-2">Reservaciones</h3>
              <p className="text-slate-400 text-xs mb-3">Gestionar reservaciones</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Reservaciones
              </button>
            </div>

          </div>
        </div>

        {/* Módulo: Inventario */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">📦 Gestión de Inventario</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-yellow-500 transition-all">
              <div className="text-3xl mb-2">📦</div>
              <h3 className="text-sm font-bold text-white mb-2">Insumos</h3>
              <p className="text-slate-400 text-xs mb-3">Gestionar inventario de insumos</p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs transition">
                Gestionar
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-orange-500 transition-all">
              <div className="text-3xl mb-2">🛒</div>
              <h3 className="text-sm font-bold text-white mb-2">Compras</h3>
              <p className="text-slate-400 text-xs mb-3">Registrar compras de insumos</p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs transition">
                Nueva Compra
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-red-500 transition-all">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="text-sm font-bold text-white mb-2">Stock Bajo</h3>
              <p className="text-slate-400 text-xs mb-3">Alertas de stock mínimo</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Alertas
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 transition-all">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-sm font-bold text-white mb-2">Reportes</h3>
              <p className="text-slate-400 text-xs mb-3">Reportes de inventario</p>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Reportes
              </button>
            </div>

          </div>
        </div>

        {/* Módulo: Reportes y Análisis */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">📈 Reportes y Análisis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-green-500 transition-all">
              <div className="text-3xl mb-2">💹</div>
              <h3 className="text-sm font-bold text-white mb-2">Ventas</h3>
              <p className="text-slate-400 text-xs mb-3">Reporte de ventas del período</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Reporte
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-all">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-sm font-bold text-white mb-2">Finanzas</h3>
              <p className="text-slate-400 text-xs mb-3">Análisis financiero del negocio</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Análisis
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-purple-500 transition-all">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="text-sm font-bold text-white mb-2">Clientes</h3>
              <p className="text-slate-400 text-xs mb-3">Estadísticas de clientes</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs transition">
                Ver Estadísticas
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

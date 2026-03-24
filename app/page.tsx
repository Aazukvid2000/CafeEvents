import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ☕ Sistema Café Events
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Gestión integral de restaurante y reservaciones de salones de eventos
          </p>
          <p className="text-slate-400">
            Selecciona tu módulo de trabajo
          </p>
        </div>

        {/* Main Navigation - Worker Roles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Mesero */}
          <Link href="/mesero" className="group">
            <div className="bg-gradient-to-br from-amber-900 to-amber-950 p-8 rounded-lg border border-amber-700 hover:border-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer h-full">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition">
                Mesero
              </h2>
              <p className="text-amber-100 text-sm">
                Toma de pedidos y gestión de mesas
              </p>
              <div className="mt-4 pt-4 border-t border-amber-700">
                <p className="text-amber-200 text-xs">📋 Pedidos | 🪑 Mesas | 💰 Cuentas</p>
              </div>
            </div>
          </Link>

          {/* Chef - Cocina */}
          <Link href="/cocina" className="group">
            <div className="bg-gradient-to-br from-red-900 to-red-950 p-8 rounded-lg border border-red-700 hover:border-red-400 transition-all hover:shadow-lg hover:shadow-red-500/20 cursor-pointer h-full">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-red-300 transition">
                Cocina (KDS)
              </h2>
              <p className="text-red-100 text-sm">
                Kitchen Display System - Gestión de preparación
              </p>
              <div className="mt-4 pt-4 border-t border-red-700">
                <p className="text-red-200 text-xs">🔴 Activos | 🟡 Preparando | 🟢 Listos</p>
              </div>
            </div>
          </Link>

          {/* Cajero */}
          <Link href="/caja" className="group">
            <div className="bg-gradient-to-br from-green-900 to-green-950 p-8 rounded-lg border border-green-700 hover:border-green-400 transition-all hover:shadow-lg hover:shadow-green-500/20 cursor-pointer h-full">
              <div className="text-5xl mb-4">💳</div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition">
                Caja (POS)
              </h2>
              <p className="text-green-100 text-sm">
                Punto de Venta - Cobro y gestión de pagos
              </p>
              <div className="mt-4 pt-4 border-t border-green-700">
                <p className="text-green-200 text-xs">💰 Pagos | 📊 Reportes | 🔒 Cierre</p>
              </div>
            </div>
          </Link>

          {/* Administrador */}
          <Link href="/admin" className="group">
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-8 rounded-lg border border-blue-700 hover:border-blue-400 transition-all hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer h-full">
              <div className="text-5xl mb-4">⚙️</div>
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition">
                Administración
              </h2>
              <p className="text-blue-100 text-sm">
                Panel de control - Gestión integral del sistema
              </p>
              <div className="mt-4 pt-4 border-t border-blue-700">
                <p className="text-blue-200 text-xs">👥 Usuarios | 📦 Inventario | 🎉 Eventos</p>
              </div>
            </div>
          </Link>

        </div>

        {/* Information Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          {/* Módulos del Sistema */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">🏢 Módulos del Sistema</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-400">▸</span>
                Restaurante (Mesas, Pedidos, Productos)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">▸</span>
                Eventos (Salones, Cotizaciones, Reservaciones)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">▸</span>
                Inventario (Insumos, Compras, Recetas)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">▸</span>
                Punto de Venta y Pagos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">▸</span>
                Auditoría y Seguridad
              </li>
            </ul>
          </div>

          {/* Roles de Usuarios */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">👥 Roles del Sistema</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-amber-400">▸</span>
                Mesero
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">▸</span>
                Chef
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">▸</span>
                Cajero
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">▸</span>
                Administrador
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">▸</span>
                Gerente / Contador / Cliente
              </li>
            </ul>
          </div>

          {/* Tecnología */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">🛠️ Stack Tecnológico</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                Next.js 16 (App Router)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                Prisma ORM
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                MySQL Database
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                Tailwind CSS
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm pt-8 border-t border-slate-700">
          <p>Sistema Café Events • Gestión integral para restaurantes y eventos</p>
          <p className="mt-2 text-slate-600">© 2026 - Todos los derechos reservados</p>
        </div>

      </div>
    </div>
  );
}

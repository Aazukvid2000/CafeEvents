'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Clock4, Armchair, Timer, Bell,
  LogOut, UtensilsCrossed, Search, ArrowLeft,
  UserCircle2, ShoppingBag, LayoutDashboard, Wallet, Utensils, CalendarDays, ClipboardList,
  AlertTriangle, CheckCircle
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentView = searchParams.get('view');

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchId, setSearchId] = useState('');

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // DETECCIÓN DINÁMICA DEL ROL
  const userRole = pathname.includes('/dashboard/cajero') 
    ? 'cajero' 
    : pathname.includes('/dashboard/chef') 
      ? 'chef' 
      : 'mesero';

  const isCajero = userRole === 'cajero';
  const isChef = userRole === 'chef';

  // NOTIFICACIONES SEGÚN ROL
  const notificationsByRole = {
    mesero: [
      { id: 1, mesa: 'Mesa 4', text: 'Pedido #1204 listo.', icon: UtensilsCrossed, color: 'text-blue-600' },
    ],
    chef: [
      { id: 1, mesa: 'Inventario', text: 'Stock bajo en Salmón Ahumado.', icon: AlertTriangle, color: 'text-amber-600' },
      { id: 2, mesa: 'Propuesta #42', text: 'Receta autorizada por Admin.', icon: CheckCircle, color: 'text-emerald-600' },
    ],
    cajero: [] // El cajero no tiene notificaciones según requerimiento previo
  };

  const notifications = notificationsByRole[userRole] || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    router.push(`/dashboard/${userRole}?view=pedido&pedidoId=${searchId}`);
    setSearchId('');
    setIsMobileSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuConfig = {
    mesero: [
      { name: 'Mi Turno', href: '/dashboard/mesero?view=turno', icon: Clock4, viewKey: 'turno' },
      { name: 'Servicio', href: '/dashboard/mesero?view=mapa', icon: Armchair, viewKey: 'mapa' },
      { name: 'En Espera', href: '/dashboard/mesero?view=espera', icon: Timer, viewKey: 'espera' },
    ],
    cajero: [
      { name: 'Ventas', href: '/dashboard/cajero?view=ventas', icon: LayoutDashboard, viewKey: 'ventas' },
      { name: 'Mesas Activas', href: '/dashboard/cajero?view=mesas', icon: Utensils, viewKey: 'mesas' },
      { name: 'Pedidos para Llevar', href: '/dashboard/cajero?view=llevar', icon: ShoppingBag, viewKey: 'llevar' },
      { name: 'Corte de Caja', href: '/dashboard/cajero?view=corte', icon: Wallet, viewKey: 'corte' },
    ],
    chef: [
      { name: 'Panel de Control', href: '/dashboard/chef?view=resumen', icon: LayoutDashboard, viewKey: 'resumen' },
      { name: 'Catálogo de Recetas', href: '/dashboard/chef?view=recetas', icon: UtensilsCrossed, viewKey: 'recetas' },
      { name: 'Menús de Eventos', href: '/dashboard/chef?view=eventos', icon: CalendarDays, viewKey: 'eventos' },
      { name: 'Mis Propuestas', href: '/dashboard/chef?view=propuestas', icon: ClipboardList, viewKey: 'propuestas' }
    ]
  };

  const currentMenu = menuConfig[userRole] || [];
  const isPedidoView = currentView === 'pedido';

  return (
    <div className="min-h-screen bg-[#fcf9f4] flex flex-col selection:bg-[#d3e8d5]">

      {/* TopNavBar */}
      <nav className={`fixed top-0 w-full z-50 bg-[#fcf9f4]/70 backdrop-blur-xl border-b border-[#334537]/5 transition-all ${isPedidoView ? 'h-0 overflow-hidden lg:h-20' : 'h-16 lg:h-20'}`}>
        <div className="flex justify-between items-center px-4 lg:px-8 h-full w-full max-w-screen-2xl mx-auto">

          {isMobileSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center w-full gap-3 animate-in slide-in-from-top-2 duration-200">
              <button type="button" onClick={() => setIsMobileSearchOpen(false)} className="text-[#334537]">
                <ArrowLeft size={20} />
              </button>
              <div className="relative flex-1">
                <input
                  autoFocus
                  type="text"
                  placeholder="BUSCAR PEDIDO O RECETA..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full bg-[#334537]/5 border-none rounded-full py-2 px-4 text-sm font-body text-[#334537] focus:ring-2 focus:ring-[#334537]/10 placeholder:text-[#334537]/20 transition-all uppercase tracking-widest"
                />
              </div>
              <button type="submit" className="bg-[#334537] text-white p-2 rounded-full">
                <Search size={18} />
              </button>
            </form>
          ) : (
            <>
              <div className="flex items-center gap-4 lg:gap-8 flex-1">
                <h1 className="font-headline text-xl lg:text-2xl italic text-[#334537] flex-shrink-0">Café Events</h1>

                <form onSubmit={handleSearch} className="hidden md:flex relative items-center w-full max-w-xs group">
                  <Search className="absolute left-4 text-[#334537]/30 group-focus-within:text-[#334537] transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder={isChef ? "BUSCAR RECETA..." : "ID DE PEDIDO..."}
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full bg-[#334537]/5 border-none rounded-full py-2 pl-11 pr-4 text-xs font-body text-[#334537] focus:ring-2 focus:ring-[#334537]/10 placeholder:text-[#334537]/20 transition-all uppercase tracking-widest"
                  />
                </form>
              </div>

              <div className="flex items-center gap-1 lg:gap-6">
                <button onClick={() => setIsMobileSearchOpen(true)} className="md:hidden p-2 text-[#334537]/60">
                  <Search size={20} />
                </button>

                {/* Notificaciones (Solo si no es cajero y hay notificaciones) */}
                {!isCajero && (
                  <div className="relative" ref={notificationsRef}>
                    <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className={`p-2 rounded-full transition-all relative ${isNotificationsOpen ? 'bg-[#334537] text-white' : 'text-[#334537]/60'}`}>
                      <Bell size={20} />
                      {notifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-[#fcf9f4]" />}
                    </button>

                    {isNotificationsOpen && (
                      <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-[#334537]/10 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-5 py-4 bg-[#fcf9f4] border-b border-[#334537]/5 flex justify-between items-center">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#334537]">Avisos del Sistema</h3>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((n) => (
                              <button key={n.id} className="w-full p-4 flex items-start gap-4 border-b border-[#f6f3ee] hover:bg-[#fcf9f4] transition-all text-left">
                                <div className={`mt-1 p-2 rounded-lg bg-[#f6f3ee] ${n.color}`}><n.icon size={16} /></div>
                                <div className="flex-1">
                                  <p className="font-headline text-base italic text-[#334537]">{n.mesa}</p>
                                  <p className="text-xs text-[#434843]">{n.text}</p>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="p-8 text-center text-xs italic text-[#434843]/50">No hay avisos nuevos</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Perfil */}
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 group outline-none">
                    <div className={`h-9 w-9 lg:h-10 lg:w-10 rounded-full flex items-center justify-center border transition-all shadow-sm
                      ${isProfileOpen
                        ? 'bg-[#334537] border-[#334537] text-white'
                        : 'bg-[#f6f3ee] border-[#334537]/10 text-[#334537]/60 group-hover:border-[#334537]/30 group-hover:text-[#334537]'
                      }`}>
                      <UserCircle2 size={24} strokeWidth={1.5} />
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-[#334537]/10 shadow-2xl rounded-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-[#f6f3ee] mb-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#334537]/40 leading-none mb-1">
                          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Activo
                        </p>
                        <p className="font-headline text-base italic text-[#334537]">
                          {isChef ? 'Chef Ejecutivo' : isCajero ? 'Caja Central' : 'Pedro Pascal'}
                        </p>
                      </div>
                      <button onClick={() => router.push('/login')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#ba1a1a] hover:bg-[#ba1a1a]/5 rounded-xl transition-all font-bold">
                        <LogOut size={16} />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      <div className="flex flex-1 pt-16 lg:pt-20 pb-20 lg:pb-0">
        <aside className="hidden lg:flex flex-col h-[calc(100vh-5rem)] sticky top-20 py-8 w-72 bg-[#fcf9f4] border-r border-[#c3c8c1]/20">

          <div className="px-8 mb-8">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a3d2e]/30">
                Acceso Autorizado
              </p>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full animate-pulse ${isChef ? 'bg-emerald-600' : isCajero ? 'bg-[#C5A059]' : 'bg-[#1a3d2e]'}`} />
                <span className={`font-label text-[11px] font-black uppercase tracking-[0.15em] 
                  ${isChef ? 'text-emerald-800' : isCajero ? 'text-[#C5A059]' : 'text-[#1a3d2e]'}`}>
                  Módulo {userRole}
                </span>
              </div>
              <div className="h-[1px] w-12 bg-[#1a3d2e]/10 mt-2" />
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {currentMenu.map((item) => {
              const defaultViews = { chef: 'resumen', cajero: 'ventas', mesero: 'mapa' };
              const isActive = currentView === item.viewKey || (!currentView && item.viewKey === defaultViews[userRole]);
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href}
                  className={`flex items-center gap-4 py-3.5 px-8 transition-all ${isActive ? "text-[#334537] font-bold border-l-4 border-[#334537] bg-[#f6f3ee]" : "text-[#4a5d4e]/70 hover:text-[#334537]"}`}
                >
                  <Icon size={18} />
                  <span className="font-body text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className={`flex-1 transition-all ${isPedidoView ? 'px-0 py-0' : 'px-4 lg:px-8 py-8 lg:py-12'} max-w-7xl mx-auto w-full`}>
          {children}
        </main>

        {!isPedidoView && (
          <nav className="lg:hidden fixed bottom-0 w-full bg-white border-t border-[#334537]/10 px-6 h-16 flex items-center justify-around z-50">
            {currentMenu.map((item) => {
              const defaultViews = { chef: 'resumen', cajero: 'ventas', mesero: 'mapa' };
              const isActive = currentView === item.viewKey || (!currentView && item.viewKey === defaultViews[userRole]);
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href} className={`flex flex-col items-center gap-1 ${isActive ? "text-[#334537]" : "text-[#4a5d4e]/40"}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
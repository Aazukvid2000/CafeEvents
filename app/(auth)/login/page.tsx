'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  // Simulación de Login para pruebas
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Lógica simple de redirección por texto para tu compañero
    if (email.includes('admin')) router.push('/dashboard/admin');
    else if (email.includes('cajero')) router.push('/dashboard/cajero');
    else router.push('/dashboard/mesero');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f4] text-[#1c1c19] font-sans selection:bg-[#4a5d4e]/20">
      <main className="flex-grow flex flex-col md:flex-row min-h-screen overflow-hidden">

        {/* Columna Visual Editorial (Izquierda) */}
        <section className="hidden md:flex md:w-7/12 relative overflow-hidden bg-[#334537]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/ui/login.jpg"
              alt="Interior de lujo de Café Events"
              fill
              className="object-cover opacity-50 scale-105"
              priority
            />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
            <div>
              <Link href="/" className="group inline-block">
                <h1 className="font-serif italic text-6xl tracking-wider leading-tight transition-opacity group-hover:opacity-80">
                  Café Events
                </h1>
              </Link>
              <p className="font-serif text-2xl mt-4 opacity-80 tracking-wide">
                Donde el servicio se convierte en arte.
              </p>
            </div>

            <div className="space-y-12">
              <div className="max-w-md">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-6 block font-bold">
                  Personal Autorizado
                </span>
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  {[
                    { role: 'Gerente', area: 'Operaciones' },
                    { role: 'Chef', area: 'Culinaria' },
                    { role: 'Mesero', area: 'Servicio' },
                    { role: 'Cajero', area: 'Transacciones' },
                    { role: 'Contador', area: 'Finanzas' },
                    { role: 'Admin', area: 'Sistemas' },
                  ].map((item) => (
                    <div key={item.role} className="group cursor-default">
                      <span className="font-serif text-2xl italic block group-hover:translate-x-1 transition-transform duration-300">
                        {item.role}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">
                        {item.area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="pt-8 border-t border-white/10">
                <p className="text-[10px] tracking-tighter opacity-50 uppercase font-bold">
                  © 2026 Café Events. Acceso restringido a colaboradores.
                </p>
              </footer>
            </div>
          </div>
        </section>

        {/* Columna del Formulario (Derecha) */}
        <section className="flex-grow flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#fcf9f4]">
          <div className="w-full max-w-md space-y-10">

            <div className="text-center md:text-left space-y-2">
              <div className="md:hidden mb-8">
                <h1 className="font-serif italic text-4xl text-[#334537] tracking-wider">Café Events</h1>
              </div>
              <h2 className="font-serif text-4xl text-[#1c1c19] tracking-tight">Portal de Staff</h2>
              <p className="text-[#5f5e5e] leading-relaxed text-sm">
                Por favor, identifícate para acceder a tu espacio de trabajo y agenda.
              </p>
            </div>

            <div className="bg-[#f6f3ee] rounded-[2rem] p-8 md:p-10 shadow-sm border border-[#e5e2dd]/50 space-y-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email de Empleado */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#5f5e5e] px-1 uppercase tracking-wider" htmlFor="email">
                    Correo Institucional
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@cafeevents.com"
                    className="w-full bg-white border-none rounded-xl px-6 py-4 text-[#1c1c19] focus:ring-2 focus:ring-[#334537] transition-all duration-300 placeholder:opacity-30 outline-none shadow-inner"
                  />
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-[#5f5e5e] uppercase tracking-wider" htmlFor="password">
                      Clave de Acceso
                    </label>
                    <a href="#" className="text-[10px] font-bold text-[#563d00] hover:underline underline-offset-4">
                      ¿Olvidaste tu clave?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      className="w-full bg-white border-none rounded-xl px-6 py-4 text-[#1c1c19] focus:ring-2 focus:ring-[#334537] transition-all duration-300 placeholder:opacity-30 outline-none shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5f5e5e]/40 hover:text-[#334537] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#4a5d4e] text-white font-bold py-5 rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-500 ease-in-out uppercase text-xs tracking-widest"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>

              {/* Pie del Formulario */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#c3c8c1]/30"></div>
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em]">
                  <span className="bg-[#f6f3ee] px-4 text-[#5f5e5e]/40">Entrada Segura</span>
                </div>
              </div>

              <div className="flex items-start justify-center gap-3 text-[#5f5e5e]/60">
                <Lock size={16} className="mt-0.5" />
                <p className="text-[10px] leading-tight font-medium">
                  Este es un sistema privado. El acceso no autorizado está prohibido y es monitoreado continuamente.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
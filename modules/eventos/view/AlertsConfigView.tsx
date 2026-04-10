'use client';

import React, { useState } from 'react';
import { 
  Bell, BellRing, Settings2, Save, Mail, 
  MessageSquare, History, ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

// Tipos basados en el Flujo Normal (Paso 2)
type AlertType = 'VENTAS_BAJAS' | 'INVENTARIO_CRITICO' | 'DIFERENCIA_CAJA' | 'EVENTOS_SIN_MENU';

interface AlertConfig {
  id: AlertType;
  label: string;
  description: string;
  isActive: boolean;
  threshold: number;
  frequency: string;
  method: 'EMAIL' | 'SMS' | 'PUSH';
}

export const AlertsConfigView = () => {
  const [alerts, setAlerts] = useState<AlertConfig[]>([
    { id: 'VENTAS_BAJAS', label: 'Ventas por debajo de umbral', description: 'Notificar si las ventas diarias no alcanzan el mínimo.', isActive: true, threshold: 3000, frequency: 'Diaria (20:00 hrs)', method: 'EMAIL' },
    { id: 'INVENTARIO_CRITICO', label: 'Inventario Crítico', description: 'Alerta cuando insumos clave lleguen al 10%.', isActive: false, threshold: 10, frequency: 'Inmediata', method: 'PUSH' },
    { id: 'DIFERENCIA_CAJA', label: 'Diferencias en Corte', description: 'Notificar descuadres mayores a $50 en caja.', isActive: true, threshold: 50, frequency: 'Al cerrar turno', method: 'EMAIL' },
    { id: 'EVENTOS_SIN_MENU', label: 'Eventos próximos sin menú', description: 'Alertar 7 días antes si no hay platillos seleccionados.', isActive: false, threshold: 7, frequency: 'Semanal', method: 'EMAIL' },
  ]);

  const [selectedAlert, setSelectedAlert] = useState<AlertConfig | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Paso 6: Guardar configuración
  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setSelectedAlert(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#334537]/5 pb-8">
        <div>
          <span className="label-caps text-[#C5A059] mb-2 block uppercase tracking-widest text-[10px] font-black italic">Administración Proactiva</span>
          <h1 className="serif-display text-5xl md:text-6xl text-[#1a3d2e]">Configurar Alertas</h1>
        </div>
        <div className="flex items-center gap-3 bg-[#d3e8d5] px-6 py-3 rounded-full border border-[#1a3d2e]/10">
          <ShieldCheck size={18} className="text-[#1a3d2e]" />
          <span className="text-[10px] font-black uppercase text-[#1a3d2e]">Modo Gerente General Activo (RN-01)</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LISTADO DE ALERTAS PREDEFINIDAS (Paso 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-6 opacity-40">
            <Bell size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Alertas Disponibles</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {alerts.map((alert) => (
              <button
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`flex items-center justify-between p-8 rounded-[2.5rem] border-2 transition-all text-left group
                  ${selectedAlert?.id === alert.id ? 'border-[#1a3d2e] bg-white shadow-xl' : 'border-transparent bg-white hover:border-[#1a3d2e]/20'}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${alert.isActive ? 'bg-[#1a3d2e] text-white' : 'bg-[#f6f3ee] text-[#1a3d2e]/20'}`}>
                    {alert.isActive ? <BellRing size={24} /> : <Bell size={24} />}
                  </div>
                  <div>
                    <h4 className="font-headline text-2xl italic text-[#1a3d2e]">{alert.label}</h4>
                    <p className="text-xs text-[#434843]/60 italic">{alert.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${alert.isActive ? 'bg-[#d3e8d5]' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${alert.isActive ? 'left-7 bg-[#1a3d2e]' : 'left-1 bg-white'}`} />
                  </div>
                  <Settings2 size={18} className="text-[#1a3d2e]/20 group-hover:text-[#1a3d2e]" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* PANEL DE CONFIGURACIÓN (Pasos 4 y 5) */}
        <aside className="lg:col-span-1">
          {selectedAlert ? (
            <div className="bg-[#1a3d2e] text-white p-10 rounded-[3rem] shadow-2xl space-y-10 sticky top-24 animate-in slide-in-from-right duration-500">
              <div className="space-y-2">
                <h3 className="font-headline text-3xl italic text-[#C5A059]">Configurar</h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{selectedAlert.label}</p>
              </div>

              <div className="space-y-6">
                {/* Umbral (Paso 4) */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-50">Umbral Mínimo / Valor</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">$</span>
                    <input 
                      type="number" 
                      defaultValue={selectedAlert.threshold}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-10 text-xl font-headline outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                </div>

                {/* Medio de Notificación (Paso 4) */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-50">Medio de Notificación</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="p-3 bg-white/10 rounded-xl flex flex-col items-center gap-2 border border-[#C5A059]">
                      <Mail size={16} className="text-[#C5A059]" />
                      <span className="text-[8px] font-black">EMAIL</span>
                    </button>
                    <button className="p-3 bg-white/5 rounded-xl flex flex-col items-center gap-2 opacity-40">
                      <MessageSquare size={16} />
                      <span className="text-[8px] font-black">SMS</span>
                    </button>
                    <button className="p-3 bg-white/5 rounded-xl flex flex-col items-center gap-2 opacity-40">
                      <Bell size={16} />
                      <span className="text-[8px] font-black">PUSH</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <button 
                  onClick={handleSave}
                  className="w-full py-5 bg-[#C5A059] text-[#1a3d2e] rounded-full font-label text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#d4b57a] transition-all flex items-center justify-center gap-3"
                >
                  <Save size={18} /> Guardar Alerta
                </button>
                <button onClick={() => setSelectedAlert(null)} className="text-[9px] font-black uppercase tracking-widest opacity-40 text-center">Descartar</button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-[#1a3d2e]/10 rounded-[3rem] flex flex-col items-center justify-center p-10 text-center space-y-4">
              <div className="w-16 h-16 bg-[#f6f3ee] rounded-full flex items-center justify-center text-[#1a3d2e]/20">
                <Settings2 size={32} />
              </div>
              <p className="text-xs text-[#434843]/40 italic leading-relaxed">Seleccione una alerta de la lista para configurar sus umbrales y medios de aviso.</p>
            </div>
          )}
        </aside>
      </div>

      {/* HISTORIAL DE ACTIVACIONES (RN-02) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 opacity-40">
          <History size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Historial de Activaciones Proactivas (Auditoría)</span>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-[#1a3d2e]/5 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#fcf9f4] text-[8px] font-black uppercase tracking-widest text-[#434843]/40">
                <th className="px-8 py-4">Evento / Alerta</th>
                <th className="px-8 py-4">Fecha y Hora</th>
                <th className="px-8 py-4">Valor Detectado</th>
                <th className="px-8 py-4">Estatus Aviso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3d2e]/5 italic">
              <tr className="hover:bg-[#f6f3ee]/30 transition-colors">
                <td className="px-8 py-4 font-bold text-[#1a3d2e]">Ventas por debajo de umbral</td>
                <td className="px-8 py-4 text-xs">2026-04-03 20:00:12</td>
                <td className="px-8 py-4 text-[#ba1a1a] font-black">$2,450.00</td>
                <td className="px-8 py-4"><span className="text-[8px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-black uppercase">Enviado vía Email</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FEEDBACK DE ÉXITO (Paso 9) */}
      {showSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom duration-500">
          <div className="bg-[#1a3d2e] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="w-8 h-8 bg-[#C5A059] rounded-full flex items-center justify-center text-[#1a3d2e]">
              <CheckCircle2 size={18} />
            </div>
            <div className="pr-4">
              <p className="text-[10px] font-black uppercase tracking-widest">Configuración Guardada</p>
              <p className="text-[9px] opacity-60">La alerta comenzará a monitorear en el próximo ciclo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
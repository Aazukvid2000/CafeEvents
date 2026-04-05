'use client';
import React from 'react';
import { Utensils, Landmark, Users } from 'lucide-react';
import { VenueType } from '../types/gerente';

const VENUE_LIMITS = {
  CAFETERIA: { min: 20, max: 50, label: 'Salón Cafetería' },
  SALON_EVENTOS: { min: 100, max: 250, label: 'Salón de Eventos' }
};

interface VenueSelectorProps {
  selected: VenueType;
  pax: number;
  onSelect: (v: VenueType) => void;
  onPaxChange: (p: number) => void;
}

export const VenueSelector = ({ selected, pax, onSelect, onPaxChange }: VenueSelectorProps) => {
  const currentLimit = VENUE_LIMITS[selected];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        {(['CAFETERIA', 'SALON_EVENTOS'] as VenueType[]).map((v) => (
          <button
            key={v}
            onClick={() => onSelect(v)}
            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col gap-4 text-left ${
              selected === v ? 'border-[#1a3d2e] bg-[#f6f3ee]' : 'border-[#f0ede8] bg-white'
            }`}
          >
            <div className={`p-3 rounded-xl w-fit ${selected === v ? 'bg-[#1a3d2e] text-white' : 'bg-[#f6f3ee] text-[#1a3d2e]'}`}>
              {v === 'CAFETERIA' ? <Utensils size={20} /> : <Landmark size={20} />}
            </div>
            <div>
              <p className="font-headline italic text-lg text-[#1a3d2e]">{VENUE_LIMITS[v].label} </p>
              <p className="text-[9px] uppercase font-bold text-[#434843]/40 tracking-widest">
                Capacidad: {VENUE_LIMITS[v].min}-{VENUE_LIMITS[v].max} PAX 
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-[#f0ede8] flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#1a3d2e]">
          <Users size={20} />
          <span className="font-headline italic text-xl">Número de Asistentes *</span>
        </div>
        <input 
          type="number"
          value={pax}
          min={currentLimit.min}
          max={currentLimit.max}
          onChange={(e) => onPaxChange(Number(e.target.value))}
          className="w-24 text-center font-body font-bold text-lg bg-[#f6f3ee] border-none rounded-xl py-2 focus:ring-2 focus:ring-[#1a3d2e]/10"
        />
      </div>
    </div>
  );
};
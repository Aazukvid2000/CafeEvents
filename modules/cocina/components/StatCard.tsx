import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
}

export const StatCard = ({ label, value, icon: Icon, trend }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-[#e5e2dd] shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-[#f6f3ee] rounded-xl text-[#334537]">
        <Icon size={20} />
      </div>
      {trend && <span className="text-[10px] font-bold text-[#4a5d4e] bg-[#d3e8d5] px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <p className="text-[10px] uppercase tracking-widest text-[#5f5e5e] font-bold mb-1">{label}</p>
    <h4 className="font-headline text-3xl text-[#334537] italic">{value}</h4>
  </div>
);
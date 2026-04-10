'use client';
import { useState, useMemo } from 'react';
import { MOCK_TRANSACCIONES } from '../mocks/contador.mock';
import { ReportSearchParams, FinancialReport } from '../types/contador';

export const useFinancialReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<FinancialReport | null>(null);

  const generateReport = async (params: ReportSearchParams) => {
    setIsGenerating(true);
    
    // Simulación de procesamiento de datos (Paso 6 y 7 del Flujo Normal) [cite: 180, 181]
    setTimeout(() => {
      const filtered = MOCK_TRANSACCIONES.filter(t => {
        const date = new Date(t.fecha);
        return date >= new Date(params.fechaInicio) && date <= new Date(params.fechaFin);
      });

      // Cálculo segmentado según requerimiento RN-03 
      const metrics = filtered.reduce((acc, curr) => {
        if (curr.categoria === 'Ingreso Cafetería') acc.ingresosCafeteria += curr.monto;
        if (curr.categoria === 'Ingreso Eventos') acc.ingresosEventos += curr.monto;
        if (curr.categoria === 'Costo Inventario') acc.costosInventario += curr.monto;
        if (curr.categoria === 'Gasto Operativo' || curr.categoria === 'Salario') acc.gastosOperativos += curr.monto;
        return acc;
      }, { ingresosCafeteria: 0, ingresosEventos: 0, costosInventario: 0, gastosOperativos: 0 });

      const utilidadBruta = (metrics.ingresosCafeteria + metrics.ingresosEventos) - metrics.costosInventario;
      const utilidadNeta = utilidadBruta - metrics.gastosOperativos;

      setGeneratedReport({
        id: `rep-${Date.now()}`,
        tipo: params.tipo,
        periodoInicio: params.fechaInicio,
        periodoFin: params.fechaFin,
        fechaGeneracion: new Date().toISOString(),
        generadoPor: 'Contador de Turno',
        metricas: { ...metrics, utilidadBruta, utilidadNeta },
        archivoUrl: '#'
      });
      
      setIsGenerating(false);
    }, 1500);
  };

  return { generateReport, isGenerating, generatedReport };
};
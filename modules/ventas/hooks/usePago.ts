// src/modules/ventas/hooks/usePago.ts
import { useState, useEffect } from 'react';
import { Cuenta } from '../types/cuenta';
import { Pago, DatosFiscales } from '../types/pago';

export const usePago = (cuentaInicial: Cuenta) => {
  const [cuenta, setCuenta] = useState<Cuenta>(cuentaInicial);
  const [pagosRealizados, setPagosRealizados] = useState<Pago[]>([]);

  // S2: Aplicación de descuento por tarjeta de lealtad 
  const aplicarDescuentoLealtad = () => {
    // Regla de negocio: El programa de lealtad se valida físicamente 
    // Si el consumo >= 600 y no se aplicó descuento, se entrega sello 
    const porcentajeDescuento = 0.10; // Ejemplo: 10% de descuento por 5 sellos
    const montoDescuento = cuenta.total * porcentajeDescuento;
    
    const nuevaCuenta = {
      ...cuenta,
      descuento: montoDescuento,
      total: cuenta.total - montoDescuento,
      saldoPendiente: cuenta.saldoPendiente - montoDescuento
    };
    
    setCuenta(nuevaCuenta);
    console.log("S2: Descuento de lealtad aplicado correctamente ");
  };

  // Paso 5: Procesar Pago y S1: Pago parcial o cuentas divididas 
  const registrarPago = (metodo: 'EFECTIVO' | 'TARJETA', monto: number) => {
    // Validar que el pago no exceda el saldo pendiente 
    if (monto > cuenta.saldoPendiente) {
      console.error("E4: Error de captura - El monto excede el saldo ");
      return;
    }

    const nuevoPago: Pago = {
      cuentaId: cuenta.id,
      monto,
      metodo,
      confirmado: true, // Paso 6: Sistema valida el pago 
      fechaPago: new Date(),
      requiereFactura: false
    };

    const nuevoSaldo = cuenta.saldoPendiente - monto;
    
    setPagosRealizados([...pagosRealizados, nuevoPago]);
    setCuenta({
      ...cuenta,
      saldoPendiente: nuevoSaldo,
      pagada: nuevoSaldo === 0 // RN: Cuenta marcada como "Pagada" solo si saldo es cero 
    });

    console.log(`Paso 7: Pago registrado. Saldo restante: $${nuevoSaldo} `);
  };

  // S3: Solicitud de factura CFDI 
  const procesarFacturacion = (datos: DatosFiscales) => {
    // Paso 2 de S3: Captura de datos fiscales 
    console.log("S3: Conectando al PAC para timbrar factura CFDI...", datos);
    // Paso 3 de S3: Sistema genera y entrega factura 
  };

  // Paso 10: Cierre de cuenta y liberación de mesa 
  const finalizarCierre = () => {
    if (cuenta.saldoPendiente > 0) {
      console.error("E4: Cierre con saldo pendiente bloqueado ");
      return;
    }
    console.log("Paso 10: Mesa liberada y cuenta cerrada exitosamente ");
  };

  return {
    cuenta,
    pagosRealizados,
    aplicarDescuentoLealtad,
    registrarPago,
    procesarFacturacion,
    finalizarCierre
  };
};
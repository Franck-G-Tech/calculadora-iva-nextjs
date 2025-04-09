import { NextResponse } from 'next/server';
import { POST as calcularIvaHandler } from '../calcular-iva/route';
import { POST as sumarIvaHandler } from '../sumar-iva/route';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { monto, porcentajeIva } = reqBody;

    if (monto === undefined || porcentajeIva === undefined) {
      return NextResponse.json({ error: 'Se requieren los campos "monto" y "porcentajeIva".' }, { status: 400 });
    }

    const montoNumerico = parseFloat(monto);
    const porcentajeNumerico = parseFloat(porcentajeIva);

    if (isNaN(montoNumerico) || isNaN(porcentajeNumerico)) {
      return NextResponse.json({ error: 'Los campos "monto" y "porcentajeIva" deben ser números.' }, { status: 400 });
    }

    // Simular un objeto 'request' para calcularIvaHandler
    const calcularIvaRequest = {
      json: async () => ({ monto: montoNumerico.toString(), porcentajeIva: porcentajeNumerico.toString() }),
    } as Request; // Type assertion para que TypeScript no se queje

    // Simular un objeto 'res' (aunque no lo usemos directamente aquí)
    const calcularIvaResponse = {
      status: (code) => ({ json: (data) => ({ statusCode: code, data }) }),
    } as any; // Type assertion

    const calcularIvaResult = await calcularIvaHandler(calcularIvaRequest, calcularIvaResponse);
    if (calcularIvaResult.statusCode !== 200 || !calcularIvaResult.data?.iva) {
      throw new Error(calcularIvaResult.data?.error || 'Error al calcular el IVA');
    }
    const ivaCalculado = parseFloat(calcularIvaResult.data.iva);

    // Simular un objeto 'request' para sumarIvaHandler
    const sumarIvaRequest = {
      json: async () => ({ monto: montoNumerico.toString(), iva: ivaCalculado.toString() }),
    } as Request;

    const sumarIvaResponse = {
      status: (code) => ({ json: (data) => ({ statusCode: code, data }) }),
    } as any;

    const sumarIvaResult = await sumarIvaHandler(sumarIvaRequest, sumarIvaResponse);
    if (sumarIvaResult.statusCode !== 200 || !sumarIvaResult.data?.total) {
      throw new Error(sumarIvaResult.data?.error || 'Error al sumar el IVA');
    }
    const totalConIva = parseFloat(sumarIvaResult.data.total);

    return NextResponse.json({
      montoBase: montoNumerico.toFixed(2),
      ivaCalculado: ivaCalculado.toFixed(2),
      totalConIva: totalConIva.toFixed(2),
    });

  } catch (error) {
    console.error('Error en mostrar-total:', error);
    return NextResponse.json({ error: error.message || 'Error interno al procesar la solicitud' }, { status: 500 });
  }
}
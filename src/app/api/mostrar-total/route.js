import { NextResponse } from 'next/server';

// Función para llamar a la API de calcular-iva
async function callCalcularIva(monto, porcentajeIva) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  const url = new URL('/api/calcular-iva', baseUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ monto, porcentajeIva }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al calcular el IVA');
  }
  const data = await res.json();
  return parseFloat(data.iva);
}

// Función para llamar a la API de sumar-iva
async function callSumarIva(monto, ivaCalculado) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
  const url = new URL('/api/sumar-iva', baseUrl);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ monto, iva: ivaCalculado }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al sumar el IVA');
  }
  const data = await res.json();
  return parseFloat(data.total);
}

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

    const ivaCalculado = await callCalcularIva(montoNumerico, porcentajeNumerico);
    const totalConIva = await callSumarIva(montoNumerico, ivaCalculado);

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
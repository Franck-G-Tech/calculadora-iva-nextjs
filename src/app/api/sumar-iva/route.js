import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { monto, iva } = reqBody;

    if (monto === undefined || iva === undefined) {
      return NextResponse.json({ error: 'Se requieren los campos "monto" e "iva".' }, { status: 400 });
    }

    const montoNumerico = parseFloat(monto);
    const ivaNumerico = parseFloat(iva);

    if (isNaN(montoNumerico) || isNaN(ivaNumerico)) {
      return NextResponse.json({ error: 'Los campos "monto" e "iva" deben ser números.' }, { status: 400 });
    }

    const total = montoNumerico + ivaNumerico;
    return NextResponse.json({ total: total.toFixed(2) });

  } catch (error) {
    console.error('Error al procesar la petición:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
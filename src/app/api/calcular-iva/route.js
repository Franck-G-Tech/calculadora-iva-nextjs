import { NextResponse} from 'next/server';
//import { NextApiResponse } from 'next'

export async function POST(request) {
  const { monto, porcentajeIva } = await request.json();

  if (monto === undefined || porcentajeIva === undefined) {
    return NextResponse.json({ error: 'Se requieren los campos "monto" y "porcentajeIva".' }, { status: 400 });
  }

  const montoNumerico = parseFloat(monto);
  const porcentajeNumerico = parseFloat(porcentajeIva);

  if (isNaN(montoNumerico) || isNaN(porcentajeNumerico)) {
    return NextResponse.json({ error: 'Los campos "monto" y "porcentajeIva" deben ser números.' }, { status: 400 });
  }

  const iva = (montoNumerico * porcentajeNumerico) / 100;
  return NextResponse.json({ iva: iva.toFixed(2) });
}
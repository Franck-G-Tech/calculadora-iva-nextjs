//import { NextResponse} from 'next/server';
//import { NextApiResponse } from 'next'
'use server'

export async function POST(request) {
  const { monto, porcentajeIva } = await request.json();

  const montoNumerico = parseFloat(monto);
  const porcentajeNumerico = parseFloat(porcentajeIva);

  const iva = (montoNumerico * porcentajeNumerico) / 100;
  //return NextResponse.json({ iva: iva.toFixed(2) });
  return parseFloat(iva.toFixed(2));
}
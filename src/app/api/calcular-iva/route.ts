//import { NextResponse} from 'next/server';
//import { NextApiResponse } from 'next'
'use server'

export async function calculoIVA(precio: number): Promise<number> {
  const iva = precio * 0.16;
  return parseFloat(iva.toFixed(2));
}
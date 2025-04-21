// src/app/api/calculate/route.ts
 
import { NextResponse } from 'next/server';
import { calculoIVA } from '@/app/calculoIVA';
import { calculoTotal } from '@/app/calculoTotal';
 
export async function POST(request: Request) {
  try {
    const { value } = await request.json();
    const iva = await calculoIVA(value);
    const total = await calculoTotal(value, iva);
 
    return NextResponse.json({
      valor: value,
      iva: iva,
      total: total
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}




'use server'
 
export async function calculoTotal(valor: number, iva: number): Promise<number> {
  const total = valor + iva;
  return parseFloat(total.toFixed(2));
}

'use server'
 
export async function calculoIVA(precio: number): Promise<number> {
  const iva = precio * 0.16;
  return parseFloat(iva.toFixed(2));
}
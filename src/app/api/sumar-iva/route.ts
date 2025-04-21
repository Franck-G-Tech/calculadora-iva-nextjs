//import { NextResponse } from 'next/server';
'use server'
 
export async function calculoTotal(valor: number, iva: number): Promise<number> {
  const total = valor + iva;
  return parseFloat(total.toFixed(2));
}

import { NextResponse } from 'next/server';
import { calculoIVA } from '@/app/api/calcular-iva/route';
import { calculoTotal } from '@/app/api/sumar-iva/route';

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

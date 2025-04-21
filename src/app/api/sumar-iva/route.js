//import { NextResponse } from 'next/server';
'user server'

export async function POST(request) {

    const reqBody = await request.json();
    const { monto, iva } = reqBody;
    const montoNumerico = parseFloat(monto);
    const ivaNumerico = parseFloat(iva);
    const total = montoNumerico + ivaNumerico;
    //return NextResponse.json({ total: total.toFixed(2) });
    return total.toFixed(2);

}
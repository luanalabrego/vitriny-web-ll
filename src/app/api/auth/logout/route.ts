import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  cookies().delete('vitriny_auth');
  
  return NextResponse.json({ 
    success: true,
    message: 'Logout realizado com sucesso' 
  });
}

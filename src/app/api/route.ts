import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'Energy API is running'
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'online',
    message: 'Energy API is running'
  })
}

export const dynamic = 'force-dynamic'

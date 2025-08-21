import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { initializeScraping } from '@/utils/dataScraper'

const prisma = new PrismaClient()

// Initialize scraping when the API route is first accessed
let scrapingInitialized = false

export async function GET(request: Request) {
  if (!scrapingInitialized) {
    initializeScraping()
    scrapingInitialized = true
  }

  try {
    // Get the latest scraping status for each source
    const latestLogs = await prisma.scrapingLog.findMany({
      orderBy: {
        timestamp: 'desc'
      },
      take: 10
    })

    // Get some statistics about the collected data
    const stats = await prisma.energyData.groupBy({
      by: ['source'],
      _count: {
        id: true
      }
    })

    return NextResponse.json({
      status: 'success',
      data: {
        logs: latestLogs,
        stats
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch scraping status' },
      { status: 500 }
    )
  }
}

// Endpoint to manually trigger scraping
export async function POST(request: Request) {
  try {
    const { source } = await request.json()
    
    // Trigger scraping for the specified source
    // Implementation will depend on your specific needs
    
    return NextResponse.json({
      status: 'success',
      message: `Started scraping for ${source}`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to initiate scraping' },
      { status: 500 }
    )
  }
}

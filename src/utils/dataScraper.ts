import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import * as cheerio from 'cheerio'
import puppeteer from 'puppeteer'
import cron from 'node-cron'

const prisma = new PrismaClient()

interface ScrapingConfig {
  url: string
  name: string
  selector?: string
  requiresJS?: boolean
  dataType: string
}

const sources: ScrapingConfig[] = [
  {
    url: 'https://ember-energy.org/data',
    name: 'EMBER',
    requiresJS: true,
    dataType: 'electricity'
  },
  {
    url: 'https://www.iea.org/data-and-statistics',
    name: 'IEA',
    requiresJS: true,
    dataType: 'comprehensive'
  },
  {
    url: 'https://www.eia.gov/opendata',
    name: 'EIA',
    requiresJS: true,
    dataType: 'comprehensive'
  }
]

async function logScraping(source: string, status: string, message?: string) {
  await prisma.scrapingLog.create({
    data: {
      source,
      status,
      message
    }
  })
}

async function scrapeWithPuppeteer(config: ScrapingConfig) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.goto(config.url, { waitUntil: 'networkidle0' })

    // Wait for specific data elements based on the source
    switch (config.name) {
      case 'EMBER':
        await page.waitForSelector('.ember-data-table')
        // Extract EMBER specific data
        const emberData = await page.evaluate(() => {
          // Add specific data extraction logic
          return []
        })
        await saveData(emberData, config)
        break

      case 'IEA':
        await page.waitForSelector('.iea-statistics')
        // Extract IEA specific data
        const ieaData = await page.evaluate(() => {
          // Add specific data extraction logic
          return []
        })
        await saveData(ieaData, config)
        break

      case 'EIA':
        await page.waitForSelector('.eia-data')
        // Extract EIA specific data
        const eiaData = await page.evaluate(() => {
          // Add specific data extraction logic
          return []
        })
        await saveData(eiaData, config)
        break
    }

    await logScraping(config.name, 'success')
  } catch (error) {
    await logScraping(config.name, 'error', error.message)
    throw error
  } finally {
    await browser.close()
  }
}

async function saveData(data: any[], config: ScrapingConfig) {
  // Save to database with source tracking
  for (const item of data) {
    await prisma.energyData.create({
      data: {
        source: config.name,
        category: item.category || 'unknown',
        type: item.type || 'unknown',
        value: item.value,
        unit: item.unit || 'unknown',
        country: item.country,
        region: item.region,
        year: item.year,
        month: item.month,
        sourceUrl: config.url,
        metadata: JSON.stringify(item.metadata || {})
      }
    })
  }
}

// Schedule scraping jobs
export function initializeScraping() {
  // Run every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    for (const source of sources) {
      try {
        await scrapeWithPuppeteer(source)
      } catch (error) {
        console.error(`Error scraping ${source.name}:`, error)
      }
    }
  })
}

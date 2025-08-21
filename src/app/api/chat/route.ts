import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { question } = await request.json()
    
    // Here you would typically integrate with an AI service
    // For now, we'll use a simple response system
    const answer = await generateAnswer(question)
    
    // Store the interaction in the database
    const chatMessage = await prisma.chatMessage.create({
      data: {
        question,
        answer,
      },
    })
    
    return new Response(JSON.stringify({ answer, id: chatMessage.id }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

async function generateAnswer(question: string): Promise<string> {
  // Simple response logic - replace with actual AI integration
  const keywords = question.toLowerCase()
  if (keywords.includes('energy')) {
    return "Energy is a vital resource that we must use sustainably."
  }
  if (keywords.includes('solar')) {
    return "Solar power is a renewable energy source that harnesses the sun's radiation."
  }
  if (keywords.includes('wind')) {
    return "Wind energy is captured through turbines and converted into electricity."
  }
  return "I can help you learn about various forms of energy. Try asking about solar, wind, or general energy topics."
}

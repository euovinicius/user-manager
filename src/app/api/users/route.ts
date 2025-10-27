import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  return new Response(JSON.stringify(users), {
    headers: { 'content-type': 'application/json' },
  })
}

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const u = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', name: 'Administrator' },
  })
  console.log('Seed OK:', u.email)
}

main().finally(() => prisma.$disconnect())

import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const pollFactory = (count: number) => {
  return Array(count)
    .fill(null)
    .map(() => {
      return {
        title: faker.lorem.word({ length: { min: 5, max: 7 } }),
      }
    })
}

async function main() {
  console.log(`Start seeding ...`)
  const polls = pollFactory(3)
  for (const poll of polls) {
    await prisma.poll.create({ data: poll })
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

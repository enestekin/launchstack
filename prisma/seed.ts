import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { clerkId: 'seed-user-123' },
    update: {},
    create: {
      clerkId: 'seed-user-123',
      email: 'demo@launchstack.com',
    },
  });

  for (let i = 1; i <= 10; i++) {
    await prisma.launchPage.create({
      data: {
        title: `Awesome Project ${i}`,
        description: `This is a cool idea number ${i}`,
        slug: `awesome-project-${i}`,
        userId: user.id,
      },
    });
  }
}

main()
  .then(() => {
    console.log('✅ Seed completed.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    return prisma.$disconnect();
  });

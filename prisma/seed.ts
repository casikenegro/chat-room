import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'givemeajob@plis.com' },
    update: {},
    create: {
      email: 'givemeajob@plis.com',
      name: 'jesus ortiz',
      password: hash(),
    } as any,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

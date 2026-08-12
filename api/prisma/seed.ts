import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { seedMediumOfInstruction } from './seeders/medium-of-instruction.seeder';
import { seedSubjects } from './seeders/subjects.seeder';
import { seedUsers } from './seeders/users.seeder';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.$connect();

  await seedMediumOfInstruction(prisma);
  await seedSubjects(prisma);
  await seedUsers(prisma);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

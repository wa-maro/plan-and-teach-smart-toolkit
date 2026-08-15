import { PrismaClient } from '@app-prisma/client';
import { mediumOfInstructions } from '../data/medium-of-instruction';

export async function seedMediumOfInstruction(prisma: PrismaClient) {
  await Promise.all(
    mediumOfInstructions.map((medium) =>
      prisma.mediumOfInstruction.upsert({
        where: { code: medium.code },
        update: { name: medium.name },
        create: medium,
      }),
    ),
  );

  console.log('Medium of instruction seeded.');
}

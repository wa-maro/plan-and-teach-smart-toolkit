import { PrismaClient } from '@app-prisma/client';
import { subjects } from '../data/subjects';
import slugify from 'slugify';

export async function seedSubjects(prisma: PrismaClient) {
  for (const subject of subjects) {
    const { medium, ...data } = subject;

    const slug = slugify(subject.name, {
      lower: true,
      strict: true,
    });

    const mediumOfInstruction = {
      connect: {
        code: medium,
      },
    };

    await prisma.subject.upsert({
      where: { name: subject.name },
      update: {
        abbreviation: subject.abbreviation,
        slug,
        mediumOfInstruction,
      },
      create: {
        ...data,
        slug,
        mediumOfInstruction,
      },
    });
  }

  console.log('Subject seeded');
}

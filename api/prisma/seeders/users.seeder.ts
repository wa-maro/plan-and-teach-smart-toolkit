import bcrypt from 'bcrypt';
import { PrismaClient, UserRole } from '@prisma';
import { teachers } from '../data/users';

const ADMIN_PASSWORD = process.env.ADMIN_SEED_PASSWORD;
const TEACHER_PASSWORD = process.env.TEACHER_SEED_PASSWORD;

export async function seedUsers(prisma: PrismaClient) {
  if (!TEACHER_PASSWORD) {
    throw new Error('Seed passwords are not configured');
  }

  const teacherPasswordHash = await bcrypt.hash(TEACHER_PASSWORD, 12);

  for (const user of teachers) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        role: UserRole.TEACHER,
      },
      create: {
        ...user,
        role: UserRole.TEACHER,
        passwordHash: teacherPasswordHash,
      },
    });
  }

  await seedAdmin(prisma);

  console.log('Users seeded.');
}

async function seedAdmin(prisma: PrismaClient) {
  if (!ADMIN_PASSWORD) {
    throw new Error('Seed passwords are not configured');
  }

  const adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const admin = {
    username: 'admin',
    phoneNumber: '255742141499',
    fullName: 'Admin',
  };

  await prisma.user.upsert({
    where: { username: admin.username },
    update: {
      phoneNumber: admin.phoneNumber,
      fullName: admin.fullName,
      role: UserRole.ADMIN,
    },
    create: {
      ...admin,
      role: UserRole.ADMIN,
      passwordHash: adminPasswordHash,
    },
  });
}

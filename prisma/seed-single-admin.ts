import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const EMAIL = 'Progsm06@gmail.com';
const MINIMUM_PASSWORD_LENGTH = 16;

async function main() {
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!password || password.length < MINIMUM_PASSWORD_LENGTH) {
    throw new Error(
      `ADMIN_SEED_PASSWORD must be set and contain at least ${MINIMUM_PASSWORD_LENGTH} characters.`,
    );
  }

  const adminRole = await prisma.roleDefinition.upsert({
    where: { name: 'Administrateur' },
    update: { homePath: '/accueil', description: 'Full access to every module.' },
    create: {
      name: 'Administrateur',
      homePath: '/accueil',
      description: 'Full access to every module.',
    },
  });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email: EMAIL },
    update: {
      fullName: 'Pro GSM 06',
      passwordHash,
      role: UserRole.ADMIN,
      roleId: adminRole.id,
      isActive: true,
    },
    create: {
      email: EMAIL,
      fullName: 'Pro GSM 06',
      passwordHash,
      role: UserRole.ADMIN,
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log(`Administrator account is ready: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());

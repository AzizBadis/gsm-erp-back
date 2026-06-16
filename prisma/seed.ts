import { PrismaClient, RepairStatus, UserRole, PaymentStatus, PartRequestStatus, StockMovementType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const TEST_PASSWORD = 'password123';

async function main() {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gsm.local' },
    update: {},
    create: { email: 'admin@gsm.local', fullName: 'Admin GSM', role: UserRole.ADMIN, passwordHash },
  });

  const cashier = await prisma.user.upsert({
    where: { email: 'cashier@gsm.local' },
    update: {},
    create: { email: 'cashier@gsm.local', fullName: 'Cashier GSM', role: UserRole.CASHIER, passwordHash },
  });

  const techUser1 = await prisma.user.upsert({
    where: { email: 'tech1@gsm.local' },
    update: {},
    create: { email: 'tech1@gsm.local', fullName: 'Yassine Technician', role: UserRole.TECHNICIAN, passwordHash },
  });

  const techUser2 = await prisma.user.upsert({
    where: { email: 'tech2@gsm.local' },
    update: {},
    create: { email: 'tech2@gsm.local', fullName: 'Sara Technician', role: UserRole.TECHNICIAN, passwordHash },
  });

  const tech1 = await prisma.technician.upsert({
    where: { userId: techUser1.id },
    update: {},
    create: { userId: techUser1.id, specialty: 'Smartphone motherboard and screens' },
  });

  const tech2 = await prisma.technician.upsert({
    where: { userId: techUser2.id },
    update: {},
    create: { userId: techUser2.id, specialty: 'Tablets and laptops' },
  });

  const [samsung, apple, redmi, huawei] = await Promise.all(
    ['Samsung', 'Apple', 'Redmi', 'Huawei'].map((name) =>
      prisma.brand.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  const [smartphone, tablette, pc, smartWatch] = await Promise.all(
    ['Smartphone', 'Tablette', 'PC', 'SmartWatch'].map((name) =>
      prisma.device.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  const galaxy = await prisma.deviceModel.upsert({
    where: { brandId_deviceId_name: { brandId: samsung.id, deviceId: smartphone.id, name: 'Galaxy S23' } },
    update: {},
    create: { brandId: samsung.id, deviceId: smartphone.id, name: 'Galaxy S23' },
  });

  await prisma.deviceModel.upsert({
    where: { brandId_deviceId_name: { brandId: apple.id, deviceId: smartphone.id, name: 'iPhone 14' } },
    update: {},
    create: { brandId: apple.id, deviceId: smartphone.id, name: 'iPhone 14' },
  });

  await prisma.deviceModel.upsert({
    where: { brandId_deviceId_name: { brandId: redmi.id, deviceId: smartphone.id, name: 'Note 12' } },
    update: {},
    create: { brandId: redmi.id, deviceId: smartphone.id, name: 'Note 12' },
  });

  await prisma.deviceModel.upsert({
    where: { brandId_deviceId_name: { brandId: huawei.id, deviceId: smartWatch.id, name: 'Watch GT' } },
    update: {},
    create: { brandId: huawei.id, deviceId: smartWatch.id, name: 'Watch GT' },
  });

  const parts = await Promise.all(
    [
      { name: 'Batterie Samsung', sku: 'BAT-SAM-001', unitPrice: 180, stockQty: 12, minStockQty: 3 },
      { name: 'Ecran iPhone', sku: 'SCR-IPH-001', unitPrice: 450, stockQty: 8, minStockQty: 2 },
      { name: 'Connecteur USB-C', sku: 'CON-USBC-001', unitPrice: 70, stockQty: 25, minStockQty: 5 },
      { name: 'Vitre tactile tablette', sku: 'GLS-TAB-001', unitPrice: 220, stockQty: 6, minStockQty: 2 },
    ].map((part) => prisma.product.upsert({ where: { sku: part.sku }, update: part, create: part })),
  );

  for (const part of parts) {
    await prisma.stockMovement.create({
      data: { productId: part.id, type: StockMovementType.IN, quantity: part.stockQty, reason: 'Seed initial stock' },
    });
  }

  const customer = await prisma.contact.create({
    data: { fullName: 'Nadia Client', phone: '+212600000001', email: 'nadia@example.com', address: 'Casablanca' },
  });

  const repair = await prisma.repair.create({
    data: {
      reference: 'REP-SEED-00001',
      contactId: customer.id,
      deviceId: smartphone.id,
      deviceModelId: galaxy.id,
      technicianId: tech1.id,
      status: RepairStatus.WAITING_PARTS,
      imei: '356000000000001',
      problem: 'Battery drains quickly and USB-C charging is unstable',
      diagnosis: 'Battery health low, connector oxidized',
      notes: 'Client approved parts estimate.',
      estimatedCost: 320,
    },
  });

  await prisma.repair.create({
    data: {
      reference: 'REP-SEED-00002',
      contactId: customer.id,
      deviceId: pc.id,
      technicianId: tech2.id,
      status: RepairStatus.ASSIGNED,
      problem: 'No display on startup',
      estimatedCost: 500,
    },
  });

  await prisma.partRequest.create({
    data: {
      repairId: repair.id,
      technicianId: tech1.id,
      status: PartRequestStatus.PENDING,
      reason: 'Battery and connector replacement',
      items: {
        create: [
          { productId: parts[0].id, quantity: 1 },
          { productId: parts[2].id, quantity: 1 },
        ],
      },
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      number: 'INV-SEED-00001',
      contactId: customer.id,
      repairId: repair.id,
      subtotal: 320,
      tax: 0,
      total: 320,
      paidAmount: 100,
      paymentStatus: PaymentStatus.PARTIAL,
      items: {
        create: [
          { productId: parts[0].id, description: 'Batterie Samsung', quantity: 1, unitPrice: 180, total: 180 },
          { productId: parts[2].id, description: 'Connecteur USB-C', quantity: 1, unitPrice: 70, total: 70 },
          { description: 'Main d oeuvre', quantity: 1, unitPrice: 70, total: 70 },
        ],
      },
    },
  });

  await prisma.payment.create({
    data: { invoiceId: invoice.id, cashierId: cashier.id, amount: 100, method: 'cash', reference: 'SEED-PAY-001' },
  });

  console.log({
    admin: admin.email,
    cashier: cashier.email,
    technicians: [techUser1.email, techUser2.email],
    password: TEST_PASSWORD,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());

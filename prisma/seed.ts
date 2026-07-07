import {
  AccountTransactionDirection,
  AbonnementStatus,
  EssentialTaskPriority,
  EssentialTaskStatus,
  InvoiceDocumentType,
  PartRequestStatus,
  PaymentStatus,
  Prisma,
  PrismaClient,
  PurchaseKind,
  PurchasePaymentStatus,
  PurchaseStatus,
  ReservationStatus,
  StockAdjustmentType,
  StockMovementType,
  StockTransferStatus,
  UserRole,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const TEST_PASSWORD = 'password123';
const now = new Date();

const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

async function upsertContact(data: Prisma.ContactCreateInput) {
  const existing = await prisma.contact.findFirst({ where: { phone: data.phone } });

  if (existing) {
    return prisma.contact.update({ where: { id: existing.id }, data });
  }

  return prisma.contact.create({ data });
}

async function upsertExpenseCategory(name: string, code: string, parentId?: string) {
  const existing = await prisma.expenseCategory.findFirst({
    where: { name, parentId: parentId ?? null },
  });

  if (existing) {
    return prisma.expenseCategory.update({ where: { id: existing.id }, data: { name, code, parentId } });
  }

  return prisma.expenseCategory.create({ data: { name, code, parentId } });
}

async function upsertRecord<T extends { id: string }>(
  find: () => Promise<T | null>,
  update: (id: string) => Promise<T>,
  create: () => Promise<T>,
) {
  const existing = await find();
  return existing ? update(existing.id) : create();
}

async function main() {
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 12);
  const seedInvoiceNumbers = ['INV-SEED-00001', 'INV-SEED-00002', 'DEV-SEED-00001', 'RET-SEED-00001'];
  const seedPurchaseRefs = ['PUR-SEED-00001', 'PO-SEED-00001', 'PREQ-SEED-00001', 'PRET-SEED-00001'];
  const seedTransferRefs = ['TRF-SEED-00001', 'TRF-SEED-00002'];
  const seedAdjustmentRefs = ['ADJ-SEED-00001', 'ADJ-SEED-00002'];
  const seedRepairRefs = ['REP-SEED-00001', 'REP-SEED-00002', 'REP-SEED-00003', 'REP-SEED-00004'];

  await prisma.payment.deleteMany({ where: { reference: { in: ['SEED-PAY-001', 'SEED-PAY-002'] } } });
  await prisma.accountTransaction.deleteMany({
    where: { reference: { in: ['SEED-OPEN-CASH', 'SEED-OPEN-BANK', 'SEED-PAY-001', 'SEED-EXP-001'] } },
  });
  await prisma.salesImport.deleteMany({ where: { fileName: 'seed-sales-import.csv' } });
  await prisma.stockMovement.deleteMany({ where: { reason: { startsWith: 'Seed ' } } });

  const existingInvoices = await prisma.invoice.findMany({ where: { number: { in: seedInvoiceNumbers } } });
  await prisma.invoiceItem.deleteMany({ where: { invoiceId: { in: existingInvoices.map((invoice) => invoice.id) } } });

  const existingPurchases = await prisma.purchase.findMany({ where: { reference: { in: seedPurchaseRefs } } });
  await prisma.purchaseItem.deleteMany({ where: { purchaseId: { in: existingPurchases.map((purchase) => purchase.id) } } });

  const existingTransfers = await prisma.stockTransfer.findMany({ where: { reference: { in: seedTransferRefs } } });
  await prisma.stockTransferItem.deleteMany({ where: { transferId: { in: existingTransfers.map((transfer) => transfer.id) } } });

  const existingAdjustments = await prisma.stockAdjustment.findMany({ where: { reference: { in: seedAdjustmentRefs } } });
  await prisma.stockAdjustmentItem.deleteMany({
    where: { adjustmentId: { in: existingAdjustments.map((adjustment) => adjustment.id) } },
  });

  const existingRepairs = await prisma.repair.findMany({ where: { reference: { in: seedRepairRefs } } });
  await prisma.repairTimerLog.deleteMany({ where: { repairId: { in: existingRepairs.map((repair) => repair.id) } } });
  await prisma.technicianCommission.deleteMany({ where: { repairId: { in: existingRepairs.map((repair) => repair.id) } } });
  await prisma.partRequest.deleteMany({ where: { repairId: { in: existingRepairs.map((repair) => repair.id) } } });

  const roleDefinitions = await Promise.all(
    [
      { name: 'Administrateur', homePath: '/accueil', description: 'Full access to every module.' },
      { name: 'Technicien', homePath: '/technician/tasks', description: 'Repair workflow and part requests.' },
      { name: 'Caissier', homePath: '/cashier/payments', description: 'Cashier, pickups, and payments.' },
      { name: 'Equipe', homePath: '/my-tasks', description: 'Staff access to daily operations.' },
    ].map((role) =>
      prisma.roleDefinition.upsert({
        where: { name: role.name },
        update: role,
        create: role,
      }),
    ),
  );

  const [adminRole, techRole, cashierRole, staffRole] = roleDefinitions;

  const defaultStatuses = [
    { name: 'RECEIVED', label: 'Appareil pris en charge', color: '#16a34a' },
    { name: 'ASSIGNED', label: 'Appareil affecte', color: '#4f46e5' },
    { name: 'IN_PROGRESS', label: 'Installation en cours', color: '#f59e0b' },
    { name: 'PAUSED', label: 'En pause', color: '#64748b' },
    { name: 'WAITING_PARTS', label: 'Commande des pieces en cours', color: '#db2777' },
    { name: 'PARTS_READY', label: 'Pieces disponibles', color: '#059669' },
    { name: 'FINISHED', label: 'Appareil pret', color: '#16a34a' },
    { name: 'DELIVERED', label: 'Livre', color: '#047857' },
    { name: 'CANCELLED', label: 'Annule', color: '#dc2626' },
  ];

  for (const status of defaultStatuses) {
    await prisma.customStatus.upsert({
      where: { name: status.name },
      update: { label: status.label, color: status.color },
      create: status,
    });
  }

  const admin = await prisma.user.upsert({
    where: { email: 'aziz5.badis@gmail.com' },
    update: { fullName: 'Admin GSM ERP System', role: UserRole.ADMIN, roleId: adminRole.id, isActive: true },
    create: {
      email: 'aziz5.badis@gmail.com',
      fullName: 'Admin GSM ERP System',
      role: UserRole.ADMIN,
      roleId: adminRole.id,
      passwordHash,
    },
  });

  const cashier = await prisma.user.upsert({
    where: { email: 'cashier@gsm.local' },
    update: { fullName: 'Mouna Caissiere', role: UserRole.CASHIER, roleId: cashierRole.id, isActive: true },
    create: {
      email: 'cashier@gsm.local',
      fullName: 'Mouna Caissiere',
      role: UserRole.CASHIER,
      roleId: cashierRole.id,
      passwordHash,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@gsm.local' },
    update: { fullName: 'Nour Operations', role: UserRole.STAFF, roleId: staffRole.id, isActive: true },
    create: {
      email: 'staff@gsm.local',
      fullName: 'Nour Operations',
      role: UserRole.STAFF,
      roleId: staffRole.id,
      passwordHash,
    },
  });

  const techUsers = await Promise.all(
    [
      { email: 'tech1@gsm.local', fullName: 'Yassine Technicien', specialty: 'Smartphones et tablettes' },
      { email: 'tech2@gsm.local', fullName: 'Sara Technicienne', specialty: 'Tablettes, PC et diagnostic carte' },
    ].map(async (tech) => {
      const user = await prisma.user.upsert({
        where: { email: tech.email },
        update: { fullName: tech.fullName, role: UserRole.TECHNICIAN, roleId: techRole.id, isActive: true },
        create: {
          email: tech.email,
          fullName: tech.fullName,
          role: UserRole.TECHNICIAN,
          roleId: techRole.id,
          passwordHash,
        },
      });

      const technician = await prisma.technician.upsert({
        where: { userId: user.id },
        update: { specialty: tech.specialty },
        create: { userId: user.id, specialty: tech.specialty },
      });

      return { user, technician };
    }),
  );

  const [tech1, tech2] = techUsers;

  const repairTypes = await Promise.all(
    [
      { name: 'Reparation smartphone', commissionRate: 25, managedByAdmin: false },
      { name: 'Reparation mobile', commissionRate: 15, managedByAdmin: false },
      { name: 'Diagnostic avance', commissionRate: 10, managedByAdmin: true },
    ].map((type) => prisma.repairType.upsert({ where: { name: type.name }, update: type, create: type })),
  );

  await Promise.all(
    [
      { event: 'REPAIR_STARTED', status: 'IN_PROGRESS' },
      { event: 'REPAIR_COMPLETED', status: 'FINISHED' },
      { event: 'RETURN_SAV', status: 'WAITING_PARTS' },
      { event: 'BROKEN_LOST', status: 'CANCELLED' },
    ].map((mapping) =>
      prisma.technicianStatusMapping.upsert({
        where: { event_status: mapping },
        update: { statusId: mapping.status },
        create: { ...mapping, statusId: mapping.status },
      }),
    ),
  );

  const [samsung, apple, xiaomi, huawei, asus] = await Promise.all(
    ['Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Asus'].map((name) =>
      prisma.brand.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  const [smartphone, tablette, pc, laptop, smartWatch] = await Promise.all(
    ['Smartphone', 'Tablette', 'PC fixe', 'PC portable', 'SmartWatch'].map((name) =>
      prisma.device.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  const [galaxy, iphone, redmi, asusVivoBook] = await Promise.all([
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: samsung.id, deviceId: smartphone.id, name: 'Galaxy S23' } },
      update: {},
      create: { brandId: samsung.id, deviceId: smartphone.id, name: 'Galaxy S23' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: apple.id, deviceId: smartphone.id, name: 'iPhone 14' } },
      update: {},
      create: { brandId: apple.id, deviceId: smartphone.id, name: 'iPhone 14' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: xiaomi.id, deviceId: smartphone.id, name: 'Redmi Note 12' } },
      update: {},
      create: { brandId: xiaomi.id, deviceId: smartphone.id, name: 'Redmi Note 12' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: asus.id, deviceId: laptop.id, name: 'VivoBook 15' } },
      update: {},
      create: { brandId: asus.id, deviceId: laptop.id, name: 'VivoBook 15' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: huawei.id, deviceId: smartWatch.id, name: 'Watch GT' } },
      update: {},
      create: { brandId: huawei.id, deviceId: smartWatch.id, name: 'Watch GT' },
    }),
  ]);

  const products = await Promise.all(
    [
      {
        name: 'Ecran Samsung Galaxy S23',
        sku: 'SCR-SAM-S23',
        barcode: '619000000001',
        brand: 'Samsung',
        category: 'Pieces mobile',
        unit: 'Piece',
        warranty: '3 mois',
        productType: 'Piece detachee',
        description: 'Module ecran complet pour Galaxy S23.',
        unitPrice: 290,
        taxRate: 19,
        stockQty: 18,
        minStockQty: 5,
      },
      {
        name: 'Batterie Samsung Galaxy',
        sku: 'BAT-SAM-001',
        barcode: '619000000002',
        brand: 'Samsung',
        category: 'Pieces mobile',
        unit: 'Piece',
        warranty: '3 mois',
        productType: 'Piece detachee',
        description: 'Batterie compatible Galaxy S series.',
        unitPrice: 180,
        taxRate: 19,
        stockQty: 12,
        minStockQty: 3,
      },
      {
        name: 'Ecran iPhone 14',
        sku: 'SCR-IPH-014',
        barcode: '619000000003',
        brand: 'Apple',
        category: 'Pieces mobile',
        unit: 'Piece',
        warranty: '3 mois',
        productType: 'Piece detachee',
        description: 'Module ecran iPhone 14.',
        unitPrice: 450,
        taxRate: 19,
        stockQty: 6,
        minStockQty: 2,
      },
      {
        name: 'Connecteur USB-C',
        sku: 'CON-USBC-001',
        barcode: '619000000004',
        brand: 'Generic',
        category: 'Connectique',
        unit: 'Piece',
        warranty: '1 mois',
        productType: 'Piece detachee',
        description: 'Connecteur de charge USB-C.',
        unitPrice: 70,
        taxRate: 19,
        stockQty: 25,
        minStockQty: 5,
      },
      {
        name: 'Colle ecran UV',
        sku: 'COL-UV-001',
        barcode: '619000000005',
        brand: 'GSM ERP System',
        category: 'Consommables atelier',
        unit: 'Piece',
        warranty: '0',
        productType: 'Service',
        description: 'Colle UV pour pose ecran et vitre arriere.',
        unitPrice: 35,
        taxRate: 7,
        stockQty: 100,
        minStockQty: 20,
      },
    ].map((product) => prisma.product.upsert({ where: { sku: product.sku }, update: product, create: product })),
  );

  for (const product of products) {
    await prisma.stockMovement.create({
      data: {
        productId: product.id,
        type: StockMovementType.IN,
        quantity: product.stockQty,
        reason: 'Seed initial stock',
      },
    });
  }

  const contacts = await Promise.all([
    upsertContact({
      fullName: 'Nadia Ben Ali',
      phone: '+21620000001',
      email: 'nadia@example.com',
      address: 'Centre-ville, Tunis',
    }),
    upsertContact({
      fullName: 'Karim Trabelsi',
      phone: '+21620000002',
      email: 'karim@example.com',
      address: 'Menzah, Tunis',
    }),
    upsertContact({
      fullName: 'Societe Phone Care',
      phone: '+21620000003',
      email: 'phonecare@example.com',
      address: 'Zone atelier, Tunis',
    }),
  ]);

  const [nadia, karim, fleet] = contacts;

  await Promise.all(
    [
      {
        label: 'Contrat maintenance Phone Care - Mensuel',
        contactId: fleet.id,
        startsAt: daysFromNow(-20),
        endsAt: daysFromNow(10),
        amount: 240,
        status: AbonnementStatus.ACTIVE,
        notes: 'Pack maintenance pour tablettes et smartphones professionnels.',
      },
      {
        label: 'Maintenance smartphone personnel',
        contactId: karim.id,
        startsAt: daysFromNow(-45),
        endsAt: daysFromNow(-5),
        amount: 45,
        status: AbonnementStatus.EXPIRED,
        notes: 'A relancer pour renouvellement.',
      },
    ].map((abonnement) =>
      upsertRecord(
        () => prisma.abonnement.findFirst({ where: { label: abonnement.label, contactId: abonnement.contactId } }),
        (id) => prisma.abonnement.update({ where: { id }, data: abonnement }),
        () => prisma.abonnement.create({ data: abonnement }),
      ),
    ),
  );

  await Promise.all(
    [
      {
        clientName: nadia.fullName,
        contactId: nadia.id,
        startsAt: daysFromNow(1),
        endsAt: daysFromNow(1.08),
        tableName: 'Comptoir 1',
        location: 'Atelier GSM ERP Centre',
        servicePerson: staff.fullName,
        status: ReservationStatus.BOOKED,
        notes: 'Diagnostic batterie avant midi.',
        createdBy: admin.fullName,
      },
      {
        clientName: fleet.fullName,
        contactId: fleet.id,
        startsAt: daysFromNow(2),
        endsAt: daysFromNow(2.17),
        tableName: 'Atelier diagnostic',
        location: 'Atelier GSM ERP Nord',
        servicePerson: tech1.user.fullName,
        status: ReservationStatus.WAITING,
        notes: 'Diagnostic de trois smartphones professionnels.',
        createdBy: admin.fullName,
      },
    ].map((reservation) =>
      upsertRecord(
        () =>
          prisma.reservation.findFirst({
            where: { clientName: reservation.clientName, startsAt: reservation.startsAt },
          }),
        (id) => prisma.reservation.update({ where: { id }, data: reservation }),
        () => prisma.reservation.create({ data: reservation }),
      ),
    ),
  );

  const repairs = await Promise.all([
    prisma.repair.upsert({
      where: { reference: 'REP-SEED-00001' },
      update: {
        contactId: nadia.id,
        deviceId: smartphone.id,
        deviceModelId: galaxy.id,
        technicianId: tech1.technician.id,
        status: 'WAITING_PARTS',
        estimatedCost: 320,
      },
      create: {
        reference: 'REP-SEED-00001',
        contactId: nadia.id,
        deviceId: smartphone.id,
        deviceModelId: galaxy.id,
        technicianId: tech1.technician.id,
        status: 'WAITING_PARTS',
        imei: '356000000000001',
        devicePassword: '1234',
        problem: 'Batterie faible et charge instable.',
        diagnosis: 'Batterie fatiguee, connecteur oxyde.',
        notes: 'Client a valide le devis pieces.',
        estimatedCost: 320,
        repairTypeId: repairTypes[1].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'REP-SEED-00002' },
      update: {
        contactId: karim.id,
        deviceId: smartphone.id,
        deviceModelId: iphone.id,
        technicianId: tech2.technician.id,
        status: 'IN_PROGRESS',
        estimatedCost: 520,
      },
      create: {
        reference: 'REP-SEED-00002',
        contactId: karim.id,
        deviceId: smartphone.id,
        deviceModelId: iphone.id,
        technicianId: tech2.technician.id,
        status: 'IN_PROGRESS',
        imei: '356000000000002',
        problem: 'Ecran casse apres chute.',
        diagnosis: 'Module ecran a remplacer.',
        estimatedCost: 520,
        repairTypeId: repairTypes[1].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'REP-SEED-00003' },
      update: {
        contactId: fleet.id,
        deviceId: laptop.id,
        deviceModelId: asusVivoBook.id,
        technicianId: tech1.technician.id,
        status: 'FINISHED',
        estimatedCost: 390,
        deliveredAt: null,
      },
      create: {
        reference: 'REP-SEED-00003',
        contactId: fleet.id,
        deviceId: laptop.id,
        deviceModelId: asusVivoBook.id,
        technicianId: tech1.technician.id,
        status: 'FINISHED',
        problem: 'PC portable lent avec charniere bloquee.',
        diagnosis: 'SSD remplace, charniere reglee et tests termines.',
        estimatedCost: 390,
        repairTypeId: repairTypes[0].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'REP-SEED-00004' },
      update: {
        contactId: nadia.id,
        deviceId: pc.id,
        technicianId: tech2.technician.id,
        status: 'DELIVERED',
        deliveredAt: daysFromNow(-1),
      },
      create: {
        reference: 'REP-SEED-00004',
        contactId: nadia.id,
        deviceId: pc.id,
        technicianId: tech2.technician.id,
        status: 'DELIVERED',
        problem: 'PC ne demarre pas.',
        diagnosis: 'Nettoyage et reinstallation systeme effectues.',
        estimatedCost: 180,
        repairTypeId: repairTypes[2].id,
        deliveredAt: daysFromNow(-1),
      },
    }),
  ]);

  await prisma.repairTimerLog.createMany({
    data: [
      { repairId: repairs[1].id, startedAt: daysFromNow(-0.3), endedAt: daysFromNow(-0.2), durationSec: 7200 },
      { repairId: repairs[2].id, startedAt: daysFromNow(-2), endedAt: daysFromNow(-1.9), durationSec: 3600 },
      { repairId: repairs[3].id, startedAt: daysFromNow(-3), endedAt: daysFromNow(-2.9), durationSec: 5400 },
    ],
  });

  await prisma.partRequest.create({
    data: {
      repairId: repairs[0].id,
      technicianId: tech1.technician.id,
      status: PartRequestStatus.PENDING,
      reason: 'Remplacement batterie et connecteur.',
      items: { create: [{ productId: products[1].id, quantity: 1 }, { productId: products[3].id, quantity: 1 }] },
    },
  });

  await prisma.partRequest.create({
    data: {
      repairId: repairs[1].id,
      technicianId: tech2.technician.id,
      status: PartRequestStatus.APPROVED,
      reason: 'Ecran iPhone approuve par caisse.',
      items: { create: [{ productId: products[2].id, quantity: 1 }] },
    },
  });

  await Promise.all([
    prisma.technicianCommission.create({
      data: {
        technicianId: tech1.technician.id,
        repairId: repairs[2].id,
        repairTypeId: repairTypes[0].id,
        commissionBrute: 25,
        deductionRetour: 0,
        deductionPerte: 0,
        commissionNette: 25,
      },
    }),
    prisma.technicianCommission.create({
      data: {
        technicianId: tech2.technician.id,
        repairId: repairs[3].id,
        repairTypeId: repairTypes[2].id,
        commissionBrute: 10,
        deductionRetour: 0,
        deductionPerte: 0,
        commissionNette: 10,
      },
    }),
  ]);

  const cashAccount = await prisma.paymentAccount.upsert({
    where: { accountNumber: 'CASH-SEED-001' },
    update: {
      name: 'Caisse principale',
      accountType: 'CASH',
      description: 'Caisse de test GSM ERP System',
      initialBalance: 500,
      isActive: true,
      createdBy: admin.fullName,
    },
    create: {
      name: 'Caisse principale',
      accountType: 'CASH',
      accountNumber: 'CASH-SEED-001',
      description: 'Caisse de test GSM ERP System',
      initialBalance: 500,
      isActive: true,
      createdBy: admin.fullName,
    },
  });

  const bankAccount = await prisma.paymentAccount.upsert({
    where: { accountNumber: 'BANK-SEED-001' },
    update: {
      name: 'Banque BIAT demo',
      accountType: 'BANK',
      description: 'Compte bancaire de demonstration',
      initialBalance: 2500,
      isActive: true,
      createdBy: admin.fullName,
    },
    create: {
      name: 'Banque BIAT demo',
      accountType: 'BANK',
      accountNumber: 'BANK-SEED-001',
      description: 'Compte bancaire de demonstration',
      initialBalance: 2500,
      isActive: true,
      createdBy: admin.fullName,
    },
  });

  await prisma.accountTransaction.createMany({
    data: [
      {
        accountId: cashAccount.id,
        reference: 'SEED-OPEN-CASH',
        amount: 500,
        direction: AccountTransactionDirection.CREDIT,
        paymentType: 'opening',
        description: 'Solde initial caisse',
        createdBy: admin.fullName,
      },
      {
        accountId: bankAccount.id,
        reference: 'SEED-OPEN-BANK',
        amount: 2500,
        direction: AccountTransactionDirection.CREDIT,
        paymentType: 'opening',
        description: 'Solde initial banque',
        createdBy: admin.fullName,
      },
    ],
  });

  const saleInvoice = await prisma.invoice.upsert({
    where: { number: 'INV-SEED-00001' },
    update: {
      contactId: nadia.id,
      repairId: repairs[0].id,
      subtotal: 320,
      discount: 20,
      tax: 0,
      total: 300,
      paidAmount: 100,
      paymentStatus: PaymentStatus.PARTIAL,
      documentType: InvoiceDocumentType.SALE,
      status: 'FINAL',
      shippingStatus: 'PENDING_PICKUP',
    },
    create: {
      number: 'INV-SEED-00001',
      contactId: nadia.id,
      repairId: repairs[0].id,
      subtotal: 320,
      discount: 20,
      tax: 0,
      total: 300,
      paidAmount: 100,
      paymentStatus: PaymentStatus.PARTIAL,
      documentType: InvoiceDocumentType.SALE,
      status: 'FINAL',
      shippingStatus: 'PENDING_PICKUP',
    },
  });

  const paidInvoice = await prisma.invoice.upsert({
    where: { number: 'INV-SEED-00002' },
    update: {
      contactId: fleet.id,
      repairId: repairs[2].id,
      subtotal: 390,
      discount: 0,
      tax: 0,
      total: 390,
      paidAmount: 390,
      paymentStatus: PaymentStatus.PAID,
      documentType: InvoiceDocumentType.SALE,
      status: 'FINAL',
      shippingStatus: 'READY_FOR_PICKUP',
    },
    create: {
      number: 'INV-SEED-00002',
      contactId: fleet.id,
      repairId: repairs[2].id,
      subtotal: 390,
      discount: 0,
      tax: 0,
      total: 390,
      paidAmount: 390,
      paymentStatus: PaymentStatus.PAID,
      documentType: InvoiceDocumentType.SALE,
      status: 'FINAL',
      shippingStatus: 'READY_FOR_PICKUP',
    },
  });

  await prisma.invoice.upsert({
    where: { number: 'DEV-SEED-00001' },
    update: {
      contactId: karim.id,
      subtotal: 520,
      total: 520,
      paidAmount: 0,
      paymentStatus: PaymentStatus.UNPAID,
      documentType: InvoiceDocumentType.QUOTE,
      status: 'DRAFT',
      shippingStatus: 'NOT_SHIPPED',
    },
    create: {
      number: 'DEV-SEED-00001',
      contactId: karim.id,
      subtotal: 520,
      total: 520,
      paidAmount: 0,
      paymentStatus: PaymentStatus.UNPAID,
      documentType: InvoiceDocumentType.QUOTE,
      status: 'DRAFT',
      shippingStatus: 'NOT_SHIPPED',
    },
  });

  await prisma.invoice.upsert({
    where: { number: 'RET-SEED-00001' },
    update: {
      contactId: nadia.id,
      subtotal: 70,
      total: 70,
      paidAmount: 70,
      paymentStatus: PaymentStatus.PAID,
      documentType: InvoiceDocumentType.RETURN,
      status: 'FINAL',
      shippingStatus: 'RETURNED',
    },
    create: {
      number: 'RET-SEED-00001',
      contactId: nadia.id,
      subtotal: 70,
      total: 70,
      paidAmount: 70,
      paymentStatus: PaymentStatus.PAID,
      documentType: InvoiceDocumentType.RETURN,
      status: 'FINAL',
      shippingStatus: 'RETURNED',
    },
  });

  await prisma.invoiceItem.createMany({
    data: [
      { invoiceId: saleInvoice.id, productId: products[1].id, description: products[1].name, quantity: 1, unitPrice: 180, total: 180 },
      { invoiceId: saleInvoice.id, productId: products[3].id, description: products[3].name, quantity: 1, unitPrice: 70, total: 70 },
      { invoiceId: saleInvoice.id, description: 'Main d oeuvre', quantity: 1, unitPrice: 70, total: 70 },
      { invoiceId: paidInvoice.id, productId: products[0].id, description: products[0].name, quantity: 1, unitPrice: 290, total: 290 },
      { invoiceId: paidInvoice.id, productId: products[4].id, description: 'Colle UV et consommables', quantity: 1, unitPrice: 35, total: 35 },
      { invoiceId: paidInvoice.id, description: 'Main d oeuvre diagnostic PC', quantity: 1, unitPrice: 65, total: 65 },
    ],
  });

  await prisma.payment.createMany({
    data: [
      {
        invoiceId: saleInvoice.id,
        cashierId: cashier.id,
        amount: 100,
        method: 'cash',
        reference: 'SEED-PAY-001',
        paymentAccountId: cashAccount.id,
      },
      {
        invoiceId: paidInvoice.id,
        cashierId: cashier.id,
        amount: 390,
        method: 'bank_transfer',
        reference: 'SEED-PAY-002',
        paymentAccountId: bankAccount.id,
      },
    ],
  });

  await prisma.accountTransaction.createMany({
    data: [
      {
        accountId: cashAccount.id,
        reference: 'SEED-PAY-001',
        invoiceReference: saleInvoice.number,
        amount: 100,
        direction: AccountTransactionDirection.CREDIT,
        paymentType: 'cash',
        description: 'Acompte facture Nadia',
        createdBy: cashier.fullName,
      },
      {
        accountId: bankAccount.id,
        reference: 'SEED-PAY-002',
        invoiceReference: paidInvoice.number,
        amount: 390,
        direction: AccountTransactionDirection.CREDIT,
        paymentType: 'bank_transfer',
        description: 'Paiement facture atelier professionnel',
        createdBy: cashier.fullName,
      },
    ],
  });

  await Promise.all(
    [
      {
        name: 'Promo accessoires GSM',
        priority: 1,
        category: 'Smartphones',
        location: 'Atelier GSM ERP Centre',
        amount: 10,
        amountType: 'PERCENT',
        startsAt: daysFromNow(-7),
        endsAt: daysFromNow(14),
        customerGroup: 'Professionnels',
        isActive: true,
      },
      {
        name: 'Remise SAV mobile',
        priority: 2,
        category: 'Pieces mobile',
        amount: 20,
        amountType: 'FIXED',
        startsAt: daysFromNow(-3),
        endsAt: daysFromNow(30),
        customerGroup: 'Fidele',
        isActive: true,
      },
    ].map((discount) =>
      upsertRecord(
        () => prisma.salesDiscount.findFirst({ where: { name: discount.name } }),
        (id) => prisma.salesDiscount.update({ where: { id }, data: discount }),
        () => prisma.salesDiscount.create({ data: discount }),
      ),
    ),
  );

  await prisma.salesImport.create({
    data: { fileName: 'seed-sales-import.csv', invoiceCount: seedInvoiceNumbers.length, createdBy: admin.fullName },
  });

  const purchases = await Promise.all([
    prisma.purchase.upsert({
      where: { reference: 'PUR-SEED-00001' },
      update: {
        kind: PurchaseKind.PURCHASE,
        supplierName: 'Pieces Reparation Tunis',
        status: PurchaseStatus.RECEIVED,
        paymentStatus: PurchasePaymentStatus.PAID,
        subtotal: 1200,
        tax: 228,
        shipping: 30,
        total: 1458,
        paidAmount: 1458,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'PUR-SEED-00001',
        kind: PurchaseKind.PURCHASE,
        supplierName: 'Pieces Reparation Tunis',
        location: 'Atelier GSM ERP Centre',
        status: PurchaseStatus.RECEIVED,
        paymentStatus: PurchasePaymentStatus.PAID,
        subtotal: 1200,
        tax: 228,
        shipping: 30,
        total: 1458,
        paidAmount: 1458,
        notes: 'Stock initial pieces smartphones.',
        addedBy: admin.fullName,
      },
    }),
    prisma.purchase.upsert({
      where: { reference: 'PO-SEED-00001' },
      update: {
        kind: PurchaseKind.ORDER,
        supplierName: 'Pieces Mobile Sfax',
        status: PurchaseStatus.ORDERED,
        paymentStatus: PurchasePaymentStatus.PARTIAL,
        subtotal: 900,
        tax: 171,
        shipping: 20,
        total: 1091,
        paidAmount: 300,
        addedBy: staff.fullName,
      },
      create: {
        reference: 'PO-SEED-00001',
        kind: PurchaseKind.ORDER,
        supplierName: 'Pieces Mobile Sfax',
        location: 'Atelier GSM ERP Centre',
        status: PurchaseStatus.ORDERED,
        paymentStatus: PurchasePaymentStatus.PARTIAL,
        subtotal: 900,
        tax: 171,
        shipping: 20,
        total: 1091,
        paidAmount: 300,
        notes: 'Commande ecrans et batteries.',
        addedBy: staff.fullName,
      },
    }),
    prisma.purchase.upsert({
      where: { reference: 'PREQ-SEED-00001' },
      update: {
        kind: PurchaseKind.REQUEST,
        supplierName: 'Generic Electronics',
        status: PurchaseStatus.DRAFT,
        paymentStatus: PurchasePaymentStatus.UNPAID,
        subtotal: 210,
        total: 210,
        addedBy: tech1.user.fullName,
      },
      create: {
        reference: 'PREQ-SEED-00001',
        kind: PurchaseKind.REQUEST,
        supplierName: 'Generic Electronics',
        status: PurchaseStatus.DRAFT,
        paymentStatus: PurchasePaymentStatus.UNPAID,
        subtotal: 210,
        total: 210,
        notes: 'Demande connecteurs USB-C.',
        addedBy: tech1.user.fullName,
      },
    }),
    prisma.purchase.upsert({
      where: { reference: 'PRET-SEED-00001' },
      update: {
        kind: PurchaseKind.RETURN,
        supplierName: 'Pieces Mobile Sfax',
        status: PurchaseStatus.RETURNED,
        paymentStatus: PurchasePaymentStatus.PAID,
        subtotal: 180,
        total: 180,
        paidAmount: 180,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'PRET-SEED-00001',
        kind: PurchaseKind.RETURN,
        supplierName: 'Pieces Mobile Sfax',
        status: PurchaseStatus.RETURNED,
        paymentStatus: PurchasePaymentStatus.PAID,
        subtotal: 180,
        total: 180,
        paidAmount: 180,
        notes: 'Retour batterie defectueuse.',
        addedBy: admin.fullName,
      },
    }),
  ]);

  await prisma.purchaseItem.createMany({
    data: [
      { purchaseId: purchases[0].id, productId: products[0].id, productName: products[0].name, quantity: 5, unitCost: 240, margin: 20, salePrice: 290, lineTotal: 1200 },
      { purchaseId: purchases[1].id, productId: products[2].id, productName: products[2].name, quantity: 2, unitCost: 320, margin: 30, salePrice: 450, lineTotal: 640 },
      { purchaseId: purchases[1].id, productId: products[1].id, productName: products[1].name, quantity: 2, unitCost: 130, margin: 25, salePrice: 180, lineTotal: 260 },
      { purchaseId: purchases[2].id, productId: products[3].id, productName: products[3].name, quantity: 3, unitCost: 70, margin: 0, salePrice: 70, lineTotal: 210 },
      { purchaseId: purchases[3].id, productId: products[1].id, productName: products[1].name, quantity: 1, unitCost: 180, margin: 0, salePrice: 180, lineTotal: 180 },
    ],
  });

  const transfers = await Promise.all([
    prisma.stockTransfer.upsert({
      where: { reference: 'TRF-SEED-00001' },
      update: {
        fromLocation: 'Depot pieces detachees',
        toLocation: 'Atelier GSM ERP Centre',
        status: StockTransferStatus.COMPLETED,
        shippingCharges: 15,
        total: 595,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'TRF-SEED-00001',
        fromLocation: 'Depot pieces detachees',
        toLocation: 'Atelier GSM ERP Centre',
        status: StockTransferStatus.COMPLETED,
        shippingCharges: 15,
        notes: 'Reassort boutique.',
        total: 595,
        addedBy: admin.fullName,
      },
    }),
    prisma.stockTransfer.upsert({
      where: { reference: 'TRF-SEED-00002' },
      update: {
        fromLocation: 'Atelier GSM ERP Centre',
        toLocation: 'Banc diagnostic',
        status: StockTransferStatus.IN_TRANSIT,
        shippingCharges: 0,
        total: 360,
        addedBy: staff.fullName,
      },
      create: {
        reference: 'TRF-SEED-00002',
        fromLocation: 'Atelier GSM ERP Centre',
        toLocation: 'Banc diagnostic',
        status: StockTransferStatus.IN_TRANSIT,
        notes: 'Pieces reservees pour reparations en cours.',
        total: 360,
        addedBy: staff.fullName,
      },
    }),
  ]);

  await prisma.stockTransferItem.createMany({
    data: [
      { transferId: transfers[0].id, productId: products[0].id, quantity: 2, unitPrice: 290, lineTotal: 580 },
      { transferId: transfers[1].id, productId: products[1].id, quantity: 2, unitPrice: 180, lineTotal: 360 },
    ],
  });

  const adjustments = await Promise.all([
    prisma.stockAdjustment.upsert({
      where: { reference: 'ADJ-SEED-00001' },
      update: {
        location: 'Atelier GSM ERP Centre',
        type: StockAdjustmentType.ADD,
        total: 70,
        recoveredAmount: 0,
        reason: 'Piece retrouvee apres inventaire.',
        addedBy: admin.fullName,
      },
      create: {
        reference: 'ADJ-SEED-00001',
        location: 'Atelier GSM ERP Centre',
        type: StockAdjustmentType.ADD,
        total: 70,
        recoveredAmount: 0,
        reason: 'Piece retrouvee apres inventaire.',
        addedBy: admin.fullName,
      },
    }),
    prisma.stockAdjustment.upsert({
      where: { reference: 'ADJ-SEED-00002' },
      update: {
        location: 'Atelier GSM ERP Centre',
        type: StockAdjustmentType.SUBTRACT,
        total: 35,
        recoveredAmount: 0,
        reason: 'SIM test consommee.',
        addedBy: admin.fullName,
      },
      create: {
        reference: 'ADJ-SEED-00002',
        location: 'Atelier GSM ERP Centre',
        type: StockAdjustmentType.SUBTRACT,
        total: 35,
        recoveredAmount: 0,
        reason: 'SIM test consommee.',
        addedBy: admin.fullName,
      },
    }),
  ]);

  await prisma.stockAdjustmentItem.createMany({
    data: [
      { adjustmentId: adjustments[0].id, productId: products[3].id, quantity: 1, unitPrice: 70, lineTotal: 70 },
      { adjustmentId: adjustments[1].id, productId: products[4].id, quantity: 1, unitPrice: 35, lineTotal: 35 },
    ],
  });

  const rentCategory = await upsertExpenseCategory('Loyer et locaux', 'EXP-RENT');
  const utilitiesCategory = await upsertExpenseCategory('Charges', 'EXP-UTIL');
  const internetCategory = await upsertExpenseCategory('Internet', 'EXP-NET', utilitiesCategory.id);

  await Promise.all([
    prisma.expense.upsert({
      where: { reference: 'EXP-SEED-00001' },
      update: {
        location: 'Atelier GSM ERP Centre',
        categoryId: rentCategory.id,
        expenseFor: 'Loyer atelier juillet',
        total: 1200,
        paymentAmount: 1200,
        paymentMethod: 'bank_transfer',
        paymentAccount: bankAccount.name,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'EXP-SEED-00001',
        location: 'Atelier GSM ERP Centre',
        categoryId: rentCategory.id,
        expenseFor: 'Loyer atelier juillet',
        contact: 'Proprietaire local',
        total: 1200,
        note: 'Paiement mensuel.',
        isRecurring: true,
        recurrenceEvery: 1,
        recurrenceUnit: 'MONTH',
        occurrences: 12,
        paymentAmount: 1200,
        paymentDate: daysFromNow(-2),
        paymentMethod: 'bank_transfer',
        paymentAccount: bankAccount.name,
        paymentNote: 'Virement BIAT',
        addedBy: admin.fullName,
      },
    }),
    prisma.expense.upsert({
      where: { reference: 'EXP-SEED-00002' },
      update: {
        location: 'Atelier GSM ERP Centre',
        categoryId: utilitiesCategory.id,
        subCategoryId: internetCategory.id,
        expenseFor: 'Internet fibre',
        total: 89,
        paymentAmount: 89,
        paymentMethod: 'cash',
        paymentAccount: cashAccount.name,
        addedBy: staff.fullName,
      },
      create: {
        reference: 'EXP-SEED-00002',
        location: 'Atelier GSM ERP Centre',
        categoryId: utilitiesCategory.id,
        subCategoryId: internetCategory.id,
        expenseFor: 'Internet fibre',
        applicableTax: 'TVA 19%',
        total: 89,
        note: 'Abonnement internet boutique.',
        paymentAmount: 89,
        paymentDate: daysFromNow(-1),
        paymentMethod: 'cash',
        paymentAccount: cashAccount.name,
        addedBy: staff.fullName,
      },
    }),
  ]);

  await prisma.accountTransaction.create({
    data: {
      accountId: cashAccount.id,
      reference: 'SEED-EXP-001',
      amount: 89,
      direction: AccountTransactionDirection.DEBIT,
      paymentType: 'expense',
      description: 'Paiement internet fibre',
      createdBy: staff.fullName,
    },
  });

  await Promise.all(
    [
      {
        reference: 'TASK-SEED-00001',
        title: 'Appeler les clients avec devis en attente',
        status: EssentialTaskStatus.NEW,
        priority: EssentialTaskPriority.HIGH,
        startAt: daysFromNow(0),
        endAt: daysFromNow(1),
        estimatedHours: '2',
        assignedTo: staff.fullName,
        assignedUserId: staff.id,
        documents: ['devis-en-attente.xlsx'],
      },
      {
        reference: 'TASK-SEED-00002',
        title: 'Controle inventaire pieces smartphones',
        status: EssentialTaskStatus.DONE,
        priority: EssentialTaskPriority.MEDIUM,
        startAt: daysFromNow(-2),
        endAt: daysFromNow(-1),
        estimatedHours: '1.5',
        assignedTo: admin.fullName,
        assignedUserId: admin.id,
        documents: [],
      },
    ].map((task) =>
      prisma.essentialTask.upsert({
        where: { reference: task.reference },
        update: task,
        create: task,
      }),
    ),
  );

  await Promise.all(
    [
      {
        type: 'employee',
        name: 'Mouna Caissiere',
        description: 'Profil RH caisse',
        data: { department: 'Finance', contract: 'CDI', phone: '+21655000001', salary: 1350 },
      },
      {
        type: 'leave',
        name: 'Conge Sara - Seed',
        description: 'Demande de conge de test',
        data: { employee: 'Sara Technicienne', startsAt: daysFromNow(8), endsAt: daysFromNow(10), status: 'PENDING' },
      },
    ].map((record) =>
      upsertRecord(
        () => prisma.grhRecord.findFirst({ where: { type: record.type, name: record.name } }),
        (id) => prisma.grhRecord.update({ where: { id }, data: record }),
        () => prisma.grhRecord.create({ data: record }),
      ),
    ),
  );

  await Promise.all(
    [
      {
        type: 'lead',
        name: 'Entreprise Medina - parc smartphones',
        description: 'Prospect pour contrat de reparation et maintenance mobile.',
        status: 'OPEN',
        data: { value: 4200, source: 'Facebook', nextAction: 'Envoyer proposition' },
        createdBy: staff.fullName,
      },
      {
        type: 'ticket',
        name: 'Relance contrat Phone Care',
        description: 'Prevenir avant expiration du pack maintenance.',
        status: 'FOLLOW_UP',
        data: { contact: fleet.fullName, dueAt: daysFromNow(5), channel: 'phone' },
        createdBy: admin.fullName,
      },
    ].map((record) =>
      upsertRecord(
        () => prisma.crmRecord.findFirst({ where: { type: record.type, name: record.name } }),
        (id) => prisma.crmRecord.update({ where: { id }, data: record }),
        () => prisma.crmRecord.create({ data: record }),
      ),
    ),
  );

  const projectCategory = await prisma.projectCategory.upsert({
    where: { name: 'Operations internes' },
    update: { description: 'Projets de test pour le module projet.' },
    create: { name: 'Operations internes', description: 'Projets de test pour le module projet.' },
  });

  const project = await upsertRecord(
    () => prisma.project.findFirst({ where: { name: 'Organisation atelier Phone Care' } }),
    (id) =>
      prisma.project.update({
        where: { id },
        data: {
          description: 'Reparation et maintenance smartphones pour Phone Care.',
          status: 'IN_PROGRESS',
          startDate: daysFromNow(-5),
          endDate: daysFromNow(12),
          categoryId: projectCategory.id,
          customFields: { budget: 4200, client: fleet.fullName },
          createdBy: admin.fullName,
        },
      }),
    () =>
      prisma.project.create({
        data: {
          name: 'Organisation atelier Phone Care',
          description: 'Reparation et maintenance smartphones pour Phone Care.',
          status: 'IN_PROGRESS',
          startDate: daysFromNow(-5),
          endDate: daysFromNow(12),
          categoryId: projectCategory.id,
          customFields: { budget: 4200, client: fleet.fullName },
          createdBy: admin.fullName,
        },
      }),
  );

  await prisma.projectTimeLog.deleteMany({ where: { projectId: project.id } });
  await prisma.projectTask.deleteMany({ where: { projectId: project.id } });

  const projectTasks = await prisma.$transaction([
    prisma.projectTask.create({
      data: {
        projectId: project.id,
        subject: 'Preparer les pieces smartphones',
        description: 'Preparer ecrans, batteries et consommables avant intervention.',
        status: 'DONE',
        priority: 'HIGH',
        assignedTo: tech1.user.fullName,
        startDate: daysFromNow(-4),
        endDate: daysFromNow(-3),
        customFields: { repairCount: 8 },
      },
    }),
    prisma.projectTask.create({
      data: {
        projectId: project.id,
        subject: 'Planifier installation client',
        description: 'Confirmer les creneaux avec Phone Care.',
        status: 'TODO',
        priority: 'MEDIUM',
        assignedTo: staff.fullName,
        startDate: daysFromNow(1),
        endDate: daysFromNow(3),
        customFields: { location: 'Atelier GSM ERP Nord' },
      },
    }),
  ]);

  await prisma.projectTimeLog.createMany({
    data: [
      {
        projectId: project.id,
        taskId: projectTasks[0].id,
        userName: tech1.user.fullName,
        minutes: 120,
        note: 'Configuration initiale terminee.',
        loggedAt: daysFromNow(-3),
      },
      {
        projectId: project.id,
        taskId: projectTasks[1].id,
        userName: staff.fullName,
        minutes: 35,
        note: 'Premier appel de coordination.',
        loggedAt: daysFromNow(-1),
      },
    ],
  });

  await prisma.projectSettings.upsert({
    where: { id: 'default' },
    update: {
      customField1: 'Budget',
      customField2: 'Client',
      customField3: 'Lieu',
      customField4: 'Priorite operationnelle',
    },
    create: {
      id: 'default',
      customField1: 'Budget',
      customField2: 'Client',
      customField3: 'Lieu',
      customField4: 'Priorite operationnelle',
    },
  });

  console.log({
    message: 'Seed data ready for all modules.',
    users: {
      admin: admin.email,
      cashier: cashier.email,
      staff: staff.email,
      technicians: techUsers.map(({ user }) => user.email),
      password: TEST_PASSWORD,
    },
    modules: [
      'auth/users/roles',
      'contacts/abonnements/reservations',
      'products/devices/brands',
      'repairs/technicians/part requests/commissions',
      'sales/invoices/payments/cashier',
      'purchases',
      'stock transfers/adjustments/movements',
      'expenses/payment accounts',
      'essential tasks',
      'CRM/GRH',
      'projects/reports data',
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());

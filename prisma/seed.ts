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
  const seedInvoiceNumbers = [
    'INV-SEED-00001',
    'INV-SEED-00002',
    'INV-SEED-00003',
    'DEV-SEED-00001',
    'DEV-SEED-00002',
    'RET-SEED-00001',
  ];
  const seedPurchaseRefs = ['PUR-SEED-00001', 'PO-SEED-00001', 'PO-SEED-00002', 'PREQ-SEED-00001', 'PRET-SEED-00001'];
  const seedTransferRefs = ['TRF-SEED-00001', 'TRF-SEED-00002', 'TRF-SEED-00003'];
  const seedAdjustmentRefs = ['ADJ-SEED-00001', 'ADJ-SEED-00002'];
  const seedInstallationRefs = [
    'GPS-SEED-00001',
    'GPS-SEED-00002',
    'GPS-SEED-00003',
    'GPS-SEED-00004',
    'GPS-SEED-00005',
    'GPS-SEED-00006',
    'GPS-SEED-00007',
  ];
  const legacyRepairRefs = ['REP-SEED-00001', 'REP-SEED-00002', 'REP-SEED-00003', 'REP-SEED-00004'];
  const legacyProductSkus = ['BAT-SAM-001', 'SCR-IPH-014', 'CON-USBC-001'];
  const legacyDomain = `g${'sm'}.local`;
  const legacyInstallationTypeNames = [`Reparation ${'mobile'}`, 'Diagnostic avance'];

  await prisma.payment.deleteMany({ where: { reference: { in: ['SEED-PAY-001', 'SEED-PAY-002', 'SEED-PAY-003'] } } });
  await prisma.accountTransaction.deleteMany({
    where: { reference: { in: ['SEED-OPEN-CASH', 'SEED-OPEN-BANK', 'SEED-PAY-001', 'SEED-PAY-002', 'SEED-PAY-003', 'SEED-EXP-001'] } },
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

  const existingRepairs = await prisma.repair.findMany({
    where: { reference: { in: [...seedInstallationRefs, ...legacyRepairRefs] } },
  });
  await prisma.repairTimerLog.deleteMany({ where: { repairId: { in: existingRepairs.map((repair) => repair.id) } } });
  await prisma.technicianCommission.deleteMany({ where: { repairId: { in: existingRepairs.map((repair) => repair.id) } } });
  await prisma.partRequest.deleteMany({ where: { repairId: { in: existingRepairs.map((repair) => repair.id) } } });
  await prisma.repair.deleteMany({ where: { id: { in: existingRepairs.map((repair) => repair.id) } } });
  await prisma.repairType.deleteMany({ where: { name: { in: legacyInstallationTypeNames } } });
  const legacyProducts = await prisma.product.findMany({ where: { sku: { in: legacyProductSkus } } });
  await prisma.stockMovement.deleteMany({ where: { productId: { in: legacyProducts.map((product) => product.id) } } });
  await prisma.product.deleteMany({ where: { sku: { in: legacyProductSkus } } });

  const roleDefinitions = await Promise.all(
    [
      { name: 'Administrateur', homePath: '/accueil', description: 'Full access to every module.' },
      { name: 'Technicien', homePath: '/technician/tasks', description: 'GPS installation workflow and part requests.' },
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

  for (const [oldEmail, newEmail] of [
    [`cashier@${legacyDomain}`, 'cashier@gps.local'],
    [`staff@${legacyDomain}`, 'staff@gps.local'],
    [`tech1@${legacyDomain}`, 'tech1@gps.local'],
    [`tech2@${legacyDomain}`, 'tech2@gps.local'],
  ] as const) {
    const [legacyUser, gpsUser] = await Promise.all([
      prisma.user.findUnique({ where: { email: oldEmail } }),
      prisma.user.findUnique({ where: { email: newEmail } }),
    ]);

    if (legacyUser && !gpsUser) {
      await prisma.user.update({ where: { id: legacyUser.id }, data: { email: newEmail } });
    }
  }

  const defaultStatuses = [
    { name: 'RECEIVED', label: 'Installation recue', color: '#2563eb' },
    { name: 'ASSIGNED', label: 'Installation affectee', color: '#4f46e5' },
    { name: 'IN_PROGRESS', label: 'Installation en cours', color: '#f59e0b' },
    { name: 'PAUSED', label: 'En pause', color: '#64748b' },
    { name: 'WAITING_PARTS', label: 'Materiel GPS en attente', color: '#db2777' },
    { name: 'PARTS_READY', label: 'Materiel GPS disponible', color: '#059669' },
    { name: 'FINISHED', label: 'Installation terminee', color: '#16a34a' },
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
    update: { fullName: 'Admin GPS Tunisie', role: UserRole.ADMIN, roleId: adminRole.id, isActive: true },
    create: {
      email: 'aziz5.badis@gmail.com',
      fullName: 'Admin GPS Tunisie',
      role: UserRole.ADMIN,
      roleId: adminRole.id,
      passwordHash,
    },
  });

  const additionalAdmins = await Promise.all(
    [
      { email: 'Aminebenjemaamohamed@gmail.com', fullName: 'Amine Ben Jemaa Mohamed' },
      { email: 'Contact@gps-tunisie.tn', fullName: 'GPS Tunisie Contact' },
      { email: 'Progsm06@gmail.com', fullName: 'Pro GSM 06' },
    ].map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: { fullName: user.fullName, role: UserRole.ADMIN, roleId: adminRole.id, isActive: true },
        create: {
          ...user,
          role: UserRole.ADMIN,
          roleId: adminRole.id,
          passwordHash,
        },
      }),
    ),
  );

  const cashier = await prisma.user.upsert({
    where: { email: 'cashier@gps.local' },
    update: { fullName: 'Mouna Caissiere', role: UserRole.CASHIER, roleId: cashierRole.id, isActive: true },
    create: {
      email: 'cashier@gps.local',
      fullName: 'Mouna Caissiere',
      role: UserRole.CASHIER,
      roleId: cashierRole.id,
      passwordHash,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@gps.local' },
    update: { fullName: 'Nour Operations', role: UserRole.STAFF, roleId: staffRole.id, isActive: true },
    create: {
      email: 'staff@gps.local',
      fullName: 'Nour Operations',
      role: UserRole.STAFF,
      roleId: staffRole.id,
      passwordHash,
    },
  });

  const techUsers = await Promise.all(
    [
      { email: 'tech1@gps.local', fullName: 'Yassine Technicien', specialty: 'Installation traceurs GPS vehicule' },
      { email: 'tech2@gps.local', fullName: 'Sara Technicienne', specialty: 'Configuration plateformes GPS et cablage' },
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
      { name: 'Installation GPS standard', commissionRate: 25, managedByAdmin: false },
      { name: 'Installation GPS avec relais', commissionRate: 35, managedByAdmin: false },
      { name: 'Configuration plateforme GPS', commissionRate: 10, managedByAdmin: true },
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

  const [teltonika, concox, ruptela, gpsTunisie, genericBrand] = await Promise.all(
    ['Teltonika', 'Concox', 'Ruptela', 'GPS Tunisie', 'Generic'].map((name) =>
      prisma.brand.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  const [tracker, relayDevice, antennaDevice, simDevice, accessoryDevice] = await Promise.all(
    ['Traceur GPS', 'Relais coupure moteur', 'Antenne GPS', 'Carte SIM M2M', 'Accessoire installation'].map((name) =>
      prisma.device.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  const [teltonikaFmb, teltonikaFmc, concoxGt, ruptelaEco, relayModel] = await Promise.all([
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: teltonika.id, deviceId: tracker.id, name: 'FMB920' } },
      update: {},
      create: { brandId: teltonika.id, deviceId: tracker.id, name: 'FMB920' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: teltonika.id, deviceId: tracker.id, name: 'FMC130' } },
      update: {},
      create: { brandId: teltonika.id, deviceId: tracker.id, name: 'FMC130' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: concox.id, deviceId: tracker.id, name: 'GT06N' } },
      update: {},
      create: { brandId: concox.id, deviceId: tracker.id, name: 'GT06N' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: ruptela.id, deviceId: tracker.id, name: 'Eco4 Light' } },
      update: {},
      create: { brandId: ruptela.id, deviceId: tracker.id, name: 'Eco4 Light' },
    }),
    prisma.deviceModel.upsert({
      where: { brandId_deviceId_name: { brandId: gpsTunisie.id, deviceId: relayDevice.id, name: 'Relais 12V GPS' } },
      update: {},
      create: { brandId: gpsTunisie.id, deviceId: relayDevice.id, name: 'Relais 12V GPS' },
    }),
  ]);

  const products = await Promise.all(
    [
      {
        name: 'Traceur GPS Teltonika FMB920',
        sku: 'GPS-FMB920',
        barcode: '619000000001',
        brand: 'Teltonika',
        category: 'Traceurs GPS',
        unit: 'Piece',
        warranty: '12 mois',
        productType: 'Stockable',
        description: 'Traceur GPS compact pour vehicule.',
        unitPrice: 290,
        taxRate: 19,
        stockQty: 18,
        minStockQty: 5,
      },
      {
        name: 'Relais coupure moteur 12V',
        sku: 'GPS-RELAY-12V',
        barcode: '619000000002',
        brand: 'GPS Tunisie',
        category: 'Accessoires GPS',
        unit: 'Piece',
        warranty: '6 mois',
        productType: 'Piece detachee',
        description: 'Relais pour coupure moteur pilotee par traceur GPS.',
        unitPrice: 45,
        taxRate: 19,
        stockQty: 30,
        minStockQty: 8,
      },
      {
        name: 'Antenne GPS externe',
        sku: 'GPS-ANT-EXT',
        barcode: '619000000003',
        brand: 'Generic',
        category: 'Accessoires GPS',
        unit: 'Piece',
        warranty: '6 mois',
        productType: 'Piece detachee',
        description: 'Antenne GPS externe pour vehicules avec reception difficile.',
        unitPrice: 38,
        taxRate: 19,
        stockQty: 24,
        minStockQty: 6,
      },
      {
        name: 'Faisceau cablage GPS',
        sku: 'GPS-CABLE-KIT',
        barcode: '619000000004',
        brand: 'Generic',
        category: 'Accessoires GPS',
        unit: 'Piece',
        warranty: '1 mois',
        productType: 'Piece detachee',
        description: 'Kit de cablage pour alimentation, masse et accessoires GPS.',
        unitPrice: 28,
        taxRate: 19,
        stockQty: 40,
        minStockQty: 10,
      },
      {
        name: 'Carte SIM M2M',
        sku: 'SIM-M2M-001',
        barcode: '619000000005',
        brand: 'GPS Tunisie',
        category: 'Abonnement',
        unit: 'Piece',
        warranty: '0',
        productType: 'Service',
        description: 'Carte SIM pour abonnement de suivi.',
        unitPrice: 35,
        taxRate: 7,
        stockQty: 100,
        minStockQty: 20,
      },
      {
        name: 'Traceur GPS Teltonika FMC130',
        sku: 'GPS-FMC130',
        barcode: '619000000006',
        brand: 'Teltonika',
        category: 'Traceurs GPS',
        unit: 'Piece',
        warranty: '12 mois',
        productType: 'Stockable',
        description: 'Traceur 4G avance avec entrees/sorties pour flotte professionnelle.',
        unitPrice: 360,
        taxRate: 19,
        stockQty: 14,
        minStockQty: 4,
      },
      {
        name: 'Traceur GPS Concox GT06N',
        sku: 'GPS-GT06N',
        barcode: '619000000007',
        brand: 'Concox',
        category: 'Traceurs GPS',
        unit: 'Piece',
        warranty: '12 mois',
        productType: 'Stockable',
        description: 'Traceur GPS economique pour vehicules particuliers.',
        unitPrice: 185,
        taxRate: 19,
        stockQty: 22,
        minStockQty: 6,
      },
      {
        name: 'Boitier etanche GPS',
        sku: 'GPS-CASE-IP65',
        barcode: '619000000008',
        brand: 'GPS Tunisie',
        category: 'Accessoires GPS',
        unit: 'Piece',
        warranty: '6 mois',
        productType: 'Piece detachee',
        description: 'Boitier de protection IP65 pour installations exterieures.',
        unitPrice: 32,
        taxRate: 19,
        stockQty: 18,
        minStockQty: 5,
      },
      {
        name: 'Activation plateforme GPS',
        sku: 'GPS-ACTIVATION',
        barcode: '619000000009',
        brand: 'GPS Tunisie',
        category: 'Service GPS',
        unit: 'Service',
        warranty: '0',
        productType: 'Service',
        description: 'Activation client, configuration geofencing et alertes.',
        unitPrice: 55,
        taxRate: 7,
        stockQty: 0,
        minStockQty: 0,
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
      address: 'Ariana, Tunisie',
    }),
    upsertContact({
      fullName: 'Karim Trabelsi',
      phone: '+21620000002',
      email: 'karim@example.com',
      address: 'Lac 2, Tunis',
    }),
    upsertContact({
      fullName: 'Societe Delta Fleet',
      phone: '+21620000003',
      email: 'fleet@example.com',
      address: 'Zone industrielle Ben Arous',
    }),
    upsertContact({
      fullName: 'Hotel Medina Transport',
      phone: '+21620000004',
      email: 'transport@hotelmedina.example.com',
      address: 'La Marsa, Tunis',
    }),
    upsertContact({
      fullName: 'Sami Louati',
      phone: '+21620000005',
      email: 'sami@example.com',
      address: 'Menzah 6, Tunis',
    }),
    upsertContact({
      fullName: 'Logistique Carthage',
      phone: '+21620000006',
      email: 'ops@carthage-logistique.example.com',
      address: 'Port de Rades',
    }),
    upsertContact({
      fullName: 'Clinique El Amen',
      phone: '+21620000007',
      email: 'maintenance@elamen.example.com',
      address: 'Mutuelleville, Tunis',
    }),
    upsertContact({
      fullName: 'Taxi Express Tunis',
      phone: '+21620000008',
      email: 'dispatch@taxiexpress.example.com',
      address: 'Centre urbain nord, Tunis',
    }),
    upsertContact({
      fullName: 'Boulangerie Le Soleil',
      phone: '+21620000009',
      email: 'contact@lesoleil.example.com',
      address: 'Sidi Bou Said, Tunis',
    }),
  ]);

  const [nadia, karim, fleet, hotel, sami, logistics, clinic, taxiExpress, bakery] = contacts;

  await Promise.all(
    [
      {
        label: 'Suivi GPS flotte Delta - Mensuel',
        contactId: fleet.id,
        startsAt: daysFromNow(-20),
        endsAt: daysFromNow(10),
        amount: 240,
        status: AbonnementStatus.ACTIVE,
        notes: 'Pack 8 vehicules avec alertes temps reel.',
      },
      {
        label: 'Suivi GPS personnel',
        contactId: karim.id,
        startsAt: daysFromNow(-45),
        endsAt: daysFromNow(-5),
        amount: 45,
        status: AbonnementStatus.EXPIRED,
        notes: 'A relancer pour renouvellement.',
      },
      {
        label: 'Suivi navettes Hotel Medina - Trimestriel',
        contactId: hotel.id,
        startsAt: daysFromNow(-10),
        endsAt: daysFromNow(80),
        amount: 360,
        status: AbonnementStatus.ACTIVE,
        notes: 'Pack 4 navettes avec rapports mensuels.',
      },
      {
        label: 'Suivi GPS poids lourds Carthage',
        contactId: logistics.id,
        startsAt: daysFromNow(2),
        endsAt: daysFromNow(32),
        amount: 180,
        status: AbonnementStatus.PAUSED,
        notes: 'Activation apres installation des deux premiers camions.',
      },
      {
        label: 'Suivi GPS ambulances El Amen',
        contactId: clinic.id,
        startsAt: daysFromNow(-28),
        endsAt: daysFromNow(2),
        amount: 150,
        status: AbonnementStatus.ACTIVE,
        notes: 'Renouvellement urgent pour 3 ambulances.',
      },
      {
        label: 'Suivi GPS flotte Taxi Express',
        contactId: taxiExpress.id,
        startsAt: daysFromNow(-26),
        endsAt: daysFromNow(4),
        amount: 210,
        status: AbonnementStatus.ACTIVE,
        notes: 'Pack 7 vehicules, relance avant suspension.',
      },
      {
        label: 'Suivi GPS livraison Le Soleil',
        contactId: bakery.id,
        startsAt: daysFromNow(-24),
        endsAt: daysFromNow(6),
        amount: 90,
        status: AbonnementStatus.ACTIVE,
        notes: 'Deux utilitaires de livraison a renouveler cette semaine.',
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
        location: 'GPS Tunisie Ariana',
        servicePerson: staff.fullName,
        status: ReservationStatus.BOOKED,
        notes: 'Verification vehicule et pose traceur avant midi.',
        createdBy: admin.fullName,
      },
      {
        clientName: fleet.fullName,
        contactId: fleet.id,
        startsAt: daysFromNow(2),
        endsAt: daysFromNow(2.17),
        tableName: 'Atelier GPS',
        location: 'GPS Tunisie Ben Arous',
        servicePerson: tech1.user.fullName,
        status: ReservationStatus.WAITING,
        notes: 'Installation sur deux voitures.',
        createdBy: admin.fullName,
      },
      {
        clientName: hotel.fullName,
        contactId: hotel.id,
        startsAt: daysFromNow(3),
        endsAt: daysFromNow(3.25),
        tableName: 'Atelier flotte',
        location: 'GPS Tunisie Ariana',
        servicePerson: tech2.user.fullName,
        status: ReservationStatus.BOOKED,
        notes: 'Pose de quatre traceurs sur navettes hotel.',
        createdBy: staff.fullName,
      },
      {
        clientName: logistics.fullName,
        contactId: logistics.id,
        startsAt: daysFromNow(5),
        endsAt: daysFromNow(5.2),
        tableName: 'Intervention terrain',
        location: 'Port de Rades',
        servicePerson: tech1.user.fullName,
        status: ReservationStatus.WAITING,
        notes: 'Controle cablage et boitiers etanches pour camions.',
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
      where: { reference: 'GPS-SEED-00001' },
      update: {
        contactId: nadia.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmb.id,
        technicianId: tech1.technician.id,
        status: 'WAITING_PARTS',
        estimatedCost: 363,
      },
      create: {
        reference: 'GPS-SEED-00001',
        contactId: nadia.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmb.id,
        technicianId: tech1.technician.id,
        status: 'WAITING_PARTS',
        imei: '356000000000001',
        problem: 'Installation GPS avec relais coupure moteur sur vehicule particulier.',
        diagnosis: 'Materiel prepare, relais et faisceau en attente de validation stock.',
        notes: 'Client a valide le devis installation GPS.',
        estimatedCost: 363,
        repairTypeId: repairTypes[1].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'GPS-SEED-00002' },
      update: {
        contactId: karim.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmc.id,
        technicianId: tech2.technician.id,
        status: 'IN_PROGRESS',
        estimatedCost: 398,
      },
      create: {
        reference: 'GPS-SEED-00002',
        contactId: karim.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmc.id,
        technicianId: tech2.technician.id,
        status: 'IN_PROGRESS',
        imei: '356000000000002',
        problem: 'Pose traceur 4G et configuration application client.',
        diagnosis: 'Cablage alimentation termine, configuration plateforme en cours.',
        estimatedCost: 398,
        repairTypeId: repairTypes[1].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'GPS-SEED-00003' },
      update: {
        contactId: fleet.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmb.id,
        technicianId: tech1.technician.id,
        status: 'FINISHED',
        estimatedCost: 390,
        deliveredAt: null,
      },
      create: {
        reference: 'GPS-SEED-00003',
        contactId: fleet.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmb.id,
        technicianId: tech1.technician.id,
        status: 'FINISHED',
        problem: 'Installer un traceur GPS et tester les alertes.',
        diagnosis: 'Vehicule pret pour livraison client.',
        estimatedCost: 390,
        repairTypeId: repairTypes[0].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'GPS-SEED-00004' },
      update: {
        contactId: nadia.id,
        deviceId: tracker.id,
        deviceModelId: concoxGt.id,
        technicianId: tech2.technician.id,
        status: 'DELIVERED',
        deliveredAt: daysFromNow(-1),
      },
      create: {
        reference: 'GPS-SEED-00004',
        contactId: nadia.id,
        deviceId: tracker.id,
        deviceModelId: concoxGt.id,
        technicianId: tech2.technician.id,
        status: 'DELIVERED',
        problem: 'Installation GPS simple sur vehicule personnel.',
        diagnosis: 'Traceur pose, signal GPS confirme, application client activee.',
        estimatedCost: 180,
        repairTypeId: repairTypes[2].id,
        deliveredAt: daysFromNow(-1),
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'GPS-SEED-00005' },
      update: {
        contactId: hotel.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmc.id,
        technicianId: tech2.technician.id,
        status: 'ASSIGNED',
        estimatedCost: 1660,
        deliveredAt: null,
      },
      create: {
        reference: 'GPS-SEED-00005',
        contactId: hotel.id,
        deviceId: tracker.id,
        deviceModelId: teltonikaFmc.id,
        technicianId: tech2.technician.id,
        status: 'ASSIGNED',
        problem: 'Installer quatre traceurs GPS 4G sur navettes hotel avec alertes geofencing.',
        diagnosis: 'Materiel reserve et planning confirme avec le responsable transport.',
        notes: 'Prevoir activation plateforme pour 4 vehicules.',
        estimatedCost: 1660,
        repairTypeId: repairTypes[1].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'GPS-SEED-00006' },
      update: {
        contactId: logistics.id,
        deviceId: tracker.id,
        deviceModelId: ruptelaEco.id,
        technicianId: tech1.technician.id,
        status: 'RECEIVED',
        estimatedCost: 820,
        deliveredAt: null,
      },
      create: {
        reference: 'GPS-SEED-00006',
        contactId: logistics.id,
        deviceId: tracker.id,
        deviceModelId: ruptelaEco.id,
        technicianId: tech1.technician.id,
        status: 'RECEIVED',
        problem: 'Preparer installation de deux traceurs GPS sur camions frigorifiques.',
        diagnosis: 'Controle faisceau et boitier etanche requis avant sortie terrain.',
        notes: 'Client demande rapport de temperature dans la plateforme.',
        estimatedCost: 820,
        repairTypeId: repairTypes[0].id,
      },
    }),
    prisma.repair.upsert({
      where: { reference: 'GPS-SEED-00007' },
      update: {
        contactId: sami.id,
        deviceId: tracker.id,
        deviceModelId: concoxGt.id,
        technicianId: tech2.technician.id,
        status: 'CANCELLED',
        estimatedCost: 240,
        deliveredAt: null,
      },
      create: {
        reference: 'GPS-SEED-00007',
        contactId: sami.id,
        deviceId: tracker.id,
        deviceModelId: concoxGt.id,
        technicianId: tech2.technician.id,
        status: 'CANCELLED',
        problem: 'Demande installation GPS economique sur voiture personnelle.',
        diagnosis: 'Client a reporte le projet apres devis.',
        notes: 'Relancer le mois prochain.',
        estimatedCost: 240,
        repairTypeId: repairTypes[0].id,
      },
    }),
  ]);

  await prisma.repairTimerLog.createMany({
    data: [
      { repairId: repairs[1].id, startedAt: daysFromNow(-0.3), endedAt: daysFromNow(-0.2), durationSec: 7200 },
      { repairId: repairs[2].id, startedAt: daysFromNow(-2), endedAt: daysFromNow(-1.9), durationSec: 3600 },
      { repairId: repairs[3].id, startedAt: daysFromNow(-3), endedAt: daysFromNow(-2.9), durationSec: 5400 },
      { repairId: repairs[4].id, startedAt: daysFromNow(-0.1), endedAt: daysFromNow(-0.05), durationSec: 4200 },
      { repairId: repairs[5].id, startedAt: daysFromNow(-1.4), endedAt: daysFromNow(-1.35), durationSec: 3900 },
    ],
  });

  await prisma.partRequest.create({
    data: {
      repairId: repairs[0].id,
      technicianId: tech1.technician.id,
      status: PartRequestStatus.PENDING,
      reason: 'Relais coupure moteur et faisceau requis pour installation.',
      items: { create: [{ productId: products[1].id, quantity: 1 }, { productId: products[3].id, quantity: 1 }] },
    },
  });

  await prisma.partRequest.create({
    data: {
      repairId: repairs[1].id,
      technicianId: tech2.technician.id,
      status: PartRequestStatus.APPROVED,
      reason: 'Antenne externe approuvee pour reception GPS.',
      items: { create: [{ productId: products[2].id, quantity: 1 }] },
    },
  });

  await prisma.partRequest.create({
    data: {
      repairId: repairs[5].id,
      technicianId: tech1.technician.id,
      status: PartRequestStatus.DELIVERED,
      reason: 'Boitiers etanches et cartes SIM M2M livres pour camions.',
      items: { create: [{ productId: products[7].id, quantity: 2 }, { productId: products[4].id, quantity: 2 }] },
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
      description: 'Caisse de test GPS Tunisie',
      initialBalance: 500,
      isActive: true,
      createdBy: admin.fullName,
    },
    create: {
      name: 'Caisse principale',
      accountType: 'CASH',
      accountNumber: 'CASH-SEED-001',
      description: 'Caisse de test GPS Tunisie',
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
      subtotal: 363,
      discount: 0,
      tax: 0,
      total: 363,
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
      subtotal: 363,
      discount: 0,
      tax: 0,
      total: 363,
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

  const hotelInvoice = await prisma.invoice.upsert({
    where: { number: 'INV-SEED-00003' },
    update: {
      contactId: hotel.id,
      repairId: repairs[4].id,
      subtotal: 1660,
      discount: 60,
      tax: 0,
      total: 1600,
      paidAmount: 800,
      paymentStatus: PaymentStatus.PARTIAL,
      documentType: InvoiceDocumentType.SALE,
      status: 'FINAL',
      shippingStatus: 'NOT_SHIPPED',
    },
    create: {
      number: 'INV-SEED-00003',
      contactId: hotel.id,
      repairId: repairs[4].id,
      subtotal: 1660,
      discount: 60,
      tax: 0,
      total: 1600,
      paidAmount: 800,
      paymentStatus: PaymentStatus.PARTIAL,
      documentType: InvoiceDocumentType.SALE,
      status: 'FINAL',
      shippingStatus: 'NOT_SHIPPED',
    },
  });

  await prisma.invoice.upsert({
    where: { number: 'DEV-SEED-00001' },
    update: {
      contactId: karim.id,
      subtotal: 398,
      total: 398,
      paidAmount: 0,
      paymentStatus: PaymentStatus.UNPAID,
      documentType: InvoiceDocumentType.QUOTE,
      status: 'DRAFT',
      shippingStatus: 'NOT_SHIPPED',
    },
    create: {
      number: 'DEV-SEED-00001',
      contactId: karim.id,
      subtotal: 398,
      total: 398,
      paidAmount: 0,
      paymentStatus: PaymentStatus.UNPAID,
      documentType: InvoiceDocumentType.QUOTE,
      status: 'DRAFT',
      shippingStatus: 'NOT_SHIPPED',
    },
  });

  await prisma.invoice.upsert({
    where: { number: 'DEV-SEED-00002' },
    update: {
      contactId: logistics.id,
      repairId: repairs[5].id,
      subtotal: 820,
      total: 820,
      paidAmount: 0,
      paymentStatus: PaymentStatus.UNPAID,
      documentType: InvoiceDocumentType.QUOTE,
      status: 'DRAFT',
      shippingStatus: 'NOT_SHIPPED',
    },
    create: {
      number: 'DEV-SEED-00002',
      contactId: logistics.id,
      repairId: repairs[5].id,
      subtotal: 820,
      total: 820,
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
      subtotal: 28,
      total: 28,
      paidAmount: 28,
      paymentStatus: PaymentStatus.PAID,
      documentType: InvoiceDocumentType.RETURN,
      status: 'FINAL',
      shippingStatus: 'RETURNED',
    },
    create: {
      number: 'RET-SEED-00001',
      contactId: nadia.id,
      subtotal: 28,
      total: 28,
      paidAmount: 28,
      paymentStatus: PaymentStatus.PAID,
      documentType: InvoiceDocumentType.RETURN,
      status: 'FINAL',
      shippingStatus: 'RETURNED',
    },
  });

  await prisma.invoiceItem.createMany({
    data: [
      { invoiceId: saleInvoice.id, productId: products[0].id, description: products[0].name, quantity: 1, unitPrice: 290, total: 290 },
      { invoiceId: saleInvoice.id, productId: products[1].id, description: products[1].name, quantity: 1, unitPrice: 45, total: 45 },
      { invoiceId: saleInvoice.id, productId: products[3].id, description: products[3].name, quantity: 1, unitPrice: 28, total: 28 },
      { invoiceId: paidInvoice.id, productId: products[0].id, description: products[0].name, quantity: 1, unitPrice: 290, total: 290 },
      { invoiceId: paidInvoice.id, productId: products[4].id, description: 'Activation SIM M2M', quantity: 1, unitPrice: 35, total: 35 },
      { invoiceId: paidInvoice.id, description: 'Installation vehicule', quantity: 1, unitPrice: 65, total: 65 },
      { invoiceId: hotelInvoice.id, productId: products[5].id, description: products[5].name, quantity: 4, unitPrice: 360, total: 1440 },
      { invoiceId: hotelInvoice.id, productId: products[8].id, description: products[8].name, quantity: 4, unitPrice: 55, total: 220 },
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
      {
        invoiceId: hotelInvoice.id,
        cashierId: cashier.id,
        amount: 800,
        method: 'bank_transfer',
        reference: 'SEED-PAY-003',
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
        description: 'Paiement facture flotte',
        createdBy: cashier.fullName,
      },
      {
        accountId: bankAccount.id,
        reference: 'SEED-PAY-003',
        invoiceReference: hotelInvoice.number,
        amount: 800,
        direction: AccountTransactionDirection.CREDIT,
        paymentType: 'bank_transfer',
        description: 'Acompte installation navettes hotel',
        createdBy: cashier.fullName,
      },
    ],
  });

  await Promise.all(
    [
      {
        name: 'Promo accessoires GPS',
        priority: 1,
        category: 'Traceurs GPS',
        location: 'GPS Tunisie Ariana',
        amount: 10,
        amountType: 'PERCENT',
        startsAt: daysFromNow(-7),
        endsAt: daysFromNow(14),
        customerGroup: 'Professionnels',
        isActive: true,
      },
      {
        name: 'Pack installation GPS avec relais',
        priority: 2,
        category: 'Accessoires GPS',
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
        supplierName: 'Teltonika Distributor Tunisia',
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
        supplierName: 'Teltonika Distributor Tunisia',
        location: 'GPS Tunisie Ariana',
        status: PurchaseStatus.RECEIVED,
        paymentStatus: PurchasePaymentStatus.PAID,
        subtotal: 1200,
        tax: 228,
        shipping: 30,
        total: 1458,
        paidAmount: 1458,
        notes: 'Stock initial traceurs GPS.',
        addedBy: admin.fullName,
      },
    }),
    prisma.purchase.upsert({
      where: { reference: 'PO-SEED-00001' },
      update: {
        kind: PurchaseKind.ORDER,
        supplierName: 'GPS Accessoires Sfax',
        status: PurchaseStatus.ORDERED,
        paymentStatus: PurchasePaymentStatus.PARTIAL,
        subtotal: 415,
        tax: 78.85,
        shipping: 20,
        total: 513.85,
        paidAmount: 300,
        addedBy: staff.fullName,
      },
      create: {
        reference: 'PO-SEED-00001',
        kind: PurchaseKind.ORDER,
        supplierName: 'GPS Accessoires Sfax',
        location: 'GPS Tunisie Ariana',
        status: PurchaseStatus.ORDERED,
        paymentStatus: PurchasePaymentStatus.PARTIAL,
        subtotal: 415,
        tax: 78.85,
        shipping: 20,
        total: 513.85,
        paidAmount: 300,
        notes: 'Commande antennes, relais et faisceaux GPS.',
        addedBy: staff.fullName,
      },
    }),
    prisma.purchase.upsert({
      where: { reference: 'PREQ-SEED-00001' },
      update: {
        kind: PurchaseKind.REQUEST,
        supplierName: 'GPS Accessoires Sfax',
        status: PurchaseStatus.DRAFT,
        paymentStatus: PurchasePaymentStatus.UNPAID,
        subtotal: 84,
        total: 84,
        addedBy: tech1.user.fullName,
      },
      create: {
        reference: 'PREQ-SEED-00001',
        kind: PurchaseKind.REQUEST,
        supplierName: 'GPS Accessoires Sfax',
        status: PurchaseStatus.DRAFT,
        paymentStatus: PurchasePaymentStatus.UNPAID,
        subtotal: 84,
        total: 84,
        notes: 'Demande faisceaux de cablage GPS.',
        addedBy: tech1.user.fullName,
      },
    }),
    prisma.purchase.upsert({
      where: { reference: 'PO-SEED-00002' },
      update: {
        kind: PurchaseKind.ORDER,
        supplierName: 'Ruptela North Africa',
        status: PurchaseStatus.ORDERED,
        paymentStatus: PurchasePaymentStatus.UNPAID,
        subtotal: 1290,
        tax: 245.1,
        shipping: 45,
        total: 1580.1,
        paidAmount: 0,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'PO-SEED-00002',
        kind: PurchaseKind.ORDER,
        supplierName: 'Ruptela North Africa',
        location: 'GPS Tunisie Ariana',
        status: PurchaseStatus.ORDERED,
        paymentStatus: PurchasePaymentStatus.UNPAID,
        subtotal: 1290,
        tax: 245.1,
        shipping: 45,
        total: 1580.1,
        paidAmount: 0,
        notes: 'Commande traceurs 4G et boitiers etanches pour clients flotte.',
        addedBy: admin.fullName,
      },
    }),
    prisma.purchase.upsert({
      where: { reference: 'PRET-SEED-00001' },
      update: {
        kind: PurchaseKind.RETURN,
        supplierName: 'GPS Accessoires Sfax',
        status: PurchaseStatus.RETURNED,
        paymentStatus: PurchasePaymentStatus.PAID,
        subtotal: 45,
        total: 45,
        paidAmount: 45,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'PRET-SEED-00001',
        kind: PurchaseKind.RETURN,
        supplierName: 'GPS Accessoires Sfax',
        status: PurchaseStatus.RETURNED,
        paymentStatus: PurchasePaymentStatus.PAID,
        subtotal: 45,
        total: 45,
        paidAmount: 45,
        notes: 'Retour relais non conforme.',
        addedBy: admin.fullName,
      },
    }),
  ]);

  await prisma.purchaseItem.createMany({
    data: [
      { purchaseId: purchases[0].id, productId: products[0].id, productName: products[0].name, quantity: 5, unitCost: 240, margin: 20, salePrice: 290, lineTotal: 1200 },
      { purchaseId: purchases[1].id, productId: products[2].id, productName: products[2].name, quantity: 5, unitCost: 28, margin: 26, salePrice: 38, lineTotal: 140 },
      { purchaseId: purchases[1].id, productId: products[1].id, productName: products[1].name, quantity: 5, unitCost: 35, margin: 22, salePrice: 45, lineTotal: 175 },
      { purchaseId: purchases[1].id, productId: products[3].id, productName: products[3].name, quantity: 5, unitCost: 20, margin: 28, salePrice: 28, lineTotal: 100 },
      { purchaseId: purchases[2].id, productId: products[3].id, productName: products[3].name, quantity: 3, unitCost: 28, margin: 0, salePrice: 28, lineTotal: 84 },
      { purchaseId: purchases[3].id, productId: products[5].id, productName: products[5].name, quantity: 3, unitCost: 300, margin: 20, salePrice: 360, lineTotal: 900 },
      { purchaseId: purchases[3].id, productId: products[7].id, productName: products[7].name, quantity: 10, unitCost: 24, margin: 25, salePrice: 32, lineTotal: 240 },
      { purchaseId: purchases[3].id, productId: products[6].id, productName: products[6].name, quantity: 1, unitCost: 150, margin: 20, salePrice: 185, lineTotal: 150 },
      { purchaseId: purchases[4].id, productId: products[1].id, productName: products[1].name, quantity: 1, unitCost: 45, margin: 0, salePrice: 45, lineTotal: 45 },
    ],
  });

  const transfers = await Promise.all([
    prisma.stockTransfer.upsert({
      where: { reference: 'TRF-SEED-00001' },
      update: {
        fromLocation: 'Depot central',
        toLocation: 'GPS Tunisie Ariana',
        status: StockTransferStatus.COMPLETED,
        shippingCharges: 15,
        total: 595,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'TRF-SEED-00001',
        fromLocation: 'Depot central',
        toLocation: 'GPS Tunisie Ariana',
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
        fromLocation: 'GPS Tunisie Ariana',
        toLocation: 'Technicien terrain',
        status: StockTransferStatus.IN_TRANSIT,
        shippingCharges: 0,
        total: 90,
        addedBy: staff.fullName,
      },
      create: {
        reference: 'TRF-SEED-00002',
        fromLocation: 'GPS Tunisie Ariana',
        toLocation: 'Technicien terrain',
        status: StockTransferStatus.IN_TRANSIT,
        notes: 'Materiel GPS pour intervention flotte.',
        total: 90,
        addedBy: staff.fullName,
      },
    }),
    prisma.stockTransfer.upsert({
      where: { reference: 'TRF-SEED-00003' },
      update: {
        fromLocation: 'Depot central',
        toLocation: 'Port de Rades',
        status: StockTransferStatus.PENDING,
        shippingCharges: 25,
        total: 844,
        addedBy: admin.fullName,
      },
      create: {
        reference: 'TRF-SEED-00003',
        fromLocation: 'Depot central',
        toLocation: 'Port de Rades',
        status: StockTransferStatus.PENDING,
        shippingCharges: 25,
        notes: 'Preparation materiel pour intervention Logistique Carthage.',
        total: 844,
        addedBy: admin.fullName,
      },
    }),
  ]);

  await prisma.stockTransferItem.createMany({
    data: [
      { transferId: transfers[0].id, productId: products[0].id, quantity: 2, unitPrice: 290, lineTotal: 580 },
      { transferId: transfers[1].id, productId: products[1].id, quantity: 2, unitPrice: 45, lineTotal: 90 },
      { transferId: transfers[2].id, productId: products[5].id, quantity: 2, unitPrice: 360, lineTotal: 720 },
      { transferId: transfers[2].id, productId: products[7].id, quantity: 2, unitPrice: 32, lineTotal: 64 },
      { transferId: transfers[2].id, productId: products[4].id, quantity: 1, unitPrice: 35, lineTotal: 35 },
    ],
  });

  const adjustments = await Promise.all([
    prisma.stockAdjustment.upsert({
      where: { reference: 'ADJ-SEED-00001' },
      update: {
        location: 'GPS Tunisie Ariana',
        type: StockAdjustmentType.ADD,
        total: 28,
        recoveredAmount: 0,
        reason: 'Faisceau GPS retrouve apres inventaire.',
        addedBy: admin.fullName,
      },
      create: {
        reference: 'ADJ-SEED-00001',
        location: 'GPS Tunisie Ariana',
        type: StockAdjustmentType.ADD,
        total: 28,
        recoveredAmount: 0,
        reason: 'Faisceau GPS retrouve apres inventaire.',
        addedBy: admin.fullName,
      },
    }),
    prisma.stockAdjustment.upsert({
      where: { reference: 'ADJ-SEED-00002' },
      update: {
        location: 'GPS Tunisie Ariana',
        type: StockAdjustmentType.SUBTRACT,
        total: 35,
        recoveredAmount: 0,
        reason: 'SIM test consommee.',
        addedBy: admin.fullName,
      },
      create: {
        reference: 'ADJ-SEED-00002',
        location: 'GPS Tunisie Ariana',
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
      { adjustmentId: adjustments[0].id, productId: products[3].id, quantity: 1, unitPrice: 28, lineTotal: 28 },
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
        location: 'GPS Tunisie Ariana',
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
        location: 'GPS Tunisie Ariana',
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
        location: 'GPS Tunisie Ariana',
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
        location: 'GPS Tunisie Ariana',
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
        title: 'Controle inventaire traceurs GPS',
        status: EssentialTaskStatus.DONE,
        priority: EssentialTaskPriority.MEDIUM,
        startAt: daysFromNow(-2),
        endAt: daysFromNow(-1),
        estimatedHours: '1.5',
        assignedTo: admin.fullName,
        assignedUserId: admin.id,
        documents: [],
      },
      {
        reference: 'TASK-SEED-00003',
        title: 'Preparer kit installation Hotel Medina',
        status: EssentialTaskStatus.NEW,
        priority: EssentialTaskPriority.HIGH,
        startAt: daysFromNow(0.5),
        endAt: daysFromNow(2),
        estimatedHours: '3',
        assignedTo: tech2.user.fullName,
        assignedUserId: tech2.user.id,
        documents: ['checklist-navettes-hotel.pdf'],
      },
      {
        reference: 'TASK-SEED-00004',
        title: 'Verifier activation SIM M2M Carthage',
        status: EssentialTaskStatus.NEW,
        priority: EssentialTaskPriority.MEDIUM,
        startAt: daysFromNow(1),
        endAt: daysFromNow(4),
        estimatedHours: '1',
        assignedTo: staff.fullName,
        assignedUserId: staff.id,
        documents: ['sim-m2m-carthage.csv'],
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
        name: 'Hotel Medina - 12 vehicules',
        description: 'Prospect pour installation flotte GPS.',
        status: 'OPEN',
        data: { value: 4200, source: 'Facebook', nextAction: 'Envoyer proposition' },
        createdBy: staff.fullName,
      },
      {
        type: 'ticket',
        name: 'Relance abonnement Delta',
        description: 'Prevenir avant expiration du pack flotte.',
        status: 'FOLLOW_UP',
        data: { contact: fleet.fullName, dueAt: daysFromNow(5), channel: 'phone' },
        createdBy: admin.fullName,
      },
      {
        type: 'lead',
        name: 'Logistique Carthage - extension flotte',
        description: 'Extension potentielle apres les deux premiers camions pilotes.',
        status: 'OPEN',
        data: { value: 6800, source: 'Recommandation', nextAction: 'Planifier demonstration plateforme' },
        createdBy: staff.fullName,
      },
      {
        type: 'ticket',
        name: 'Support application Sami',
        description: 'Aider le client a configurer les notifications mobiles apres activation.',
        status: 'WAITING_CLIENT',
        data: { contact: sami.fullName, dueAt: daysFromNow(7), channel: 'whatsapp' },
        createdBy: staff.fullName,
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
    () => prisma.project.findFirst({ where: { name: 'Deploiement flotte Delta' } }),
    (id) =>
      prisma.project.update({
        where: { id },
        data: {
          description: 'Installation et activation de traceurs GPS pour Delta Fleet.',
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
          name: 'Deploiement flotte Delta',
          description: 'Installation et activation de traceurs GPS pour Delta Fleet.',
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
        subject: 'Preparer les traceurs GPS',
        description: 'Configurer SIM et plateforme avant pose.',
        status: 'DONE',
        priority: 'HIGH',
        assignedTo: tech1.user.fullName,
        startDate: daysFromNow(-4),
        endDate: daysFromNow(-3),
        customFields: { vehicleCount: 8 },
      },
    }),
    prisma.projectTask.create({
      data: {
        projectId: project.id,
        subject: 'Planifier installation client',
        description: 'Confirmer les creneaux avec Delta Fleet.',
        status: 'TODO',
        priority: 'MEDIUM',
        assignedTo: staff.fullName,
        startDate: daysFromNow(1),
        endDate: daysFromNow(3),
        customFields: { location: 'Ben Arous' },
      },
    }),
    prisma.projectTask.create({
      data: {
        projectId: project.id,
        subject: 'Valider tests alertes moteur',
        description: 'Tester contact moteur, coupure relais et alertes vitesse sur un vehicule pilote.',
        status: 'TODO',
        priority: 'HIGH',
        assignedTo: tech1.user.fullName,
        startDate: daysFromNow(2),
        endDate: daysFromNow(4),
        customFields: { vehicleCount: 1, location: 'Ben Arous' },
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
      {
        projectId: project.id,
        taskId: projectTasks[2].id,
        userName: tech1.user.fullName,
        minutes: 25,
        note: 'Preparation protocole de test relais.',
        loggedAt: daysFromNow(-0.5),
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
      admins: additionalAdmins.map((user) => user.email),
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

import {
  AccountTransactionDirection,
  EssentialTaskPriority,
  EssentialTaskStatus,
  InvoiceDocumentType,
  PaymentStatus,
  PrismaClient,
  PurchaseKind,
  PurchasePaymentStatus,
  PurchaseStatus,
  StockMovementType,
  UserRole,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'aziz5.badis@gmail.com';
const ADMIN_PASSWORD = 'password123';

async function clearApplicationData() {
  const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename <> '_prisma_migrations'
  `;

  if (!tables.length) return;

  const tableList = tables
    .map(({ tablename }) => `"public"."${tablename.replace(/"/g, '""')}"`)
    .join(', ');

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tableList} RESTART IDENTITY CASCADE`);
}

async function main() {
  await clearApplicationData();

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const adminRole = await prisma.roleDefinition.create({
    data: {
      name: 'Administrateur',
      homePath: '/accueil',
      description: 'Acces complet a l ERP.',
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      fullName: 'Aziz Badis',
      role: UserRole.ADMIN,
      roleId: adminRole.id,
      passwordHash,
      isActive: true,
    },
  });

  const clients = await prisma.contact.createManyAndReturn({
    data: [
      {
        fullName: 'Client Comptoir',
        phone: '+216 20 100 100',
        email: 'client.comptoir@example.com',
        address: 'Tunis centre',
      },
      {
        fullName: 'Societe Medina',
        phone: '+216 71 200 300',
        email: 'achat@medina.example.com',
        address: 'Ariana',
      },
      {
        fullName: 'Client Detail',
        phone: '+216 55 444 333',
        email: 'detail@example.com',
        address: 'Ben Arous',
      },
      {
        fullName: 'Fournisseur Pieces Plus',
        phone: '+216 70 888 111',
        email: 'contact@piecesplus.example.com',
        address: 'Sfax',
      },
      {
        fullName: 'Fournisseur Tech Stock',
        phone: '+216 74 555 222',
        email: 'vente@techstock.example.com',
        address: 'Sousse',
      },
    ],
  });

  const [clientComptoir, societeMedina, clientDetail, fournisseurPieces, fournisseurTech] = clients;

  const products = await prisma.product.createManyAndReturn({
    data: [
      {
        name: 'Ecran iPhone 11',
        sku: 'SKU-ECRIPH-00001',
        barcode: '200000000101',
        brand: 'Apple',
        category: 'Ecrans',
        unit: 'Piece',
        warranty: '3 mois',
        productType: 'Stockable',
        description: 'Ecran compatible iPhone 11.',
        unitPrice: 189,
        taxRate: 19,
        stockQty: 12,
        minStockQty: 3,
      },
      {
        name: 'Batterie Samsung A52',
        sku: 'SKU-BATSAM-00001',
        barcode: '200000000102',
        brand: 'Samsung',
        category: 'Batteries',
        unit: 'Piece',
        warranty: '3 mois',
        productType: 'Stockable',
        description: 'Batterie compatible Samsung A52.',
        unitPrice: 59,
        taxRate: 19,
        stockQty: 25,
        minStockQty: 5,
      },
      {
        name: 'Chargeur USB-C 25W',
        sku: 'SKU-CHARUS-00001',
        barcode: '200000000103',
        brand: 'Generic',
        category: 'Accessoires',
        unit: 'Piece',
        warranty: '1 mois',
        productType: 'Stockable',
        description: 'Chargeur rapide USB-C 25W.',
        unitPrice: 35,
        taxRate: 19,
        stockQty: 40,
        minStockQty: 8,
      },
      {
        name: 'Cable USB-C',
        sku: 'SKU-CABLUS-00001',
        barcode: '200000000104',
        brand: 'Generic',
        category: 'Accessoires',
        unit: 'Piece',
        warranty: '1 mois',
        productType: 'Stockable',
        description: 'Cable USB-C 1 metre.',
        unitPrice: 15,
        taxRate: 19,
        stockQty: 80,
        minStockQty: 15,
      },
      {
        name: 'Protection ecran verre',
        sku: 'SKU-PROTEC-00001',
        barcode: '200000000105',
        brand: 'Generic',
        category: 'Accessoires',
        unit: 'Piece',
        warranty: '0',
        productType: 'Stockable',
        description: 'Protection ecran en verre trempe.',
        unitPrice: 12,
        taxRate: 7,
        stockQty: 120,
        minStockQty: 20,
      },
    ],
  });

  await prisma.stockMovement.createMany({
    data: products.map((product) => ({
      productId: product.id,
      type: StockMovementType.IN,
      quantity: product.stockQty,
      reason: 'Stock initial de test',
    })),
  });

  const cashAccount = await prisma.paymentAccount.create({
    data: {
      name: 'Caisse principale',
      accountType: 'cash',
      accountNumber: 'CAISSE-001',
      description: 'Compte de test pour encaissements.',
      initialBalance: 500,
      createdBy: admin.fullName,
    },
  });

  const purchase = await prisma.purchase.create({
    data: {
      reference: 'ACH-TEST-0001',
      kind: PurchaseKind.PURCHASE,
      supplierName: fournisseurPieces.fullName,
      location: 'Magasin principal',
      status: PurchaseStatus.RECEIVED,
      paymentStatus: PurchasePaymentStatus.PAID,
      subtotal: 950,
      discount: 20,
      tax: 176.7,
      shipping: 15,
      total: 1121.7,
      paidAmount: 1121.7,
      notes: 'Achat de test pour alimenter le stock.',
      addedBy: admin.fullName,
      items: {
        create: [
          {
            productId: products[0].id,
            productName: products[0].name,
            quantity: 4,
            unitCost: 145,
            margin: 25,
            salePrice: 189,
            lineTotal: 580,
          },
          {
            productId: products[1].id,
            productName: products[1].name,
            quantity: 10,
            unitCost: 37,
            margin: 30,
            salePrice: 59,
            lineTotal: 370,
          },
        ],
      },
    },
  });

  await prisma.purchase.create({
    data: {
      reference: 'CMD-TEST-0001',
      kind: PurchaseKind.ORDER,
      supplierName: fournisseurTech.fullName,
      location: 'Magasin principal',
      status: PurchaseStatus.ORDERED,
      paymentStatus: PurchasePaymentStatus.PARTIAL,
      subtotal: 420,
      discount: 0,
      tax: 79.8,
      shipping: 10,
      total: 509.8,
      paidAmount: 150,
      notes: 'Commande fournisseur partiellement payee.',
      addedBy: admin.fullName,
      items: {
        create: [
          {
            productId: products[2].id,
            productName: products[2].name,
            quantity: 12,
            unitCost: 35,
            margin: 0,
            salePrice: 35,
            lineTotal: 420,
          },
        ],
      },
    },
  });

  const saleInvoice = await prisma.invoice.create({
    data: {
      number: 'VTE-TEST-0001',
      contactId: clientComptoir.id,
      documentType: InvoiceDocumentType.SALE,
      paymentStatus: PaymentStatus.PARTIAL,
      status: 'FINAL',
      shippingStatus: 'NOT_SHIPPED',
      subtotal: 248,
      discount: 10,
      tax: 45.22,
      total: 283.22,
      paidAmount: 150,
      items: {
        create: [
          {
            productId: products[0].id,
            description: products[0].name,
            quantity: 1,
            unitPrice: 189,
            total: 189,
          },
          {
            productId: products[1].id,
            description: products[1].name,
            quantity: 1,
            unitPrice: 59,
            total: 59,
          },
        ],
      },
    },
  });

  const paidInvoice = await prisma.invoice.create({
    data: {
      number: 'VTE-TEST-0002',
      contactId: societeMedina.id,
      documentType: InvoiceDocumentType.SALE,
      paymentStatus: PaymentStatus.PAID,
      status: 'FINAL',
      shippingStatus: 'SHIPPED',
      subtotal: 190,
      discount: 0,
      tax: 36.1,
      total: 226.1,
      paidAmount: 226.1,
      items: {
        create: [
          {
            productId: products[2].id,
            description: products[2].name,
            quantity: 2,
            unitPrice: 35,
            total: 70,
          },
          {
            productId: products[3].id,
            description: products[3].name,
            quantity: 4,
            unitPrice: 15,
            total: 60,
          },
          {
            productId: products[4].id,
            description: products[4].name,
            quantity: 5,
            unitPrice: 12,
            total: 60,
          },
        ],
      },
    },
  });

  await prisma.payment.createMany({
    data: [
      {
        invoiceId: saleInvoice.id,
        cashierId: admin.id,
        amount: 150,
        method: 'cash',
        reference: 'PAY-TEST-0001',
        paymentAccountId: cashAccount.id,
      },
      {
        invoiceId: paidInvoice.id,
        cashierId: admin.id,
        amount: 226.1,
        method: 'cash',
        reference: 'PAY-TEST-0002',
        paymentAccountId: cashAccount.id,
      },
    ],
  });

  await prisma.accountTransaction.createMany({
    data: [
      {
        accountId: cashAccount.id,
        reference: 'PAY-TEST-0001',
        invoiceReference: saleInvoice.number,
        amount: 150,
        paymentType: 'cash',
        direction: AccountTransactionDirection.CREDIT,
        description: 'Paiement partiel vente test.',
        createdBy: admin.fullName,
      },
      {
        accountId: cashAccount.id,
        reference: 'PAY-TEST-0002',
        invoiceReference: paidInvoice.number,
        amount: 226.1,
        paymentType: 'cash',
        direction: AccountTransactionDirection.CREDIT,
        description: 'Paiement complet vente test.',
        createdBy: admin.fullName,
      },
    ],
  });

  await prisma.stockMovement.createMany({
    data: [
      {
        productId: products[0].id,
        type: StockMovementType.OUT,
        quantity: 1,
        reason: `Vente ${saleInvoice.number}`,
      },
      {
        productId: products[1].id,
        type: StockMovementType.OUT,
        quantity: 1,
        reason: `Vente ${saleInvoice.number}`,
      },
      {
        productId: products[2].id,
        type: StockMovementType.OUT,
        quantity: 2,
        reason: `Vente ${paidInvoice.number}`,
      },
      {
        productId: products[3].id,
        type: StockMovementType.OUT,
        quantity: 4,
        reason: `Vente ${paidInvoice.number}`,
      },
      {
        productId: products[4].id,
        type: StockMovementType.OUT,
        quantity: 5,
        reason: `Vente ${paidInvoice.number}`,
      },
    ],
  });

  await prisma.product.update({ where: { id: products[0].id }, data: { stockQty: 11 } });
  await prisma.product.update({ where: { id: products[1].id }, data: { stockQty: 24 } });
  await prisma.product.update({ where: { id: products[2].id }, data: { stockQty: 38 } });
  await prisma.product.update({ where: { id: products[3].id }, data: { stockQty: 76 } });
  await prisma.product.update({ where: { id: products[4].id }, data: { stockQty: 115 } });

  await prisma.stockAdjustment.create({
    data: {
      reference: 'AJU-TEST-0001',
      location: 'Magasin principal',
      type: 'ADD',
      total: 24,
      recoveredAmount: 0,
      reason: 'Correction inventaire de test.',
      addedBy: admin.fullName,
      items: {
        create: [
          {
            productId: products[4].id,
            quantity: 2,
            unitPrice: 12,
            lineTotal: 24,
          },
        ],
      },
    },
  });

  await prisma.stockMovement.create({
    data: {
      productId: products[4].id,
      type: StockMovementType.ADJUSTMENT,
      quantity: 2,
      reason: 'Correction inventaire de test',
    },
  });

  await prisma.essentialTask.create({
    data: {
      reference: 'TASK-TEST-0001',
      title: 'Verifier les stocks bas',
      status: EssentialTaskStatus.NEW,
      priority: EssentialTaskPriority.HIGH,
      assignedTo: admin.fullName,
      assignedUserId: admin.id,
      estimatedHours: '1',
    },
  });

  console.log({
    message: 'Seed de test pret.',
    user: admin.email,
    password: ADMIN_PASSWORD,
    clients: [clientComptoir.fullName, societeMedina.fullName, clientDetail.fullName],
    suppliers: [fournisseurPieces.fullName, fournisseurTech.fullName],
    products: products.length,
    purchase: purchase.reference,
    invoices: [saleInvoice.number, paidInvoice.number],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());

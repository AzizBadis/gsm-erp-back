import { BadRequestException, Injectable } from '@nestjs/common';
import { PartRequestStatus, RepairStatus, StockMovementType } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PartRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: PaginationDto) {
    const where = query.search
      ? {
          OR: [
            { repair: { reference: { contains: query.search, mode: 'insensitive' as const } } },
            { technician: { user: { fullName: { contains: query.search, mode: 'insensitive' as const } } } },
            { items: { some: { product: { name: { contains: query.search, mode: 'insensitive' as const } } } } },
          ],
        }
      : {};
    const [data, total] = await Promise.all([
      this.prisma.partRequest.findMany({
        where,
        include: this.include(),
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.partRequest.count({ where }),
    ]);
    return { data, total, page: query.page, limit: query.limit };
  }

  findOne(id: string) {
    return this.prisma.partRequest.findUniqueOrThrow({ where: { id }, include: this.include() });
  }

  async approve(id: string) {
    const request = await this.findOne(id);
    for (const item of request.items) {
      if (item.product.stockQty < item.quantity) {
        throw new BadRequestException(`Insufficient stock for ${item.product.name}`);
      }
    }
    return this.prisma.partRequest.update({
      where: { id },
      data: { status: PartRequestStatus.APPROVED },
      include: this.include(),
    });
  }

  reject(id: string, reason: string) {
    return this.prisma.partRequest.update({
      where: { id },
      data: { status: PartRequestStatus.REJECTED, rejectionReason: reason },
      include: this.include(),
    });
  }

  async deliver(id: string) {
    const request = await this.findOne(id);
    if (request.status !== PartRequestStatus.APPROVED) {
      throw new BadRequestException('Only approved part requests can be delivered');
    }

    return this.prisma.$transaction(async (tx) => {
      for (const item of request.items) {
        const product = await tx.product.findUniqueOrThrow({ where: { id: item.productId } });
        if (product.stockQty < item.quantity) {
          throw new BadRequestException(`Insufficient stock for ${product.name}`);
        }
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: { decrement: item.quantity } },
        });
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            repairId: request.repairId,
            type: StockMovementType.OUT,
            quantity: item.quantity,
            reason: `Delivered for part request ${request.id}`,
          },
        });
      }

      await tx.repair.update({ where: { id: request.repairId }, data: { status: RepairStatus.PARTS_READY } });
      return tx.partRequest.update({
        where: { id },
        data: { status: PartRequestStatus.DELIVERED },
        include: this.include(),
      });
    });
  }

  private include() {
    return {
      repair: { include: { contact: true } },
      technician: { include: { user: true } },
      items: { include: { product: true } },
    };
  }
}

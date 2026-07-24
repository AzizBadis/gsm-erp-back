import { InvoiceDocumentType } from '@prisma/client';
import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class InvoiceFilterDto extends PaginationDto {
    documentType?: InvoiceDocumentType;
}
export declare class CreateInvoiceItemDto {
    productId?: string;
    description: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreateInvoiceDto {
    contactId: string;
    repairId?: string;
    employeeId?: string;
    tax?: number;
    discount?: number;
    documentType?: InvoiceDocumentType;
    status?: string;
    shippingStatus?: string;
    items: CreateInvoiceItemDto[];
}

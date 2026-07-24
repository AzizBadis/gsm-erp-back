import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExpenseCategoryDto, CreateExpenseDto } from './dto/expense.dto';
export declare class ExpensesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listCategories(): import(".prisma/client").Prisma.PrismaPromise<({
        parent: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string | null;
            parentId: string | null;
        } | null;
        children: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string | null;
            parentId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string | null;
        parentId: string | null;
    })[]>;
    createCategory(dto: CreateExpenseCategoryDto): import(".prisma/client").Prisma.Prisma__ExpenseCategoryClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string | null;
        parentId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateCategory(id: string, dto: CreateExpenseCategoryDto): import(".prisma/client").Prisma.Prisma__ExpenseCategoryClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string | null;
        parentId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteCategory(id: string): import(".prisma/client").Prisma.Prisma__ExpenseCategoryClient<{
        id: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(q: PaginationDto): Promise<{
        data: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                code: string | null;
                parentId: string | null;
            };
            subCategory: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                code: string | null;
                parentId: string | null;
            } | null;
        } & {
            contact: string | null;
            paymentAccount: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: import("@prisma/client/runtime/library").Decimal;
            reference: string;
            location: string;
            addedBy: string;
            categoryId: string;
            subCategoryId: string | null;
            expenseDate: Date;
            expenseFor: string;
            applicableTax: string | null;
            note: string | null;
            attachmentName: string | null;
            isRecurring: boolean;
            recurrenceEvery: number | null;
            recurrenceUnit: string | null;
            occurrences: number | null;
            paymentAmount: import("@prisma/client/runtime/library").Decimal;
            paymentDate: Date | null;
            paymentMethod: string | null;
            paymentNote: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(dto: CreateExpenseDto, addedBy: string): Promise<{
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string | null;
            parentId: string | null;
        };
        subCategory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string | null;
            parentId: string | null;
        } | null;
    } & {
        contact: string | null;
        paymentAccount: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client/runtime/library").Decimal;
        reference: string;
        location: string;
        addedBy: string;
        categoryId: string;
        subCategoryId: string | null;
        expenseDate: Date;
        expenseFor: string;
        applicableTax: string | null;
        note: string | null;
        attachmentName: string | null;
        isRecurring: boolean;
        recurrenceEvery: number | null;
        recurrenceUnit: string | null;
        occurrences: number | null;
        paymentAmount: import("@prisma/client/runtime/library").Decimal;
        paymentDate: Date | null;
        paymentMethod: string | null;
        paymentNote: string | null;
    }>;
}

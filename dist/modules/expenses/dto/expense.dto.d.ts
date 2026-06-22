export declare class CreateExpenseCategoryDto {
    name: string;
    code?: string;
    parentId?: string;
}
export declare class CreateExpenseDto {
    reference?: string;
    location: string;
    categoryId: string;
    subCategoryId?: string;
    expenseDate?: string;
    expenseFor: string;
    contact?: string;
    applicableTax?: string;
    total: number;
    note?: string;
    attachmentName?: string;
    isRecurring?: boolean;
    recurrenceEvery?: number;
    recurrenceUnit?: string;
    occurrences?: number;
    paymentAmount?: number;
    paymentDate?: string;
    paymentMethod?: string;
    paymentAccount?: string;
    paymentNote?: string;
}

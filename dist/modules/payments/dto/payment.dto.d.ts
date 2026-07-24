export declare class PaymentPartDto {
    method: string;
    amount: number;
    reference?: string;
}
export declare class CreatePaymentDto {
    invoiceId: string;
    amount: number;
    method: string;
    reference?: string;
    paymentAccountId?: string;
    parts?: PaymentPartDto[];
}

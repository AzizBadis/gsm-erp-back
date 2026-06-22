export declare const RepairStatus: {
    readonly RECEIVED: "RECEIVED";
    readonly ASSIGNED: "ASSIGNED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly PAUSED: "PAUSED";
    readonly WAITING_PARTS: "WAITING_PARTS";
    readonly PARTS_READY: "PARTS_READY";
    readonly FINISHED: "FINISHED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type RepairStatus = typeof RepairStatus[keyof typeof RepairStatus];

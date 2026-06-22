export const RepairStatus = {
  RECEIVED: 'RECEIVED',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  PAUSED: 'PAUSED',
  WAITING_PARTS: 'WAITING_PARTS',
  PARTS_READY: 'PARTS_READY',
  FINISHED: 'FINISHED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export type RepairStatus = typeof RepairStatus[keyof typeof RepairStatus];

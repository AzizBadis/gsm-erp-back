export declare class CreateDeviceDto {
    name: string;
}
export declare class UpdateDeviceDto {
    name?: string;
}
export declare class CreateDeviceModelDto {
    name: string;
    brandId: string;
    deviceId: string;
}
export declare class UpdateDeviceModelDto {
    name?: string;
    brandId?: string;
    deviceId?: string;
}

export interface Device {
    brand: string;
    channels?: string;
    companyName: string;
    createdAt?: Date;
    cpuQuantity?: number;
    cpuModel?:string;
    cpuGeneration?:number;
    description?: string;
    function?: string;
    id: number;
    memorySize?: string;
    memorySlots?: number;
    memoryType?: string;
    model: string;
    patrim: string;
    purchaseDate?: Date;
    purchaseValue?: number;
    screenSize?: string;
    serial: string;
    status: string;
    storage?: string;
    technology?: string;
    type: string;
}

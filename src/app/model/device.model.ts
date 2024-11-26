export interface Device {
    id?: number;
    name: string;
    fru: string;
    serial: string;
    type: string;
    status: string;
    owner: string;
    email: string;
    branch: string;
    invoice: string;
    description?: string;
    createdAt?: Date;
}


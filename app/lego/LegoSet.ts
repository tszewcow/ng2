export class LegoSet {
    id: number;
    version: number;
    externalId: string;
    name: string;
    status: string;
    comment: string;
    imagePath: string;
}

export enum Status {
    Used,
    New
}

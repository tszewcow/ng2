export class LegoSet {
    id: number;
    version: number;
    externalId: string;
    name: string;
    status: string;
    comment: string;
}

export enum Status {
    Used,
    New
}

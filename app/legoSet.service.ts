import { LegoSet, Status } from './LegoSet';
import { Injectable } from '@angular/core';

const legoSets: LegoSet[] = [
    {
        id: 0,
        version: 0,
        externalId: '123',
        name: 'name1',
        status: Status[Status.New],
        comment: 'comment1',
    },
    {
        id: 1,
        version: 0,
        externalId: '456',
        name: 'name2',
        status: Status[Status.Used],
        comment: 'comment2',
    },
    {
        id: 2,
        version: 0,
        externalId: '789',
        name: 'name4',
        status: Status[Status.New],
        comment: 'comment3',
    }
];

@Injectable()
export class LegoSetService {

    getLegoSets(): LegoSet[] {
        return legoSets;
    }
}

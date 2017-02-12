import { LegoSet, Status } from './LegoSet';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

const legoSets: LegoSet[] = [
    {
        id: 0,
        version: 0,
        externalId: '123',
        name: 'name1',
        status: Status[Status.New],
        comment: 'comment1',
        imagePath: 'images/lego_placeholder.png'
    },
    {
        id: 1,
        version: 0,
        externalId: '456',
        name: 'name2',
        status: Status[Status.Used],
        comment: 'comment2',
        imagePath: 'images/lego_placeholder.png'
    },
    {
        id: 2,
        version: 0,
        externalId: '789',
        name: 'name3',
        status: Status[Status.New],
        comment: 'comment3',
        imagePath: 'images/lego_placeholder.png'
    },
    {
        id: 3,
        version: 0,
        externalId: 'abc',
        name: 'name4',
        status: Status[Status.Used],
        comment: 'comment4',
        imagePath: 'images/lego_placeholder.png'
    },
    {
        id: 4,
        version: 0,
        externalId: 'efg',
        name: 'name4',
        status: Status[Status.Used],
        comment: 'comment4',
        imagePath: 'images/lego_placeholder.png'
    },
    {
        id: 5,
        version: 0,
        externalId: 'xyz',
        name: 'name5',
        status: Status[Status.New],
        comment: 'comment5',
        imagePath: 'images/lego_placeholder.png'
    }
];

@Injectable()
export class LegoSetService {

    private generateId(): number {
        if (legoSets.length === 0) {
            return 0;
        }
        let highestId: number = legoSets[legoSets.length - 1].id;
        return highestId + 1;
    }

    getLegoSets(): Observable<LegoSet[]> {
        return Observable.create((observer: Observer<LegoSet[]>) => {
            observer.next(legoSets);
            observer.complete();
        });
    }

    getTop3Sets(): Observable<LegoSet[]> {
        return Observable.create((observer: Observer<LegoSet[]>) => {
            observer.next(legoSets.slice(0, 3));
            observer.complete();
        });
    }

    findOne(id: number): Observable<LegoSet> {
        return Observable.create((observer: Observer<LegoSet>) => {
            for (let set of legoSets) {
                if (set.id === id) {
                    observer.next(set);
                    observer.complete();
                }
            }
            observer.error((err: string) => {
                return `Set of ${id} not found`;
            });
        });

    }

    add(legoSet: LegoSet) {
        legoSet.id = this.generateId();
        legoSet.imagePath = 'images/lego_placeholder.png';
        legoSets.push(legoSet);
    }

    delete(index: number): void {
        legoSets.splice(index, 1);
    }
}

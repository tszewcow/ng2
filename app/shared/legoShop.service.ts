import { LegoShopSet } from './LegoShopSet';
import { Observable } from 'rxjs/Observable';


// can use tokens instead, but it would be too much. Interfaces do not exist in JS, so need to use a class
export class LegoShopService {

    getLegoSets(query?: string): Observable<LegoShopSet[]> {
        throw(new Error('Should never be used, interface marker'));
    };

    findOne(id: string): Observable<LegoShopSet> {
        throw(new Error('Should never be used, interface marker'));
    };

    getTop3Sets(): Observable<LegoShopSet[]> {
        throw(new Error('Should never be used, interface marker'));
    };
}

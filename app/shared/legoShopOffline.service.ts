import { LegoShopSet } from './LegoShopSet';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { LegoShopService } from './legoShop.service';

@Injectable()
export class LegoShopOfflineService implements LegoShopService {

    // JSON-SERVER API
    private readonly jsonServerApiUrl = '/services/';
    private readonly jsonServerSearchApiService = 'lego-shop-sets/';

    constructor(private http: Http) { };

    getLegoSets(query?: string): Observable<LegoShopSet[]> {
        return this.http.get(this.jsonServerApiUrl + this.jsonServerSearchApiService)
            .map(this.extractDataLegoSets)
            .map(legoShopSets => this.filterByQuery(legoShopSets, query))
            .catch(this.handleError);
    }

    findOne(id: string): Observable<LegoShopSet> {
          return this.getLegoSets()
            .map(legoShopSets => this.filterById(legoShopSets, id));
    }


    getTop3Sets(): Observable<LegoShopSet[]> {
        return this.getLegoSets('Fire')
            .map(legoShopSets => legoShopSets.slice(0, 3));
    }


    private filterByQuery(legoShopSets: LegoShopSet[], query?: string): LegoShopSet[] {
        return legoShopSets.filter(val => {
            if (query) {
                return val && val.descr && val.descr.toUpperCase().indexOf(query.toUpperCase()) !== -1;
            }
            return true;
        });
    }

    private filterById(legoShopSets: LegoShopSet[], id: string): LegoShopSet {
        return legoShopSets.filter(val => val && val.set_id && val.set_id === id)[0];
    }


    private extractDataLegoSets(res: Response): LegoShopSet[] {
        let body = res.json();
        return body.results || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

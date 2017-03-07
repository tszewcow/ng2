import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { LegoShopSet } from './LegoShopSet';
import { LegoShopService } from './legoShop.service';
import { toJson, loggingErrorProxy }  from './utils';

@Injectable()
export class LegoShopOfflineService extends LegoShopService {

    // JSON-SERVER API
    private readonly jsonServerApiUrl = '/services/';
    private readonly jsonServerSearchApiService = 'lego-shop-sets/';

    constructor(private http: Http) {
        super();
    };

    getLegoSets(query?: string): Observable<LegoShopSet[]> {
        return this.http.get(this.jsonServerApiUrl + this.jsonServerSearchApiService)
            .map(toJson)
            .map(body => body.results || {})
            .map(legoShopSets => this.filterByQuery(legoShopSets, query))
            .catch(loggingErrorProxy);
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
            if (!query) {
                return true;
            }
            return val && val.descr && val.descr.toUpperCase().indexOf(query.toUpperCase()) !== -1;
        });
    }

    private filterById(legoShopSets: LegoShopSet[], id: string): LegoShopSet {
        return legoShopSets.filter(val => val && val.set_id && val.set_id === id)[0];
    }

}

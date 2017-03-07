import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { LegoShopSet } from './LegoShopSet';
import { LegoShopService } from './legoShop.service';
import { toJson, loggingErrorProxy }  from './utils';

@Injectable()
export class LegoShopOnlineService implements LegoShopService {

    // Rebrickable API
    private readonly rebrickableApiUrl = 'https://rebrickable.com/api/';
    private readonly searchApiService = 'search';
    private readonly getSetApiService = 'get_set';


    constructor(private http: Http) { };


    getLegoSets(query?: string): Observable<LegoShopSet[]> {
        const options = this.buildRequestOptions({
            query: query,
            type: 'S',
        });

        return this.http.get(this.rebrickableApiUrl + this.searchApiService, options)
            .map(toJson)
            .map(body => body.results || {})
            .catch(loggingErrorProxy);
    }


    findOne(id: string): Observable<LegoShopSet> {
         const options = this.buildRequestOptions({
            set_id: id,
        });

        return this.http.get(this.rebrickableApiUrl + this.getSetApiService, options)
            .map(toJson)
            .map(body => body[0] || {})
            .catch(loggingErrorProxy);
    }


    getTop3Sets(): Observable<LegoShopSet[]> {
        return this.getLegoSets('Fire')
            .map(legoShopSets => legoShopSets.slice(0, 3));
    }


    private buildRequestOptions(inParams: Object): RequestOptions {
        const params = new URLSearchParams();
        // Hardcoded key :(
        params.set('key', 'JfDxhwY7Cn');
        params.set('format', 'json');

        Object.keys(inParams).forEach(key => {
            if (inParams[key]) {
                params.set(key, inParams[key]);
            }
        });

        return new RequestOptions({
            search: params
        });
    }

}

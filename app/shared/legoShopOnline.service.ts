import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { LegoShopSet } from './LegoShopSet';
import { LegoShopService } from './legoShop.service';

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
            .map(this.extractDataLegoSets)
            .catch(this.handleError);
    }

    findOne(id: string): Observable<LegoShopSet> {
         const options = this.buildRequestOptions({
            set_id: id,
        });

        return this.http.get(this.rebrickableApiUrl + this.getSetApiService, options)
            .map(this.extractDataLegoOneSet)
            .catch(this.handleError);
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


    // Review: Predicates in independent module?
    private extractDataLegoOneSet(res: Response) {
        let body = res.json();
        return body[0] || {};
    }

    private extractDataLegoSets(res: Response) {
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

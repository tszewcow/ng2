import { LegoShopSet } from './LegoShopSet';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LegoShopService {

    private rebrickableApiUrl = 'https://rebrickable.com/api/';

    private searchApiService = 'search';

    private getSetApiService = 'get_set';

    constructor(private http: Http) { };

    getLegoSetsHttp(query?: string): Observable<LegoShopSet[]> {
        let params = new URLSearchParams();
        let options = new RequestOptions({
            search: params
        });

        params.set('key', 'JfDxhwY7Cn');
        params.set('format', 'json');
        params.set('type', 'S');
        if (query) {
            params.set('query', query);
        }

        return this.http.get(this.rebrickableApiUrl + this.searchApiService, options)
            .map(this.extractDataLegoSets)
            .catch(this.handleError);
    }

    findOneHttp(id: string): Observable<LegoShopSet> {

        let params = new URLSearchParams();
        let options = new RequestOptions({
            search: params
        });

        params.set('key', 'JfDxhwY7Cn');
        params.set('format', 'json');
        params.set('set_id', id);

        return this.http.get(this.rebrickableApiUrl + this.getSetApiService, options)
            .map(this.extractDataLegoOneSet)
            .catch(this.handleError);
    }

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

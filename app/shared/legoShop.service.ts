import { LegoShopSet } from './LegoShopSet';
import { environment } from './../_env/environment';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class LegoShopService {

    // Rebrickable API
    private rebrickableApiUrl = 'https://rebrickable.com/api/';
    private searchApiService = 'search';
    private getSetApiService = 'get_set';

    // JSON-SERVER API
    private jsonServerApiUrl = '/services/';
    private jsonServerSearchApiService = 'lego-shop-sets/';

    constructor(private http: Http) { };

    getLegoSets(query?: string): Observable<LegoShopSet[]> {
        if (environment.online) {
            return this.getLegoSetsOnline(query);
        } else {
            return this.getLegoSetsOffline(query);
        }
    }

    private getLegoSetsOnline(query?: string): Observable<LegoShopSet[]> {
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

    private getLegoSetsOffline(query?: string): Observable<LegoShopSet[]> {
        let legoSets: Observable<LegoShopSet[]> = this.http.get(this.jsonServerApiUrl + this.jsonServerSearchApiService)
            .map(this.extractDataLegoSets)
            .catch(this.handleError);
        return legoSets.map(legoShopSets => legoShopSets
            .filter(legoShopSet => this.filterByQuery(legoShopSet, query)));
    }

    private filterByQuery(value: LegoShopSet, query?: string): boolean {
        if (query) {
            return value && value.descr && value.descr.toUpperCase().indexOf(query.toUpperCase()) >= 0;
        }
        return true;
    }

    private filterById(value: LegoShopSet, id: string): boolean {
        return value && value.set_id && value.set_id === id;
    }

    findOne(id: string): Observable<LegoShopSet> {
        if (environment.online) {
            return this.findOneOnline(id);
        } else {
            return this.findOneOffline(id);
        }
    }

    private findOneOnline(id: string): Observable<LegoShopSet> {

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

    private findOneOffline(id: string): Observable<LegoShopSet> {
        return this.getLegoSetsOffline()
            .map(legoShopSets => legoShopSets
                .filter(legoShopSet => this.filterById(legoShopSet, id))[0]);
    }

    getTop3Sets(): Observable<LegoShopSet[]> {
        return this.getLegoSets('Fire')
            .map(legoShopSets => legoShopSets.slice(0, 3));
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

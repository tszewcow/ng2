import { LegoSet } from './LegoSet';
import { Injectable } from '@angular/core';
import {Response, Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class LegoSetService {

    private readonly setsApiBaseUrl = '/services/lego-sets';

    constructor(private http: Http) { };

    getLegoSets(): Observable<LegoSet[]> {
        return this.http.get(this.setsApiBaseUrl)
            .map(res => res.json());
    }

    findOne(id: number): Observable<LegoSet> {
        return this.http.get(`${this.setsApiBaseUrl}/${id}`)
            .map(res => res.json());
    }

    private add(legoSet: LegoSet): Observable<Response> {
        legoSet.imagePath = 'images/lego_placeholder.png';
        return this.http.post(this.setsApiBaseUrl, legoSet);
    }

    private edit(legoSet: LegoSet): Observable<Response> {
        return this.http.put(`${this.setsApiBaseUrl}/${legoSet.id}`, legoSet);
    }

    save(legoSet: LegoSet): Observable<Response> {
        if (legoSet.id === undefined || legoSet.id === null) {
            return this.add(legoSet);
        } else {
            return this.edit(legoSet);
        }
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.setsApiBaseUrl}/${id}`);
    }
}

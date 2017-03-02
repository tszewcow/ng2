import { LegoSet } from './LegoSet';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class LegoSetService {

    constructor(private http: Http) { };

    getLegoSets(): Observable<LegoSet[]> {
        return this.http.get('/services/lego-sets')
            .map(res => res.json());
    }

    findOne(id: number): Observable<LegoSet> {
        return this.http.get(`/services/lego-sets/${id}`)
            .map(res => res.json());
    }

    add(legoSet: LegoSet): Observable<any> {
        legoSet.imagePath = 'images/lego_placeholder.png';
        return this.http.post('/services/lego-sets', legoSet);
    }

    edit(legoSet: LegoSet): Observable<any> {
        return this.http.put(`/services/lego-sets/${legoSet.id}`, legoSet);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`/services/lego-sets/${id}`);
    }
}

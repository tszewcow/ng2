import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    HttpModule,
    Http,
    Response,
    ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LegoShopService } from './legoShop.service';
import { LegoShopOfflineService } from './legoShopOffline.service';

describe('LegoShopService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: LegoShopService, useClass: LegoShopOfflineService },
                {
                    provide: Http,
                    useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions
            ]
        });
    });

    describe('LegoShopService', () => {

        it('should return an Observable<Array<LegoShopSet>>',
            inject([LegoShopService, MockBackend], (legoShopService: LegoShopService, mockBackend: MockBackend) => {

                const mockResponse = {
                    results: [
                        {
                            set_id: '1',
                            pieces: '100',
                            descr: 'Description 1',
                            theme1: 'Lego Set 1',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        },
                        {
                            set_id: '2',
                            pieces: '100',
                            descr: 'Description 2',
                            theme1: 'Lego Set 2',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        }
                    ]
                };

                mockBackend.connections.subscribe((connection: any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                legoShopService.getLegoSets().subscribe((legoShopSets) => {
                    expect(legoShopSets.length).toBe(2);
                    expect(legoShopSets[0].theme1).toEqual('Lego Set 1');
                    expect(legoShopSets[1].theme1).toEqual('Lego Set 2');
                });
            }));

            it('should return Observable<LegoShopSet> for search query',
            inject([LegoShopService, MockBackend], (legoShopService: LegoShopService, mockBackend: MockBackend) => {

                const mockResponse = {
                    results: [
                        {
                            set_id: '1',
                            pieces: '100',
                            descr: 'Description 1',
                            theme1: 'Lego Set 1',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        },
                        {
                            set_id: '2',
                            pieces: '100',
                            descr: 'Description 2',
                            theme1: 'Lego Set 2',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        }
                    ]
                };

                mockBackend.connections.subscribe((connection: any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                legoShopService.getLegoSets('Description 1').subscribe((legoShopSets) => {
                    expect(legoShopSets.length).toBe(1);
                    expect(legoShopSets[0].descr).toEqual('Description 1');
                    expect(legoShopSets[0].theme1).toEqual('Lego Set 1');
                });
            }));

            it('should return top 3 Observable<Array<LegoShopSet>>',
            inject([LegoShopService, MockBackend], (legoShopService: LegoShopService, mockBackend: MockBackend) => {

                const mockResponse = {
                    results: [
                        {
                            set_id: '1',
                            pieces: '100',
                            descr: 'Fire 1',
                            theme1: 'Lego Set 1',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        },
                        {
                            set_id: '2',
                            pieces: '100',
                            descr: 'Fire 2',
                            theme1: 'Lego Set 2',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        },
                        {
                            set_id: '3',
                            pieces: '100',
                            descr: 'Fire 3',
                            theme1: 'Lego Set 3',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        },
                        {
                            set_id: '4',
                            pieces: '100',
                            descr: 'Fire 4',
                            theme1: 'Lego Set 4',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        }
                    ]
                };

                mockBackend.connections.subscribe((connection: any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                legoShopService.getTop3Sets().subscribe((legoShopSets) => {
                    expect(legoShopSets.length).toBe(3);
                    expect(legoShopSets[0].theme1).toEqual('Lego Set 1');
                    expect(legoShopSets[1].theme1).toEqual('Lego Set 2');
                    expect(legoShopSets[2].theme1).toEqual('Lego Set 3');
                });
            }));

        it('should return an Observable<LegoShopSet>',
            inject([LegoShopService, MockBackend], (legoShopService: LegoShopService, mockBackend: MockBackend) => {

                const mockResponse = {
                    results: [
                        {
                            set_id: '1',
                            pieces: '100',
                            descr: 'Fire 1',
                            theme1: 'Lego Set 1',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        },
                        {
                            set_id: '2',
                            pieces: '100',
                            descr: 'Fire 2',
                            theme1: 'Lego Set 2',
                            year: '2017',
                            img_sm: 'images/lego_placeholder.png'
                        }
                    ]
                };

                mockBackend.connections.subscribe((connection: any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                legoShopService.findOne('1').subscribe((legoShopSet) => {
                    expect(legoShopSet.theme1).toEqual('Lego Set 1');
                });
            }));
    });
});

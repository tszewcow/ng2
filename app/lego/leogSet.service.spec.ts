import { LegoSet, Status } from './LegoSet';
import { MockBackend } from '@angular/http/testing';
import { LegoSetService } from './legoSet.service';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';


describe('legoSet Service tests', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [{
                provide: Http,
                useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
                    return new Http(mockBackend, options);
                },
                deps: [MockBackend, BaseRequestOptions]
            },
                MockBackend,
                BaseRequestOptions,
                LegoSetService]
        });
    });

    it('should get lego sets', inject([LegoSetService, MockBackend], (legoService: LegoSetService, mockBackend: MockBackend) => {

        // given
        const mockedResponse: LegoSet[] = [
            {
                id: 0,
                version: 0,
                externalId: '123',
                name: 'set1',
                status: Status[Status.New],
                comment: 'comment',
                imagePath: 'pathToImage'
            }
        ];

        mockBackend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockedResponse)
            })));
        });

        // when
        legoService.getLegoSets().subscribe((legoSets) => {
            // then
            expect(legoSets.length).toBe(1);
            expect(legoSets[0].id).toBe(0);
            expect(legoSets[0].name).toBe('set1');
        });
    }));

    it('should get lego set', inject([LegoSetService, MockBackend], (legoService: LegoSetService, mockBackend: MockBackend) => {

        // given
        const mockedResponse: LegoSet = {
            id: 0,
            version: 0,
            externalId: '123',
            name: 'set1',
            status: Status[Status.New],
            comment: 'comment',
            imagePath: 'pathToImage'
        };
        const id = 0;

        mockBackend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockedResponse)
            })));
        });

        // when
        legoService.findOne(id).subscribe((legoSet) => {
            // then
            expect(legoSet.id).toBe(id);
            expect(legoSet.name).toBe('set1');
        });
    }));

    it('should add lego set', inject([LegoSetService, MockBackend], (legoService: LegoSetService, mockBackend: MockBackend) => {

        // given
        const requestBody: LegoSet = {
            id: 0,
            version: 0,
            externalId: '123',
            name: 'set1',
            status: Status[Status.New],
            comment: 'comment',
            imagePath: 'pathToImage'
        };

        mockBackend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
                status: 200
            })));
        });

        // when
        legoService.add(requestBody).subscribe((response) => {
            // then
            expect(response.status).toBe(200);
        });
    }));

    it('should update lego set', inject([LegoSetService, MockBackend], (legoService: LegoSetService, mockBackend: MockBackend) => {

        // given
        const requestBody: LegoSet = {
            id: 0,
            version: 0,
            externalId: '123',
            name: 'set1',
            status: Status[Status.New],
            comment: 'comment',
            imagePath: 'pathToImage'
        };

        mockBackend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
                status: 200
            })));
        });

        // when
        legoService.edit(requestBody).subscribe((response) => {
            // then
            expect(response.status).toBe(200);
        });
    }));

    it('should delete lego set', inject([LegoSetService, MockBackend], (legoService: LegoSetService, mockBackend: MockBackend) => {

        // given
        const id = 0;

        mockBackend.connections.subscribe((connection: any) => {
            connection.mockRespond(new Response(new ResponseOptions({
                status: 200
            })));
        });

        // when
        legoService.delete(id).subscribe((response) => {
            // then
            expect(response.status).toBe(200);
        });
    }));
});

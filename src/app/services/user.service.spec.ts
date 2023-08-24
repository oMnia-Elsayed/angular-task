import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from './user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UserService', () => {

    let service: UserService;

    let http: HttpClient;

    class MockedHttp {
        /** post */
        public post = () => of({});
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                UserService,
                { provide: HttpClient, useClass: MockedHttp },
            ],
        });

        service = TestBed.inject(UserService);
        http = TestBed.inject(HttpClient);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('check login function works fine', () => {

        spyOn(http, 'post').and.callThrough();

        const form = new FormBuilder().group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });

       form?.controls['username']?.setValue('omnia');
       form?.controls['password']?.setValue('omnia');

        service.login(form);

        expect(http.post).toHaveBeenCalled();

    });
});

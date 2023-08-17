import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('UserService', () => {

    let service: UserService;

    let router: Router;

    class MockedRouter {
        /** navigate */
        public navigate = () => {}
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                UserService,
                { provide: Router, useClass: MockedRouter },
            ],
        });

        service = TestBed.inject(UserService);
        router = TestBed.inject(Router);
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('check login function works fine', () => {

        spyOn(router, 'navigate');

        const form = new FormBuilder().group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });

       form?.controls['username']?.setValue('omnia');
       form?.controls['password']?.setValue('omnia');

        service.login(form);

    });
});

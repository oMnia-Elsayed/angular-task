import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationComponent } from './translation.component';

describe('TranslationComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],


    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TranslationComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

});

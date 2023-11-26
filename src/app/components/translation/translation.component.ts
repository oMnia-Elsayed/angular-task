import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-translation',
    templateUrl: './translation.component.html',
    styleUrls: ['./translation.component.scss'],
    standalone: true,
    imports: [TranslateModule],
})
export class TranslationComponent {

    /** className */
    @Input() public className: string;

    /**
     * constructor
     * @param translate 
     */
    constructor(private translate: TranslateService) { }

    /**
     * useLanguage
     * @param language 
     */
    public useLanguage(language: string): void {
        this.translate.use(language);
    }
}

import { Injectable } from "@angular/core";


/** HelperService */
@Injectable({
    providedIn: 'root',
})
export class HelperService {

    /**
     * constructor
     */
    constructor() { };

    /**
     * prepareUrl
     */
    public prepareUrl(url: string, keys: any) {
        
        for (const key in keys) {
            const replace = `{${key}}`;
            url = url.replace(replace, keys[key]);
        }

        return url;
    }
}

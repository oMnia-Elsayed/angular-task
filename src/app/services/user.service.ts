import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { catchError, map, Observable, throwError } from "rxjs";
import { LOGIN_URL } from "../constants/api-defines";

/** UserService */
@Injectable({
    providedIn: 'root',
})
export class UserService {

    /**
     * constructor
     * @param http
     */
    constructor(private http: HttpClient) { };

    /**
     * login
     * @param loginForm: FormGroup
     * @returns observable: {token: string}
     */
    public login(loginForm: FormGroup): Observable<{token: string} | any> {

        // const body = JSON.stringify({
        //     username: loginForm.value.username,
        //     password: loginForm.value.password,
        // });

        const body = JSON.stringify({
            username: "mor_2314",
            password: "83r5^_",
        });
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .post(LOGIN_URL, body, { headers: headers})
            .pipe(
                map((response) => {

                    return response;
                }),
                catchError((error) => {
    
                    return throwError(error);
                }),
            );
    }

}

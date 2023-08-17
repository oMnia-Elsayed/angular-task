import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

/** UserService */
@Injectable({
    providedIn: 'root',
})
export class UserService {

    /**
     * constructor
     * @param router 
     */
    constructor(private router: Router) { };

    /**
     * login
     */
    public login(loginForm: FormGroup) {

        const body = JSON.stringify({
            username: "mor_2314",
            password: "83r5^_",
        });

        fetch('https://fakestoreapi.com/auth/login', {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body
        })
            .then((res: any) => {
                try {
                    res.json();
                    
                    this.router.navigate(["/dashboard"]);
                    if(loginForm.value.username.toLowerCase() === "admin") {
                        localStorage.setItem("isAdmin", "true");
                    } else {
                        localStorage.setItem("isAdmin", "false");
                    }

                } catch (error) {
                    throw error;
                }
            })
        // .then(json => console.log(json))

    }

}

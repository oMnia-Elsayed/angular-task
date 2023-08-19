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
            username: loginForm.value.username,
            password: loginForm.value.password,
        });

        fetch('https://fakestoreapi.com/auth/login', {
            method: "POST",
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

    }

}

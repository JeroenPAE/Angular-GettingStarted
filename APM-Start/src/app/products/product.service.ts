import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IPorduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}

    getProducts() : Observable<IPorduct[]> {
        return this.http.get<IPorduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = ''
        if  (err.error instanceof ErrorEvent) {
            // A cleint-side or network error occured. Handle it accodingly.
            errorMessage = `An error occurred: ${err.error.message}`
        } else {
            // The backend returned an unsuccesful response code.
            // The repsonse body my contain clues as to what went wrong,
            errorMessage = `Server returnd code: ${err.status}, error message is: ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}
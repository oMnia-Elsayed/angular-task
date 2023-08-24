import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { ProductModel } from "../models/product.model";

/** ProductService */
@Injectable({
    providedIn: 'root',
})
export class ProductService {

    /**
     * constructor
     * @param http 
     */
    constructor(private http: HttpClient) {}

    /**
     * getAllProducts
     * @returns Observable<any>
     */
    public getAllProducts():Observable<any> {
    
        const url = 'https://fakestoreapi.com/products';
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .get(url, { headers: headers})
            .pipe(
                map((response) => {

                    return response && this.mapProductsModel(response as ProductModel[]);
                }),
                catchError((error) => {
    
                    return throwError(error);
                }),
            );
    }

    /**
     * mapProductsModel
     * @param data
     * @returns {ProductModel[]}
     */
    public mapProductsModel(data: ProductModel[]): ProductModel[] {
        let productsModel: ProductModel[] = [];

        Array.isArray(data) && data.forEach(el => {
            const mappedModel: ProductModel = {
                id: el?.id,
                category: el?.category,
                description: el?.description,
                image: el?.image,
                price: el?.price,
                title: el?.title,
                rating: { ...el?.rating }
            }

            productsModel.push(mappedModel);
        });


        return productsModel;
    }

    /**
     * getAllCategories
     * @returns Observable<any>
     */
    public getAllCategories(): Observable<any> {

        const url = 'https://fakestoreapi.com/products/categories';
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .get(url, { headers: headers})
            .pipe(
                map((response) => {

                    return response;
                }),
                catchError((error) => {
    
                    return throwError(error);
                }),
            );
    }

    /**
     * getSpecificCategory
     * @param category: string
     * @returns Observable<any>
     */
    public getSpecificCategory(category: string): Observable<any> {

        const url = `https://fakestoreapi.com/products//category/${category}`;
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .get(url, { headers: headers})
            .pipe(
                map((response) => {

                    return response && this.mapProductsModel(response as ProductModel[]);
                }),
                catchError((error) => {
    
                    return throwError(error);
                }),
            );
    }

    /**
     * deleteProduct
     * @param id: number
     * @returns Observable<any>
     */
    public deleteProduct(id: number): Observable<any> {
       
        const url = `https://fakestoreapi.com/products/${id}`;
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .delete(url, { headers: headers})
            .pipe(
                map((response) => {

                    return response;
                }),
                catchError((error) => {
    
                    return throwError(error);
                }),
            );
    }

    /**
     * addProduct
     * @param product: ProductModel
     * @returns Observable<any>
     */
    public addProduct(product: ProductModel): Observable<any> {

        const body = JSON.stringify(product);

        const url = 'https://fakestoreapi.com/products';

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .post(url, body, { headers: headers})
            .pipe(
                map((response) => {

                    return response;
                }),
                catchError((error) => {
    
                    return throwError(error);
                }),
            );
    }

     /**
     * editProduct
     * @param product: ProductModel
     * @returns Observable<any>
     */
      public editProduct(product: ProductModel): Observable<any> {

        const body = JSON.stringify(product);

        const url = `https://fakestoreapi.com/products/${product?.id}`;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .put(url, body, { headers: headers})
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

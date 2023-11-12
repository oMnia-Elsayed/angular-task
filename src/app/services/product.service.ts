import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { ProductModel } from "../models/product.model";
import { PRODUCTS_URL, CATEGORIES_URL, DELETE_EDIT_PRODUCT_URL, SPECIFIC_CATEGORY_URL } from '../constants/api-defines';
import { HelperService } from "./helper.service";

/** ProductService */
@Injectable({
    providedIn: 'root',
})
export class ProductService {

    /**
     * constructor
     * @param http 
     * @param helper
     */
    constructor(private http: HttpClient, private helper: HelperService) {}

    /**
     * getAllProducts
     * @returns Observable<any>
     */
    public getAllProducts():Observable<any> {
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .get(PRODUCTS_URL, { headers: headers})
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

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .get(CATEGORIES_URL, { headers: headers})
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

        let  url = SPECIFIC_CATEGORY_URL;
        
        url = this.helper.prepareUrl(url, { category: category });
                
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
       
        let  url = DELETE_EDIT_PRODUCT_URL;
        
        url = this.helper.prepareUrl(url, { id: id });

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

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http
            .post(PRODUCTS_URL, body, { headers: headers})
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

        let  url = DELETE_EDIT_PRODUCT_URL;
        
        url = this.helper.prepareUrl(url, { id: product?.id });
        
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

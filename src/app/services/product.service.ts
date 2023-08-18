import { Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { uniq } from 'lodash';

/** ProductService */
@Injectable({
    providedIn: 'root',
})
export class ProductService {
    /** productsModel */
    public productsModel: ProductModel[];

    /** categories */
    public categories: string[];

    constructor() { }

    /**
    * getAllProducts
    */
    public async getAllProducts() {
        await fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => data && this.mapProductsModel(data));
    }


    /**
     * mapProductsModel
     * @param data
     */
    public mapProductsModel(data: any) {
        this.productsModel = [];
        this.categories = [];

        Array.isArray(data) && data.forEach(el => {
            const mappedModel: ProductModel = {
                id: el?.id,
                category: el?.category,
                description: el?.description,
                image: el?.image,
                price: el?.price,
                title: el?.title,
                rating: {...el?.rating}
            }

            this.productsModel.push(mappedModel);
            this.categories.push(el.category);

            this.categories = uniq(this.categories);
        });

    }
}

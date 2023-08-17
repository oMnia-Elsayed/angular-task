import { Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";

/** ProductService */
@Injectable({
    providedIn: 'root',
})
export class ProductService {
    /** productsModel */
    public productsModel: ProductModel[];

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
        });

    }
}

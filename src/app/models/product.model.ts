
/** ProductModel */
export interface ProductModel {

    /** id */
    id: number;

    /** category */
    category?: string;

    /** description */
    description?: string;

    /** image */
    image?: string;

    /** price */
    price?: number;

    /** title */
    title?: string;

    /** rate */
    rating?: Rate;
}

export interface Rate {
    /** rate */
    rate?: number;

    /** count */
    count?: number;
}
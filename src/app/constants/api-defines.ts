
export const BASE_URL = 'https://fakestoreapi.com';

export const LOGIN_URL = BASE_URL + '/auth/login';

export const PRODUCTS_URL = BASE_URL + '/products';

export const CATEGORIES_URL = PRODUCTS_URL + '/categories';

export const SPECIFIC_CATEGORY_URL = PRODUCTS_URL + '/category/{category}';

export const DELETE_EDIT_PRODUCT_URL = PRODUCTS_URL + '/{id}';

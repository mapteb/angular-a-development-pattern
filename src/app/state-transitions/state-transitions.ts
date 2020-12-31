/**
DEFAULT                   -> onload              -> processOnload()            -> onload_succcess             -> ONLOADSUCCESSVIEW
ONLOADSUCCESSVIEW         -> get_products        -> processGetProducts()       -> get_products_succcess       -> PRODUCTSVIEW
PRODUCTSVIEW              -> get_product_details -> processGetProductDetails() -> get_product_details_success -> PRODUCTDETAILSVIEW
PRODUCTDETAILSVIEW        -> add_to_cart         -> processAddToCart()         -> add_to_cart_success         -> ADDTOCARTSUCCESSVIEW
ADDTOCARTSUCCESSVIEW      -> get_cart            -> processGetCart()           -> get_cart_success            -> CARTVIEW
PRODUCTDETAILSVIEW        -> get_products        -> processGetProducts()       -> get_products_succcess       -> PRODUCTSVIEW
CARTVIEW                  -> get_product_details -> processGetProductDetails() -> get_product_details_success -> PRODUCTDETAILSVIEW
PRODUCTDETAILSVIEW        -> get_cart            -> processGetCart()           -> get_cart_success            -> CARTVIEW
PRODUCTSVIEW              -> add_product_form    -> processAddProductForm()    -> add_product_form_succcess   -> ADDPRODUCTFORMSUCCESSVIEW
ADDPRODUCTFORMSUCCESSVIEW -> add_product         -> processAddProduct()        -> add_product_succcess        -> ADDPRODUCTSUCCESSVIEW
 */
import { first } from 'rxjs/operators';
import { AppDataStore } from './app-data.store'
import { AppEvent } from './app-events.enum';
import { StateTransitionData } from './state-transitions.model';
import { AppRole, User } from './user.model';
import { AppViewState } from './view-states.enum';

export const AppPreEvents = {
    onload: {
        process: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            if (stData.user) {
                stData.postEvent = AppEvent.onload_success;
            }
            else {
                //TODO: handle auth error
            }
            return stData;
        }
    },
    get_products: {
        process: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            appDataStore.loadProducts();
            stData.postEvent = AppEvent.get_products_success;
            return stData;
        }
    },
    get_product_details: {
        process: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            appDataStore.loadProduct(stData.productId);
            stData.postEvent = AppEvent.get_product_details_success;
            return stData;
        }
    },
    add_product_form: {
        process: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            if (stData.user.appRoles.includes(AppRole.ADMIN)) {
                stData.postEvent = AppEvent.add_product_form_success;
            }
            else {
                //TODO: handle authorization error
            }
            return stData;
        }
    },
    add_product: {
        process: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            if (stData.user.appRoles.includes(AppRole.ADMIN)) {
                stData.product = appDataStore.addProduct(stData.product);
                stData.postEvent = AppEvent.add_product_success;
            }
            else {
                //TODO: handle authorization error
            }
            return stData;
        }
    },
    add_to_cart: {
        process: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            appDataStore.addToCart(stData.productId);
            stData.postEvent = AppEvent.add_to_cart_success;
            return stData;
        }
    },
    get_cart: {
        process: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.postEvent = AppEvent.get_cart_success;
            return stData;
        }
    },
}

export const AppPostEvents = {
    onload_success: {
        nextState: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.finalState = AppViewState.ONLOADSUCCESSVIEW;
            return stData;
        }
    },
    get_products_success: {
        nextState: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.finalState = AppViewState.PRODUCTSVIEW;
            return stData;
        }
    },
    get_product_details_success: {
        nextState: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.finalState = AppViewState.PRODUCTDETAILSVIEW;
            return stData;
        }
    },
    add_to_cart_success: {
        nextState: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.finalState = AppViewState.ADDTOCARTSUCCESSVIEW;
            return stData;
        }
    },
    get_cart_success: {
        nextState: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.finalState = AppViewState.CARTVIEW;
            return stData;
        }
    },
    add_product_form_success: {
        nextState: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.finalState = AppViewState.ADDPRODUCTFORMSUCCESSVIEW;
            return stData;
        }
    },
    add_product_success: {
        nextState: function (stData: StateTransitionData, appDataStore: AppDataStore): StateTransitionData {
            stData.finalState = AppViewState.ADDPRODUCTSUCCESSVIEW;
            return stData;
        }
    }
}

export function doTransition(appDataStore: AppDataStore, stData: StateTransitionData): StateTransitionData {
    appDataStore.state$.pipe(first(),).subscribe(ad => {
        stData.user = ad.user;
        stData = AppPreEvents[stData.preEvent].process(stData, appDataStore);
        stData = AppPostEvents[stData.postEvent].nextState(stData, appDataStore);
    });
    return stData;
}






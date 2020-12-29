# Angular SPAs - A Development Pattern

This project proposes a development pattern for Angular SPAs. The pattern sugggests the following steps:

1. Capture the SPA requirements into a set of state transitions.
   For the [demo example SPA](https://mapteb.github.io/angular-a-development-pattern), the state transitions considered are:

   <pre>
   =================================================================================================================================
      <strong>Initial State</strong>          |  <strong>Pre-event</strong>           |   <strong>Processor</strong>                |      <strong>Post-event</strong>               |  <strong>Final State</strong>
   =================================================================================================================================
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
   =================================================================================================================================
   </pre>

   Please note that error conditions like add_product_error etc., are not considered in the above list but can be easily added as additional state tranitions where needed.

2. Configure the events and view states in TypeScript enums ([app-events.enum.ts](https://github.com/mapteb/angular-a-development-pattern/blob/main/src/app/state-transitions/app-events.enum.ts) and [view-states.enum.ts](https://github.com/mapteb/angular-a-development-pattern/blob/main/src/app/state-transitions/view-states.enum.ts)) and the transitions as const variables [state-transions.ts](https://github.com/mapteb/angular-a-development-pattern/blob/main/src/app/state-transitions/state-transitions.ts)

3. Create one Angular component for each pre-event.

4. Configure each pre-event URL in app-routing.module.ts

### Demo

A demo of this project can be viewed [here](https://mapteb.github.io/angular-a-development-pattern) where all the state transitions listed above can be tested.

### Benefits

1. The pattern provides a clear guideline when a new feature need to be added. For instance, if a new requirement like "if the user is not logged in then redirect to login page" need to be be added then the developer can proceed by writing additional state transitions like:

   <pre>
   DEFAULT       -> onload -> processOnload() -> onload_auth_error -> LOGINFORMVIEW
   LOGINFORMVIEW -> login  -> processLogin()  -> login_success     -> ONLOADSUCCESSVIEW
   </pre>

and proceed with the remaining steps.
2. Guard conditions are easily implemented in one place - in the state-transitions.ts file.
3. The use of one component per pre-event helps in keeping the codebase modular.
4. The state


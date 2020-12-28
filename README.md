# Angular SPAs - A Development Pattern

This project proposes a development pattern for Angular SPAs. The pattern sugggests the following steps:

1. Capture the SPA requirements into a set of state transitions.
   For the demo example SPA considered in this project, the state transitions used are:

   <pre>
   =================================================================================================================================
      Initial State              |  Pre-event |   Processor      |      Post-event               |     Final State
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

2. Configure the events and view states in TypeScript enums (app-events.enum.ts and view-states.enum.ts) and the transitions as const variables (state-transions.ts)

3. Create one Angular component for each pre-event (home.component.ts, products.component.ts, product-details.component.ts etc.)

4. Configure each pre-event in app-routing.module.ts

## Benefits

The pattern provides a clear guideline when a new feature need to be added. For instance, if a new requirement like "if user not logged in then redirect to login page" need to be be added then the developer can proceed by writing the state transition like:

DEFAULT   -> onload -> processOnload() -> onload_auth_error -> LOGINVIEW
LOGINVIEW -> login  -> processLogin()  -> login_success     -> ONLOADSUCCESSVIEW

and proceed with the remaining steps.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts


In the project directory, you can run:
### 'yarn install' or ` npm install`
this will install all dependencies


### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


###  This is the UI section built with react library

It consists of category component, productitem component, productdetail component, cart component and mini cart component

I use react router with  following routing

'/' will be redirect to '/all'
'/all' to get all products from all categories
'/clothes' to get products that has category 'clothes'
'/tech' to get products that  have category 'tech'
'/cart' to show the cart view
"/products/:categoryName/:productId" to get product detail view (required parameters are category name and product id)

## i built the cart with a certain mechanism

there are products with no attributes, several attributes, one attribute and out of stock
if i add a product with no attribute to the cart and there is same product in cart then  the quantity ofthe product in cart will be increased
if i add a product with no attribute to the cart and there is no product with same id in cart then a new product with quantity 1 will be added to the cart
if i add a product with one attribute to the cart and there is same product in cart then if the product in cart has same attribute selection then the quantity will be increased otherwise new product will be added to cart with different attribute selection
if i add a product with several attributes to the cart and there is same product in cart then if the product in cart has same attributes selections then the quantity will be increased otherwise new product will be added to cart with different attributes selections

## restriction
I cannot add any product to cart without selecting from all available attributes

# features
I can increase or decrease quantity of any product in the cart from mini cart or cart component
I can remove any product from the cart from mini cart or cart component
I change the currency anytime
I can close any sub-menus by clicking outside or when i navigate to next view
If the product is out of stock then add to cart button will be disabled 


All icons in the app are svg icons.
The product color selections are shown as actual color not hex value 

I have used redux in this application to manage data shared by various components
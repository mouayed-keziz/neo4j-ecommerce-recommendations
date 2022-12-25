# DATA MODELING
data model for an ecommerce website that includes a recommendation system based on product ratings and user purchase history:

## Nodes:

`User`: Each user will have a unique identifier (e.g. an email address or user ID), as well as properties such as name, address, and payment information.<br/>
`Product`: Each product will have a unique identifier (e.g. a product ID), as well as properties such as name, price, and category.<br/>
`Order`: Each order will have a unique identifier (e.g. an order number), as well as properties such as the date of the order, the total cost, and the status (e.g. "completed", "cancelled", etc.).
<br/>

## Relationships:

`BOUGHT`: This relationship will connect a User node to a Product node, and will represent that the user has purchased the product. You might want to include properties on this relationship such as the date of the purchase and the rating that the user gave to the product.<br/>
`IN_CART`: This relationship will connect a User node to a Product node, and will represent that the product is currently in the user's shopping cart.<br/>
`PART_OF`: This relationship will connect an Order node to a Product node, and will represent that the product was included in the order.
<br/>


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
<br/><br/><br/>

# working with Cypher (neo4j)
- ### `To create a node:`
```sql
CREATE (n:Label {properties})
RETURN n
```

- ### `Example: with known id`
```sql
CREATE (n:Product {id: 1, name: "Product 1", price: 99.99})
RETURN n
```

- ### `Example: with generated id`
```sql
CREATE (n:Product {id: apoc.create.uuid(), name: "Product 1", price: 99.99})
RETURN n
```

- ### `To delete a node:`
```sql
MATCH (n:Label)
WHERE n.property = value
DELETE n
```

- ### `Example:`
```sql
MATCH (n:Product)
WHERE n.name = "ROG ROG ROG"
DELETE n
```
- ### `To update a node:`

```sql
MATCH (n:Label)
WHERE n.property = value
SET n.property = newValue
RETURN n
```
- ### `Example:`
```sql
MATCH (n:Product)
WHERE n.name = "ROG ROG ROG"
SET n.price = 119.99
RETURN n
```
- ### `To create a relationship between two nodes:`
```sql
MATCH (n1:Label1), (n2:Label2)
WHERE n1.property = value1 AND n2.property = value2
CREATE (n1)-[r:Type]->(n2)
RETURN r
```

- ### `Example:`
```sql
MATCH (p1:Product), (p2:Product)
WHERE p1.name = "Mac Book Pro 2022" AND p2.name = "ROG ROG ROG"
CREATE (p1)-[r:RELATED_TO]->(p2)
RETURN r
```

- ### `Access to a node through relation`
```sql
MATCH (p1:Product)-[r:RELATED_TO]->(p2:Product)
WHERE p1.name = "ROG ROG ROG"
RETURN p2
```
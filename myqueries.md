## user and user
---

```sql
MATCH (u:User {id:'30d537b8-9414-4a97-a88f-706afc277bb3'})
OPTIONAL MATCH (u)-[:HAS_IN_CART]->(p:Product)
OPTIONAL MATCH (u)-[:PLACED_ORDER]->(o:Order)-[:INCLUDES]->(p2:Product)
WITH COLLECT(DISTINCT p) + COLLECT(DISTINCT p2) as products, u
UNWIND products as product
MATCH (otherUser:User)-[:PLACED_ORDER|HAS_IN_CART]->(p3:Product)
WHERE NOT (u)-[:PLACED_ORDER|HAS_IN_CART]->(p3) AND p3.id <> product.id 
WITH DISTINCT p3, COUNT(DISTINCT otherUser) as similarity 
ORDER BY similarity DESC
RETURN p3 LIMIT 12
```

## both
---

```sql
MATCH (u:User {id:'30d537b8-9414-4a97-a88f-706afc277bb3'})
OPTIONAL MATCH (u)-[:HAS_IN_CART]->(p:Product)
OPTIONAL MATCH (u)-[:PLACED_ORDER]->(o:Order)-[:INCLUDES]->(p2:Product)
WITH COLLECT(DISTINCT p) + COLLECT(DISTINCT p2) as products, u
UNWIND products as product
MATCH (otherUser:User)-[:PLACED_ORDER|HAS_IN_CART]->(p3:Product)
WHERE NOT (u)-[:PLACED_ORDER|HAS_IN_CART]->(p3) AND p3.id <> product.id 
OR (p3.cpu = product.cpu OR p3.gpu = product.gpu OR p3.brand = product.brand)
WITH DISTINCT p3, COUNT(DISTINCT otherUser) as similarity 
ORDER BY similarity DESC
RETURN p3 LIMIT 12
```

## specify gpu cpu and brand
---

```sql
MATCH (u:User {id: '30d537b8-9414-4a97-a88f-706afc277bb3'})
OPTIONAL MATCH (u)-[:HAS_IN_CART]->(p:Product)
OPTIONAL MATCH (u)-[:PLACED_ORDER]->(o:Order)-[:INCLUDES]->(p2:Product)
WITH COLLECT(DISTINCT p) + COLLECT(DISTINCT p2) as products, u
UNWIND products as p
MATCH (p3:Product)
WHERE NOT (u)-[:PLACED_ORDER|HAS_IN_CART]->(p3)
WITH p3, products
MATCH (p4:Product)
WHERE p4.id <> p3.id AND (p4.cpu = p3.cpu OR p4.gpu = p3.gpu OR p4.brand = p3.brand)
AND p4 IN products
WITH p3, COUNT(DISTINCT p4) as similarity, products
ORDER BY similarity DESC
RETURN DISTINCT p3 LIMIT 12
```





AMINE : 900
MOUAUYD : 1100
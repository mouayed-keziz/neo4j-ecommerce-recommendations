import { Container, Box, Button, Title, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

import { ProductsGrid, ProductDetails, ProductDetailsSkeleton } from "../components/_index";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const fetchProducts = async () => {
        const result = await axios.get(`http://localhost:5000/products/${id}`);
        console.table(result.data);
        setProduct(result.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container size={"xl"}>
            <Group mb={20}>
                <Title ml={10} order={2}>Product Details</Title>
            </Group>
            {product ? (
                <ProductDetails data={product} />) : (<ProductDetailsSkeleton />)}
            <Box mt={70} m={0} p={0}>
                <ProductsGrid useRecommandation={true} ProductsNumber={4} />
            </Box>
        </Container>
    );
}


export default ProductPage;

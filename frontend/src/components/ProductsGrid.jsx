
import { Box, Button, Grid, Group, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
const ProductsGrid = ({ text, ProductsNumber, useRecommandation }) => {

    const [products, setProducts] = useState(null);
    const { currentUser } = useContext(AuthContext)

    const url = useRecommandation && currentUser ? `http://localhost:5000/products/recommandations/${currentUser.id}` : `http://localhost:5000/products/some/${ProductsNumber}`
    const fetchProducts = async () => {
        const result = await axios.get(url);
        setProducts(result.data);
        console.log(products)
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const [useSkeletons, toggleState] = useToggle();
    const [selectedImage, toggleImage] = useToggle();

    return (
        <Box sx={(theme) => ({
            margin: 10,
            [theme.fn.smallerThan('sm')]: {
                margin: 0,
            },
            marginBottom: theme.spacing.xl * 3,
        })}>
            <Group mb={20}>
                <Title ml={10} order={2}>{text}</Title>
            </Group>
            {products ? (
                <Grid gutter={5} m={0} p={0}>
                    {products.map((element, index) => (
                        <Grid.Col key={index} span={6} xs={6} sm={4} lg={3}>
                            <ProductCard data={element} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <Grid gutter={5} m={0} p={0}>
                    {Array.from({ length: ProductsNumber }, () => 0).map((element, index) => (
                        <Grid.Col key={index} span={6} xs={6} sm={4} lg={3}>
                            <ProductCardSkeleton />
                        </Grid.Col>
                    ))}
                </Grid>
            )}


        </Box >
    );
}


export default ProductsGrid;
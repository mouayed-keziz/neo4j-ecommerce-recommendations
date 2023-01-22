import { Carousel } from '@mantine/carousel';
import { Title, Box, Group, Button } from '@mantine/core';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsCarousel = () => {

    const [products, setProducts] = useState(null);
    const fetchProducts = async () => {
        const result = await axios.get("http://localhost:5000/products/some/15");
        setProducts(result.data);
        console.log(products)
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const is_sm = useMediaQuery('(min-width: 768px)');


    return (
        <Box sx={(theme) => ({
            margin: 10,
            //align children to the center
            [theme.fn.smallerThan('sm')]: {
                margin: 0,
                marginBottom: theme.spacing.xl * 3,
            },
            marginBottom: theme.spacing.xl * 3,
        })}>
            <Group mb={20}>
                <Title ml={10} order={2}>Section 1</Title>
            </Group>
            <Carousel
                withControls={is_sm}
                slideSize="19.5%"
                slideGap={20}
                loop
                breakpoints={[
                    { maxWidth: "lg", slideSize: "25%" },
                    { maxWidth: 'md', slideSize: '33.33333%' },
                    { maxWidth: 'sm', slideSize: '50%' },
                    { maxWidth: 'xs', slideSize: '75%' },
                ]}
                align={is_sm ? 'start' : 'center'}
            >

                {products ? (
                    products.map((element, index) => (
                        <Carousel.Slide key={index}>
                            <ProductCard index={index} data={element} />
                        </Carousel.Slide>
                    ))
                ) : (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, index) => (
                        <Carousel.Slide key={index}>
                            < ProductCardSkeleton />
                        </Carousel.Slide>
                    ))
                )}
            </Carousel>
        </Box>
    );
}


export default ProductsCarousel;











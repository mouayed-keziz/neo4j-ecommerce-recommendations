import { Carousel } from '@mantine/carousel';
import { Title, Box, Group, Button } from '@mantine/core';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductsCarousel = () => {

    const is_sm = useMediaQuery('(min-width: 768px)');

    const products = [0, 0, 0, 0, 0, 0, 0, 0];
    const [useSkeletons, toggleState] = useToggle();
    const [selectedImage, toggleImage] = useToggle();

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
                <Button onClick={() => toggleState()}>state</Button>
                <Button onClick={() => toggleImage()}>image</Button>
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
                {products.map((_, index) => (
                    <Carousel.Slide key={index}>
                        {useSkeletons ? < ProductCardSkeleton /> : <ProductCard selectedImage={selectedImage} />}
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Box>
    );
}


export default ProductsCarousel;











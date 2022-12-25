
import { Box, Button, Grid, Group, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsGrid = ({ ProductsNumber }) => {

    const data = Array(ProductsNumber).fill(0)
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
                <Title ml={10} order={2}>Section 2</Title>
                <Button onClick={() => toggleState()}>state</Button>
                <Button onClick={() => toggleImage()}>image</Button>
            </Group>
            <Grid gutter={5} m={0} p={0}>
                {data.map((_, index) => (
                    <Grid.Col key={index} span={6} xs={6} sm={4} lg={3}>
                        {useSkeletons ? <ProductCardSkeleton /> : <ProductCard selectedImage={selectedImage} isGrid />}
                    </Grid.Col>
                ))}
            </Grid>
        </Box >
    );
}


export default ProductsGrid;
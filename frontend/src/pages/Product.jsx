import { Container, Box, Button, Title, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

import { ProductsGrid, ProductDetails, ProductDetailsSkeleton } from "../components/_index";

const ProductPage = () => {

    const [useSkleton, toggle] = useToggle();

    return (
        <Container size={"xl"}>
            <Group mb={20}>
                <Title ml={10} order={2}>Product Details</Title>
                <Button onClick={() => toggle()}>state</Button>
            </Group>
            {useSkleton ? (<ProductDetailsSkeleton />) : <ProductDetails />}
            <Box mt={70} m={0} p={0}>
                <ProductsGrid ProductsNumber={4} />
            </Box>
        </Container>
    );
}


export default ProductPage;

import { Carousel } from "@mantine/carousel";
import { ActionIcon, Anchor, Badge, Breadcrumbs, Container, createStyles, Grid, Group, Image, Table, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import ProductCollapse from "../ProductCollapse";
import productImage from "../../assets/images/product-2.jpg"
import { useMediaQuery } from "@mantine/hooks";
const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
    },
    icon: {
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        },
    },
}));

export default function ProductDetailsAdmin() {

    const { classes } = useStyles();
    const is_md = useMediaQuery('(min-width: 1200px)');

    const items = [
        { title: 'DIGITAL-EASY', href: '/' },
        { title: 'ECOMMERCE', href: '/' },
        { title: 'PRODUCT-0001', href: '/product' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} sx={theme => ({
            fontSize: theme.fontSizes.xl,
            [theme.fn.smallerThan('xs')]: {
                fontSize: theme.fontSizes.sm,
            },
        })}>
            {item.title}
        </Anchor>
    ));

    return (
        <Container>
            <Group position="apart" className={classes.header}>
                <Group>
                    <ActionIcon className={classes.icon} radius="xl">
                        <IconChevronLeft size={24} />
                    </ActionIcon>
                    <h2>Product Details</h2>
                </Group>
            </Group>
            <Grid p={0} m={0}>
                {is_md ? (<ProductGallery />) : null}

                <Grid.Col sm={12} lg={6}>
                    <Breadcrumbs sx={(theme) => ({
                        maxWidth: "100vw",
                        overflow: "hidden",
                        marginBottom: theme.spacing.xl * 2,
                    })
                    }>
                        {items}
                    </Breadcrumbs>
                    {!is_md ? (<ProductGallery />) : null}

                    <Title mb={20} weight={400} order={2}>PRODUCT-0001</Title>
                    <Badge size="xl" variant="outline">20 000DA</Badge>
                    <Table mt={"md"}>
                        <tbody>
                            <tr><td>NAME</td><td>Apple MacBook Air M2</td></tr>
                            <tr><td>CPU</td><td>Apple M2</td></tr>
                            <tr><td>RAM</td><td>16GB</td></tr>
                            <tr><td>STORAGE</td><td>512GB</td></tr>
                            <tr><td>COUNT_IN_STOCK</td><td>10</td></tr>
                            <tr><td>PRICE</td><td>200 000DA</td></tr>
                        </tbody>
                    </Table>
                    <ProductCollapse />
                </Grid.Col>
            </Grid>
        </Container >
    );
}


function ProductGallery() {

    const is_sm = useMediaQuery('(min-width: 768px)');

    return (
        <Grid.Col sm={12} lg={6}>
            <Image radius={"md"} mb={10} src={productImage} alt="ProductImage" />

            <Carousel withControls={is_sm} slideGap="xs" mt={0} mx="auto" align="center" slideSize="33.3333333%" slidesToScroll={1} loop draggable={true} controlsOffset="xs"
                onNextSlide={() => console.log("Next slide")}
                onPreviousSlide={() => console.log("Prev slide")}
            >
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <Carousel.Slide key={index}>
                        <Image radius={"md"} src={productImage} alt={`ProductImage${index}`} />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Grid.Col>
    );
}
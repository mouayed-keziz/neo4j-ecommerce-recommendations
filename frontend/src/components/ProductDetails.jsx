import { Carousel } from "@mantine/carousel";
import { Grid, Image, Anchor, Breadcrumbs, Badge, Title, Group, Button, ActionIcon, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconHeart, IconShoppingCart, IconReplace } from "@tabler/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import productImage from "../assets/images/product-2.jpg";
import { ProductCollapse, ProductDetailsSkeleton } from "./_index";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = ({ data }) => {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const is_md = useMediaQuery('(min-width: 1200px)');
    const [isLoading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);


    const addToCartHandeler = () => {
        setLoading(true);
        axios.post("http://localhost:5000/users/addtocart", {
            userId: currentUser.id,
            productId: data.id,
            quantity: 1
        }).then(res => {
            setLoading(false);
            navigate("/cart");
        }).catch(err => {
            setLoading(false);
            console.log(err);
        }
        )
    }

    const items = [
        { title: 'DIGITAL-EASY', href: `/product/${data.id}` },
        { title: data.brand, href: `/product/${data.id}` },
        { title: data.cpu, href: `/product/${data.id}` },
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
        <>
            {data ? (
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

                        <Title mb={20} weight={400} order={2}>{data.brand + " " + data.cpu}</Title>
                        <Badge size="xl" variant="outline">20 000DA</Badge>
                        <ul>
                            {Object.keys(data).map((key, index) => {
                                return <li key={index}>{key + ": " + data[key]}</li>
                            })}
                        </ul>
                        <Group position="start" mt={20}>
                            <Button disabled={!currentUser} onClick={() => { addToCartHandeler() }} loading={isLoading} leftIcon={<IconShoppingCart />} variant="default" radius="md" size="lg">
                                Add to cart
                            </Button>

                            <Tooltip label={isLiked ? "Unlike this product" : "Like this product"}>
                                <ActionIcon onClick={() => setIsLiked(!isLiked)} size="xl" radius="xl" variant="transparent">
                                    {isLiked ? <IconHeart fill="red" /> : <IconHeart />}
                                </ActionIcon>
                            </Tooltip>

                            <Tooltip label="Add to compare">
                                <ActionIcon size="xl" radius="xl" variant="transparent">
                                    <IconReplace size={25} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                        <ProductCollapse />
                    </Grid.Col>
                </Grid>
            ) : (
                "..."
            )}
        </>
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



export default ProductDetails;
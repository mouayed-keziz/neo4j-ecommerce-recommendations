import { Carousel } from "@mantine/carousel";
import { Grid, Image, Group, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import productImage from "../assets/images/product-2.jpg";
import { ProductCollapse } from "./_index";

const ProductDetails = () => {

    const is_md = useMediaQuery('(min-width: 1200px)');

    return (
        <Grid p={0} m={0}>
            {is_md ? (<ProductGallery />) : null}

            <Grid.Col sm={12} lg={6}>
                <Skeleton height={32} mb={35} />
                {!is_md ? (<ProductGallery />) : null}

                <Skeleton height={35} mt={10} mb={20} sx={theme => ({
                    width: "50%",
                    [theme.fn.smallerThan('sm')]: {
                        width: "75%",
                    },
                })} />
                <Skeleton height={35} mb={25} sx={theme => ({
                    width: "35%",
                    [theme.fn.smallerThan('sm')]: {
                        width: "50%",
                    },
                })}></Skeleton>
                <Skeleton mb={10} width={"100%"} height={20} />
                <Skeleton mb={10} width={"80%"} height={20} />
                <Group position="start" mt={20}>
                    <Skeleton width={200} height={45} mt={15}>
                    </Skeleton>
                </Group>
                <ProductCollapse isSkeleton />
            </Grid.Col>
        </Grid >
    );
}

function ProductGallery() {

    return (
        <Grid.Col sm={12} lg={6}>
            <Skeleton p={0} mb={10} radius="md">
                <Image src={productImage} alt="ProductImage" />
            </Skeleton>

            <Carousel withControls={false} slideGap="xs" mt={0} mx="auto" align="center" slideSize="33.3333333%" slidesToScroll={1} loop draggable={false} controlsOffset="xs"
                onNextSlide={() => console.log("Next slide")}
                onPreviousSlide={() => console.log("Prev slide")}
            >
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <Carousel.Slide key={index}>
                        <Skeleton>
                            <Image radius={"md"} src={productImage} alt={`ProductImage${index}`} />
                        </Skeleton>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Grid.Col>
    );
}



export default ProductDetails;
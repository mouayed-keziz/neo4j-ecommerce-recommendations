import { ActionIcon, Box, Button, Center, Container, Divider, Grid, Group, Image, Radio, Text, Title, Tooltip } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import image from "../assets/images/product-2.jpg";

const CartPage = () => {

    return (
        <Container size={"lg"}>
            <Center><Title mb={"xl"}>Cart :</Title></Center>
            <Grid gutter={"xl"}>
                <Grid.Col sm={12} md={8} px={20} sx={theme => ({
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
                    borderRadius: theme.radius.md,
                })}>
                    <Grid my={10} columns={24} sx={theme => ({
                        [theme.fn.smallerThan("md")]: {
                            display: "none",
                        },
                    })}>
                        <Grid.Col span={12}><Center><Text weight={700}>PRODUCT</Text></Center></Grid.Col>
                        <Divider orientation="vertical" />
                        <Grid.Col span={3}><Center><Text weight={700}>PRICE</Text></Center></Grid.Col>
                        <Divider orientation="vertical" />
                        <Grid.Col span={4}><Center><Text weight={700}>QUANTITY</Text></Center></Grid.Col>
                        <Divider orientation="vertical" />
                        <Grid.Col span={3}><Center><Text weight={700}>TOTAL</Text></Center></Grid.Col>
                    </Grid>
                    <Divider sx={theme => ({
                        [theme.fn.smallerThan("md")]: {
                            display: "none",
                        },
                    })} />
                    <CartProduct />
                    <Divider />
                    <CartProduct />
                    <Divider />
                    <CartProduct />
                </Grid.Col>
                <Grid.Col sm={12} md={4} sx={theme => ({
                    padding: 0,
                    paddingLeft: theme.spacing.md,
                    [theme.fn.smallerThan("md")]: {
                        paddingLeft: 0,
                    }
                })}>
                    <Box sx={theme => ({
                        borderRadius: theme.radius.md,
                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
                    })}>
                        <Box sx={theme => ({
                            paddingTop: theme.spacing.md,
                            paddingLeft: theme.spacing.md,
                            paddingRight: theme.spacing.md,
                            [theme.fn.smallerThan("md")]: {
                                marginTop: theme.spacing.md,
                            },
                        })}>
                            <Title order={2} mb={25}>Cart Total</Title>
                            <Text size={"md"} color="dimmed">Subtotal : 60000DA</Text>
                            <Text size={"md"} color="dimmed">Elements : 3</Text>
                            <Group position="left">
                                <Text size={"md"} color="dimmed">Shipping : </Text>
                                <Radio.Group mt={35}
                                    orientation="vertical"
                                    spacing="sm"
                                    offset={"xl"}
                                    defaultValue="yalidin"
                                >
                                    <Radio value="yalidin" label="yalidin : 3000DA" />
                                    <Radio value="freeShiping" label="free shiping 0DA" />
                                    <Radio value="localPickup" label="local pickup 0DA" />
                                </Radio.Group>
                            </Group>
                            <Divider my={20} />
                            <Text size={"md"} weight={500}>Total : 60300DA</Text>
                        </Box>
                        <Button size="xl" mt={30} sx={theme => ({
                            width: "100%",
                        })}>
                            PROCEED TO CHECKOUT
                        </Button>
                    </Box>
                </Grid.Col>
            </Grid>
        </Container >
    );
}


function CartProduct() {
    const showWhenMd = theme => ({
        display: "none",
        [theme.fn.smallerThan('md')]: {
            display: 'block',
        },
    })
    return (
        <Grid my={10} sx={theme => ({
            borderRadius: theme.radius.md,
            "&:hover": {
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
            },
        })}>
            <Grid.Col span={6}>
                <Group spacing="sm">
                    <Group sx={theme => ({
                        [theme.fn.smallerThan("xs")]: {
                            flexDirection: "row-reverse",
                        },
                    })}>
                        <Tooltip label="delete this product">
                            <ActionIcon variant="outline"><IconTrash size={18} color="red" /> </ActionIcon>
                        </Tooltip>
                        <Image width={70} height={70} radius={"md"} src={image} alt="Panda" />
                    </Group>
                    <Box sx={theme => ({
                        marginLeft: theme.spacing.xs,
                        [theme.fn.smallerThan("sm")]: {
                            marginLeft: 0,
                        },
                    })}>
                        <Text weight={500}>Product Name</Text>
                        <Text size="sm">Product Description</Text>
                    </Box>
                </Group>
            </Grid.Col>
            <Grid.Col span={6} sx={theme => ({
                marginTop: 20,
                [theme.fn.smallerThan("md")]: {
                    marginTop: "0",
                }
            })}>
                <Grid >
                    <Divider orientation="vertical" />
                    <Grid.Col xs={12} md={3}  ><Group position="center"><Text weight={700} sx={showWhenMd}>PRICE:</Text>20000DA</Group></Grid.Col>
                    <Divider orientation="vertical" />
                    <Grid.Col xs={12} md={4}  >
                        <Grid py={5} >
                            <Group sx={theme => ({
                                width: "100vw",
                            })} position="center">
                                <Tooltip label="decrement">
                                    <ActionIcon variant="outline"> <IconMinus size={18} /> </ActionIcon>
                                </Tooltip>
                                <Center><Text weight={700} >2</Text></Center>
                                <Tooltip label="increment">
                                    <ActionIcon variant="outline"> <IconPlus size={18} /></ActionIcon>
                                </Tooltip>
                            </Group>
                        </Grid>
                    </Grid.Col>
                    <Divider orientation="vertical" />
                    <Grid.Col xs={12} md={3}  ><Group position="center"><Text weight={700} sx={showWhenMd}>TOTAL:</Text>40000DA</Group></Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid >
    );
}

export default CartPage;

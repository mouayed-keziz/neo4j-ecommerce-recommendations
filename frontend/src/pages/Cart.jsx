import { ActionIcon, Anchor, Box, Button, Center, Container, Divider, Grid, Group, Image, Radio, Text, Title, Tooltip, useMantineTheme } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import image from "../assets/images/product-2.jpg";
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
    // we get the current user from the AuthContext
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(currentUser.id);
    // we create a state to store the cart
    const [cart, setCart] = useState([]);
    // we get the cart from the backend using the current user id 
    useEffect(() => {
        getproducts();
    }, [])

    const getproducts = () => {
        axios.get(`http://localhost:5000/users/cart/${currentUser.id}`)
            .then(res => {
                setCart(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const orderHandler = () => {
        axios.post("http://localhost:5000/orders/checkout", { userId: currentUser.id }).then(res => {
            console.log("done" + currentUser.id);
            navigate("/");
        }).catch(err => {
            console.log("err")
            console.log(err);
        }
        )
    }


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
                        <Grid.Col span={3}><Center><Text weight={700}></Text></Center></Grid.Col>
                        <Grid.Col span={1}><Center><Text weight={700}></Text></Center></Grid.Col>
                        <Grid.Col span={6}><Center><Text weight={700}>PRICE</Text></Center></Grid.Col>
                    </Grid>
                    <Divider sx={theme => ({
                        [theme.fn.smallerThan("md")]: {
                            display: "none",
                        },
                    })} />
                    {cart && cart.map((product, index) => (
                        <div key={index}>
                            <CartProduct product={product} />
                            <Divider />
                        </div>
                    ))}
                    {cart && cart.length === 0 && (
                        <Box sx={theme => ({
                            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
                            borderRadius: theme.radius.md,
                            padding: theme.spacing.md,
                        })}>
                            <Center>
                                <Text size={"xl"} weight={700}>Your cart is empty</Text>
                            </Center>
                        </Box>

                    )}
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
                            <Text size={"md"} color="dimmed">Subtotal : {cart.reduce((acc, product) => acc + parseFloat(product.price), 0)}DA</Text>
                            <Text size={"md"} color="dimmed">Elements : {cart.length}</Text>
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
                            <Text size={"md"} weight={500}>Total : {cart.reduce((acc, product) => acc + parseFloat(product.price), 0)}DA</Text>
                        </Box>
                        <Button onClick={() => orderHandler()} disabled={cart.length === 0} size="xl" mt={30} sx={theme => ({
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


function CartProduct({ product }) {
    const theme = useMantineTheme();
    const showWhenMd = theme => ({
        display: "none",
        [theme.fn.smallerThan('md')]: {
            display: 'block',
        },
    })
    return (
        <Anchor color={theme.colorScheme === "dark" ? "white" : "black"} component={Link} to={`/product/${product.id}`} >
            <Grid my={10} sx={theme => ({
                borderRadius: theme.radius.md,
                "&:hover": {
                    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
                },
            })}>
                <Grid.Col span={9}>
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
                            <Text weight={500}>{product.brand + " " + product.cpu}</Text>
                            <Text size="sm">{product.cpu + " " + product.gpu}</Text>
                        </Box>
                    </Group>
                </Grid.Col>
                <Grid.Col span={3} sx={theme => ({
                    marginTop: 20,
                    [theme.fn.smallerThan("md")]: {
                        marginTop: "0",
                    }
                })}>
                    <Grid >
                        <Grid.Col xs={12} md={3}  ><Group position="center"><Text weight={700} sx={showWhenMd}>PRICE:</Text></Group></Grid.Col>
                        <Grid.Col xs={12} md={4}  >
                            <Grid py={5} >

                            </Grid>
                        </Grid.Col>
                        <Grid.Col xs={12} md={3}  ><Group position="center"><Text weight={700} sx={showWhenMd}>TOTAL:</Text>{product.price}</Group></Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid >
        </Anchor>
    );
}

export default CartPage;

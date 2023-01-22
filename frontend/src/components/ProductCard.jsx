import { Card, Text, Badge, Button, Image, Group, Anchor, Tooltip } from "@mantine/core";
import { IconShoppingCart } from '@tabler/icons';
import image from '../assets/images/product.png';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

export default function ProductCard({ data }) {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const addToCartHandeler = () => {
        axios.post("http://localhost:5000/users/addtocart", {
            userId: currentUser.id,
            productId: data.id,
            quantity: 1
        }).then(res => {
            navigate("/cart");
        }).catch(err => {
            console.log(err);
        }
        )
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            {data ? <Anchor component={Link} to={`/product/${data.id}`} >
                <Card.Section>
                    <Image
                        src={image}
                        height={160}
                        alt="image"
                    />
                </Card.Section>


                <Group position="apart" mt="md" mb="xs">
                    <Text weight={400}>{data.brand}</Text>
                    <Badge color="primary" variant="light">
                        {data.price}DA
                    </Badge>
                </Group>

                <Text size="sm" color="dimmed" sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                }}>
                    {[data.cpu, data.gpu, data.ram_size, data.ram_type, data.disk_size, data.disk_type].join(" ")}
                </Text>
            </Anchor> : "..."}
            <Button onClick={() => addToCartHandeler()} disabled={!currentUser} leftIcon={<IconShoppingCart />} variant="outline" fullWidth mt="md" radius="md">
                Add to cart
            </Button>
        </Card>
    );
}
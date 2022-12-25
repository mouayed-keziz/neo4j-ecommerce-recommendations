import { Card, Text, Badge, Button, Image, Group, Anchor } from "@mantine/core";
import { IconShoppingCart } from '@tabler/icons';
import image from '../assets/images/product.png';
import image2 from '../assets/images/product-2.jpg';
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ isGrid, selectedImage }) {

    const navigate = useNavigate();

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Anchor component={Link} to="/product" >
                <Card.Section>
                    <Image
                        src={selectedImage ? image2 : image}
                        height={160}
                        alt="image"
                    />
                </Card.Section>


                <Group position="apart" mt="md" mb="xs">
                    <Text weight={400}>product</Text>
                    <Badge color="primary" variant="light">
                        20 000 DA
                    </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                    Lorem ipsum dolor, sit amet consect.
                </Text>
            </Anchor>
            <Button onClick={() => navigate("/cart")} leftIcon={<IconShoppingCart />} variant="outline" fullWidth mt="md" radius="md">
                Add to cart
            </Button>
        </Card>
    );
}
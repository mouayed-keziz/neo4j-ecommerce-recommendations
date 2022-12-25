import { Card, Group, Text, Badge, Skeleton } from "@mantine/core";

export default function ProductCardSkeleton() {

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section p={15}>
                <Skeleton height={160} />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Skeleton height={20}>
                    <Text>product</Text>
                </Skeleton>
                <Skeleton width={"33%"} height={17}>
                    <Badge color="primary" variant="light">
                        20 000 DA
                    </Badge>
                </Skeleton>
            </Group>
            <Skeleton height={15} />
        </Card >
    );
}
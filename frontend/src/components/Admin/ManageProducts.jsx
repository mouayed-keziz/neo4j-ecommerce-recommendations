import { ActionIcon, Anchor, Avatar, Container, createStyles, Group, ScrollArea, Table } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import profuctImage from '../../assets/images/product-2.jpg'


const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
    },
    icon: {
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        },
    },
    headerTable: {
        zIndex: "10",
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
                }`,
        },
    },
    center: {
        textAlign: "center",
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

export default function ManageProducts() {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((product, _index) => (
        <tr key={_index}>
            <td className={classes.center}><Avatar src={profuctImage} size="lg" radius={"sm"} color={"primary"} /></td>
            <td>{product.NAME}</td>
            <td>{product.CPU}</td>
            <td>{product.RAM}</td>
            <td>{product.STORAGE}</td>
            <td>{product.COUNT_IN_STOCK}</td>
            <td>{product.PRICE}</td>
            <td><Anchor component={Link} to="product">See More</Anchor></td>
        </tr>
    ));

    return (
        <Container >
            <Group position="apart" className={classes.header}>
                <Group>
                    <ActionIcon className={classes.icon} radius="xl">
                        <IconChevronLeft size={24} />
                    </ActionIcon>
                    <h2>Manage Products</h2>
                </Group>
            </Group>
            <ScrollArea sx={{ height: "70vh" }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table verticalSpacing="xs" sx={{ minWidth: 700 }}>
                    <thead className={cx(classes.headerTable, { [classes.scrolled]: scrolled })}>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Cpu</th>
                            <th>Ram</th>
                            <th>Storage</th>
                            <th>Count</th>
                            <th>Price</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </Container >
    );
}






const data = [
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },
    {
        NAME: "Apple MacBook Air M2",
        CPU: "Apple M2",
        RAM: "16GB",
        STORAGE: "512GB",
        COUNT_IN_STOCK: 10,
        PRICE: "200 000DA",
    },



]


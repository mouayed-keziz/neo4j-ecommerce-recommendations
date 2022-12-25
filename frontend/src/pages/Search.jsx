import { Accordion, ActionIcon, Anchor, Breadcrumbs, Button, Center, Checkbox, Chip, Container, Divider, Grid, Group, Menu, Pagination, Text } from "@mantine/core";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons";
import ProductsGrid from "../components/ProductsGrid";


export default function SearchPage(props) {

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
        <Container size={"lg"}>
            <Breadcrumbs sx={(theme) => ({
                maxWidth: "100vw",
                overflow: "hidden",
                marginBottom: theme.spacing.xl * 2,
            })
            }>
                {items}
            </Breadcrumbs>
            <Grid>
                <Grid.Col span={12} sm={3}>
                    <Text size="xl">Filter : </Text>
                    <Accordion defaultValue="customization">
                        <Accordion.Item value="filter1">
                            <Accordion.Control>Filter 1</Accordion.Control>
                            <Accordion.Panel>
                                <Checkbox my={"sm"} label="checkbox 1" />
                                <Checkbox my={"sm"} label="checkbox 2" />
                                <Checkbox my={"sm"} label="checkbox 3" />
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="filter2">
                            <Accordion.Control>Filter 2</Accordion.Control>
                            <Accordion.Panel>
                                <Chip my={"sm"}>chip 1</Chip>
                                <Chip my={"sm"}>chip 2</Chip>
                                <Chip my={"sm"}>chip 3</Chip>
                                <Chip my={"sm"}>chip 4</Chip>

                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="filter3">
                            <Accordion.Control>Filter 3</Accordion.Control>
                            <Accordion.Panel>
                                With
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Grid.Col>
                <Grid.Col span={12} sm={9}>
                    <Group position="apart">
                        <Text size="xl">Nombre d'article : 22 </Text>
                        <Group position="right" spacing={3} >
                            <Menu>
                                <Menu.Target>
                                    <Button variant="subtle">Toggle menu</Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item >  Default  </Menu.Item>
                                    <Menu.Item >  Newest  </Menu.Item>
                                    <Menu.Item >  Price : max to min  </Menu.Item>
                                    <Menu.Item >  Price : min to max  </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                            <ActionIcon variant="subtle">
                                <IconLayoutGrid size={18} />
                            </ActionIcon>
                            <ActionIcon variant="subtle">
                                <IconLayoutList size={18} />
                            </ActionIcon>
                        </Group>
                    </Group>
                    {/*TODO : pagination md for pc and sm for mobile devices */}
                    <Divider my={"lg"} />
                    <ProductsGrid ProductsNumber={10} />
                    <Divider my={"lg"} />

                    <Center my={"sm"}><Pagination size="md" page={5} total={10} /></Center>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
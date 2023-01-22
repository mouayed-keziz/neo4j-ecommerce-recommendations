import { useContext, useState } from 'react';
import { Container, Avatar, UnstyledButton, Group, Text, Menu, Tabs, Burger, Drawer, Anchor, Button, Box, } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconLogout, IconHeart, IconStar, IconMessage, IconSettings, IconPlayerPause, IconTrash, IconSwitchHorizontal, IconChevronDown, IconLogin, IconShoppingCart, } from '@tabler/icons';
import SearchAutoComplete from './SearchAutoComplete';
import useStyles from './_style';
import DrawerContent from './DrawerContent';
import ThemeSwitcher from '../ThemeSwitcher';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logosvg from "../../assets/images/digital_easy_logo.svg"
import { AuthContext } from '../../context/AuthContext';

export default function NavBar() {

    const tabs = ["Section1", "Section2", "Section3", "Section4"];

    const { classes, theme, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const { currentUser, dispatch } = useContext(AuthContext);
    const isMobile = useMediaQuery('(max-width: 765px)');
    const navigate = useNavigate();
    const location = useLocation().pathname;
    if (location.startsWith("/account")) {
        return null;
    }

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection}>
                <Group position="apart">
                    <Group>
                        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                        <Anchor component={Link} to="/" className={classes.logo} size={28}>
                            <img width={"120px"} height={"100px"} src={logosvg} alt="logo" />
                        </Anchor>
                    </Group>

                    <SearchAutoComplete className={classes.searchBar} />

                    {!isMobile &&
                        <Group>
                            {currentUser ? (
                                <>
                                    <Button onClick={() => { dispatch({ type: "LOGOUT" }) }} variant="outline" color="red" iconRight={<IconLogout />}>Log out</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => { navigate("/authentication") }} variant="outline" color="blue" iconRight={<IconLogin />}>LOGIN</Button>
                                </>
                            )}
                            <Button onClick={() => navigate("/cart")} leftIcon={<IconShoppingCart />} >CART</Button>
                        </Group>
                    }



                    <ThemeSwitcher />
                    <Drawer
                        className={classes.drawer}
                        opened={opened}
                        onClose={toggle}
                        padding="xl"
                        size="md"
                    >
                        <DrawerContent toggledrawer={toggle} />
                    </Drawer>
                </Group>
            </Container >
            <Container>
                <Tabs defaultValue="Home" variant="outline" classNames={{ root: classes.tabs, tabsList: classes.tabsList, tab: classes.tab, }}>
                    <Tabs.List position="center">
                        {tabs.map((tab) => (
                            <Tabs.Tab value={tab} key={tab}>
                                {tab}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </Container>
        </div >
    );
}   
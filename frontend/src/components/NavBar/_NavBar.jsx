import { useState } from 'react';
import { Container, Avatar, UnstyledButton, Group, Text, Menu, Tabs, Burger, Drawer, Anchor, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconHeart, IconStar, IconMessage, IconSettings, IconPlayerPause, IconTrash, IconSwitchHorizontal, IconChevronDown, } from '@tabler/icons';
import SearchAutoComplete from './SearchAutoComplete';
import useStyles from './_style';
import DrawerContent from './DrawerContent';
import ThemeSwitcher from '../ThemeSwitcher';
import { Link, useLocation } from 'react-router-dom';
import logosvg from "../../assets/images/digital_easy_logo.svg"

export default function NavBar() {

    const user = { "name": "user_name", "image": "data:image/jpeg;base64,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" };
    const tabs = ["Section1", "Section2", "Section3", "Section4"];

    const { classes, theme, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

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

                    <Menu
                        width={260} position="bottom-end" transition="pop-top-right" onClose={() => setUserMenuOpened(false)} onOpen={() => setUserMenuOpened(true)}>
                        <Group m={0} p={0}>
                            <Menu.Target>
                                <UnstyledButton
                                    className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                                >
                                    <Group spacing={7}>
                                        <Avatar alt={user.name} radius="xl" color={"primary"} size={35} sx={theme => ({
                                            border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.gray[6] : theme.colors.dark[1]}`,
                                        })} >H</Avatar>
                                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                            {user.name}
                                        </Text>
                                        <IconChevronDown size={12} stroke={1.5} />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <ThemeSwitcher />
                        </Group>
                        <Menu.Dropdown>
                            <Menu.Item icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}>
                                Liked posts
                            </Menu.Item>
                            <Menu.Item icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
                                Saved posts
                            </Menu.Item>
                            <Menu.Item icon={<IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />}>
                                Your comments
                            </Menu.Item>

                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
                            <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                                Change account
                            </Menu.Item>
                            <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                                Pause subscription
                            </Menu.Item>
                            <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                                Delete account
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    <Drawer
                        className={classes.drawer}
                        opened={opened}
                        onClose={toggle}
                        padding="xl"
                        size="md"
                    >
                        <DrawerContent />
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
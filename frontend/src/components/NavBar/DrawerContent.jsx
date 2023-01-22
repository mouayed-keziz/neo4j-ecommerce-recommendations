import { Container, Group, Text, UnstyledButton, Divider, Stack, createStyles, Avatar, Button } from "@mantine/core";
import { IconHeart, IconMessage, IconStar, IconSettings, IconSwitchHorizontal, IconLogout, IconPlayerPause, IconTrash, IconChevronRight, IconLogin, IconShoppingCart } from '@tabler/icons';
import useStyles from "./_style";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DrawerContent(props) {

    const { classes, theme } = useStyles();
    const { currentUser, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Stack justify="space-between" className={classes.drawerStack}>
            <div>
                <Container className={classes.linksContainer} >
                    {currentUser ? (
                        <Button onClick={() => { dispatch({ type: "LOGOUT" }); props.toggledrawer() }} fullWidth variant="outline" color="red" size="lg" iconRight={<IconLogout />}>Log out</Button>
                    ) : (
                        <Button onClick={() => { navigate("/authentication"); props.toggledrawer() }} fullWidth variant="outline" color="blue" size="lg" iconRight={<IconLogin />}>LOGIN</Button>
                    )}
                    <Button onClick={() => navigate("/cart")} leftIcon={<IconShoppingCart />} >CART</Button>
                </Container>
            </div>
        </Stack>
    );
}




function DrawerItem({ text, icon, color }) {

    const { classes } = useStyles();

    return (
        <UnstyledButton className={classes.drawerItem}>
            <Group>
                {icon}
                <Text color={color} weight={500} size="sm" sx={{ lineHeight: 1 }} >
                    {text}
                </Text>
            </Group>
        </UnstyledButton>
    );
}












const useStylesUser = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));

export function UserButton({ image, name, email, icon, ...others }) {
    const { classes } = useStylesUser();

    return (
        <UnstyledButton className={classes.user} {...others}>
            <Group>
                <Avatar src={image} radius="lg" />

                <div style={{ flex: 1 }}>
                    <Text size="md" weight={500}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <IconChevronRight size={14} stroke={1.5} />}
            </Group>
        </UnstyledButton>
    );
}
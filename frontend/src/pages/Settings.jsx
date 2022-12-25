import { createStyles, Group, Container, Center } from '@mantine/core';
import { SettingsNav } from '../components/_index';
import { Outlet } from 'react-router-dom'

const useStyles = createStyles((theme, _params, getRef) => {
    return {
        container: {
            height: "100vh",
            width: "75%",
            [theme.fn.smallerThan("md")]: {
                width: "100%",
            },
        },
    };
});



export default function SettingsPage() {

    const { classes } = useStyles();

    return (
        <Group spacing={0} position='left' m={0} p={0}>
            <SettingsNav />
            <Container size={"xl"} className={classes.container} m={0} py={"xl"} px={0}>
                <Center>
                    <Outlet />
                </Center>
            </Container>
        </Group >
    );
}
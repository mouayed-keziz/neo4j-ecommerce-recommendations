import { Container, createStyles, Group, ScrollArea } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AdminNav } from "../components/_index";

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

export default function AdminPage() {

    const { classes } = useStyles();

    return (
        <Group spacing={0} position='left' m={0} p={0}>
            <AdminNav />
            <Container size={"xl"} className={classes.container} m={0} py={"xl"} px={0}>
                <ScrollArea style={{ height: "96vh" }}>
                    <Outlet />
                </ScrollArea>
            </Container>
        </Group >
    );
}
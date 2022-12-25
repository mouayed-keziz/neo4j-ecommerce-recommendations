import { ActionIcon, Container, createStyles, Divider, Grid, Group, Space } from "@mantine/core";
import GroupedState from "./GroupedState";
import RingProgressState from "./RingProgressState";
import { CChart } from "@coreui/react-chartjs"
import { IconChevronLeft } from "@tabler/icons";


const useStyles = createStyles((theme) => ({
    responsiveChart: {
        [theme.fn.smallerThan('sm')]: {
            width: "90vw",
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.xl,
        },
    },
    header: {
        paddingBottom: theme.spacing.md,
    },
    icon: {
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        },
    },
}));

export default function InfosAndCharts() {

    const { classes } = useStyles();

    return (
        <Container>
            <Group position="apart" className={classes.header}>
                <Group>
                    <ActionIcon className={classes.icon} radius="xl">
                        <IconChevronLeft size={24} />
                    </ActionIcon>
                    <h2>Info and Charts</h2>
                </Group>
            </Group>
            <GroupedState />
            <Divider my={"lg"} />
            <RingProgressState />
            <Divider my={"lg"} />
            <Grid>
                <Grid.Col sm={8} span={12}>
                    <CChart className={classes.responsiveChart}
                        type="line"
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June", "July"],
                            datasets: [
                                {
                                    label: "First dataset",
                                    backgroundColor: "#CFA3D8",
                                    borderColor: "#CFA3D8",
                                    pointBackgroundColor: "#CFA3D8",
                                    pointBorderColor: "#fff",
                                    data: [100, 250, 120, 39, 10, 40, 39, 80, 40]
                                },
                                {
                                    label: "Second dataset",
                                    backgroundColor: "#6741D9",
                                    borderColor: "#6741D9",
                                    pointBackgroundColor: "#6741D9",
                                    pointBorderColor: "#fff",
                                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                                },
                            ],
                        }}
                    />
                </Grid.Col>
                <Grid.Col sm={4} span={12}>
                    <CChart className={classes.responsiveChart}
                        type="doughnut"
                        data={{
                            labels: ['label 1', 'label 2', 'label 3', 'label 4'],
                            datasets: [
                                {
                                    backgroundColor: ['#A846AA', '#A063C6', '#6741D9', '#CFA3D8'],
                                    data: [40, 20, 180, 10],
                                },
                            ],
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Space h="xl" /><Space h="md" />
        </Container>
    );
}

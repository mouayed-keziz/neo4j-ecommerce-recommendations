import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export default function PageNotFound() {

    const { classes } = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>Lorem ipsum dolor sit amet.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores nihil modi, eius ipsa quia deserunt laborum cumque.
            </Text>
            <Group position="center">
                <Link to={'/'}>
                    <Button href='/' variant="subtle" size="md">
                        Go Back To Home Page
                    </Button >
                </Link>
            </Group>
        </Container>
    );
}
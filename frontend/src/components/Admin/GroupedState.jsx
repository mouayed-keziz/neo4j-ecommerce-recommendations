import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][7]
            } 100%)`,
        padding: theme.spacing.xl * 1.5,
        borderRadius: theme.radius.md,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },

    title: {
        color: theme.white,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: theme.fontSizes.sm,
    },

    count: {
        color: theme.white,
        fontSize: 32,
        lineHeight: 1,
        fontWeight: 700,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        fontSize: theme.fontSizes.sm,
        marginTop: 5,
    },

    stat: {
        flex: 1,

        '& + &': {
            paddingLeft: theme.spacing.xl,
            marginLeft: theme.spacing.xl,
            borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

            [theme.fn.smallerThan('sm')]: {
                paddingLeft: 0,
                marginLeft: 0,
                borderLeft: 0,
                paddingTop: theme.spacing.xl,
                marginTop: theme.spacing.xl,
                borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
            },
        },
    },
}));



const data = [
    {
        title: "Page views",
        stats: "456,133",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Illo."
    },
    {
        title: "New users",
        stats: "2,175",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Illo."
    },
    {
        title: "Completed orders",
        stats: "1,994",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Illo."
    }
];
export default function GroupedState() {
    const { classes } = useStyles();
    const stats = data.map((stat) => (
        <div key={stat.title} className={classes.stat}>
            <Text className={classes.count}>{stat.stats}</Text>
            <Text className={classes.title}>{stat.title}</Text>
            <Text className={classes.description}>{stat.description}</Text>
        </div>
    ));
    return <div className={classes.root}>{stats}</div>;
}
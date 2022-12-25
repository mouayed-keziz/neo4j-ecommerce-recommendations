import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,
        marginBottom: 20,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    logo: {
        cursor: 'pointer',
    },

    searchBar: {
        flex: 1,
        margin: "auto 5rem ",
        [theme.fn.smallerThan('sm')]: {
            margin: "0"
        },

    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    drawer: {
        margin: "0",
        padding: "0",
        height: "100vh",
        overflow: "auto",
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    drawerStack: {
        margin: "0",
        padding: "0",
    },

    linksContainer: {
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },

    drawerItem: {
        padding: "0.3rem 0.1rem",
        borderRadius: theme.radius.md,
        ":hover": {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
        }
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    tabsList: {
        borderBottom: '0 !important',

    },

    tab: {
        fontWeight: 500,
        height: 38,
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },

        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
    },
}));



export default useStyles;
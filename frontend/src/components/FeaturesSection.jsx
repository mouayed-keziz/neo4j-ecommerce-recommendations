import { ThemeIcon, Text, Title, Container, SimpleGrid, useMantineTheme, createStyles, } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage, IconMessage2, IconLock } from '@tabler/icons';

export const MOCKDATA = [
    {
        icon: IconGauge,
        title: 'Neo4j :',
        description:
            `Est un système de gestion de base de données graphique open source qui permet de stocker, gérer et interroger des données sous forme de graphes.`,
    },
    {
        icon: IconUser,
        title: 'Express :',
        description: `Est un framework Node.js pour la création d'applications web et API. Il fournit une interface pour gérer les routes et les requêtes HTTP, facilite la gestion des sessions et des cookies, et permet l'intégration de middlewares pour ajouter des fonctionnalités supplémentaires.`,
    },
    {
        icon: IconCookie,
        title: 'React :',
        description: `Est une bibliothèque JavaScript open source pour la création d'interfaces utilisateur. Il permet de construire des applications web en utilisant des composants réutilisables et offre des fonctionnalités telles que la gestion de l'état et la mise à jour en temps réel de l'interface utilisateur.`,
    },
    {
        icon: IconLock,
        title: 'Node.js :',
        description: `Est un environnement d'exécution JavaScript open source qui permet de créer des applications côté serveur en utilisant JavaScript. Il permet d'utiliser des bibliothèques JavaScript pour l'accès aux fichiers, la gestion des bases de données et la communication réseau.`,
    },
    {
        icon: IconMessage2,
        title: 'Emotion :',
        description: `Est une bibliothèque JavaScript pour la gestion des styles CSS dans les applications React. Il permet de définir des styles en utilisant des composants JSX et de les gérer de manière dynamique en fonction de l'état de l'application.`,
    },
    {
        icon: IconMessage,
        title: 'Axios :',
        description: `Est une bibliothèque JavaScript pour les requêtes HTTP. Il permet de gérer les requêtes et les réponses de manière asynchrone et de gérer les erreurs. Il peut être utilisé pour les communications avec des API REST.`,
    },
];



export function Feature({ icon: Icon, title, description }) {
    const theme = useMantineTheme();
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon size={20} stroke={1.5} />
            </ThemeIcon>
            <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
            <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                {description}
            </Text>
        </div>
    );
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        marginBottom: theme.spacing.md,
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            fontSize: 28,
            textAlign: 'left',
        },
    },

    description: {
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            textAlign: 'left',
        },
    },
}));



export default function FeaturesSection({ title, description, data = MOCKDATA }) {

    const { classes, theme } = useStyles();
    const features = data.map((feature, index) => <Feature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
            <Title className={classes.title}>{title}</Title>

            <Container size={560} p={0}>
                <Text size="sm" className={classes.description}>
                    {description}
                </Text>
            </Container>

            <SimpleGrid
                mt={60}
                cols={3}
                spacing={theme.spacing.xl * 2}
                breakpoints={[
                    { maxWidth: 980, cols: 2, spacing: 'xl' },
                    { maxWidth: 755, cols: 1, spacing: 'xl' },
                ]}
            >
                {features}
            </SimpleGrid>
        </Container>
    );
}
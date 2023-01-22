import { Image, Container, Title, Button, Group, Text, } from '@mantine/core';
import image from '../../assets/images/heroheader_laptop.png';
import useStyles from './_style';

export default function HeroHeader() {

    const { classes } = useStyles();

    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            <span className={classes.highlight}>Digital-easy</span><br />Ecommerce Website
                        </Title>
                        <Text color="dimmed" mt="md">
                            Découvrez notre site e-commerce exclusif de vente de produits informatiques, utilisant une base de données neo4j avancée pour générer des recommandations personnalisées pour chaque client
                        </Text>

                        <Group mt={30}>
                            <Button radius="xl" size="md" className={classes.control}>
                                REACT
                            </Button>
                            <Button variant="light" radius="xl" size="md" className={classes.control}>
                                NODE JS
                            </Button>
                            <Button variant="outline" radius="xl" size="md" className={classes.control}>
                                NEO4J
                            </Button>
                        </Group>
                    </div>
                    <Image src={image} className={classes.image} />
                </div>
            </Container>
        </div>
    );
}
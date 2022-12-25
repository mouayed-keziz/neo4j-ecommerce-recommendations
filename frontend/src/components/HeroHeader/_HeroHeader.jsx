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
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur dolor ratione aliquid laudantium, quam harum reiciendis magni,
                            repellendus eaque voluptatum quas similique ullam atque labore eius veritatis dolorum cupiditate eum.
                        </Text>

                        <Group mt={30}>
                            <Button radius="xl" size="md" className={classes.control}>
                                Lorem
                            </Button>
                            <Button variant="light" radius="xl" size="md" className={classes.control}>
                                ipsum
                            </Button>
                            <Button variant="outline" radius="xl" size="md" className={classes.control}>
                                dolor
                            </Button>
                        </Group>
                    </div>
                    <Image src={image} className={classes.image} />
                </div>
            </Container>
        </div>
    );
}
import { Text, Container, ActionIcon, Group, Anchor } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import footerLinks from './FooterInfo';
import useStyles from './_style';
import logosvg from "../../assets/images/digital_easy_logo.svg"

export default function Footer() {

    const { classes } = useStyles();

    const groups = footerLinks.map((group) => {
        const links = group.links.map((link, index) => (
            <Text key={index} className={classes.link} component="a" href={link.link} onClick={(event) => event.preventDefault()} >
                {link.label}
            </Text >
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Anchor component={"a"} href="/" className={classes.logo} size={28}>
                        <img width={"100px"} height={"100px"} src={logosvg} alt="logo" />
                    </Anchor>
                    <Text size="xs" color="dimmed" className={classes.description}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © 2022 digital-easy. All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
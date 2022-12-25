import { Accordion, createStyles, Skeleton, Box } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,

    },
}));

const description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis nisi incidunt exercitationem doloremque qui iure nobis eligendi reiciendis similique possimus ipsum error ad commodi voluptatem dolores rerum, laudantium iusto!";

export default function ProductCollapse({ isSkeleton }) {

    const { classes } = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Accordion>
                <Accordion.Item className={classes.item} value="reset-password">
                    <Accordion.Control>
                        {isSkeleton ? <Skeleton height={20} width={"45%"} /> : "Description"}
                    </Accordion.Control>
                    <Accordion.Panel>
                        {isSkeleton ? <><Skeleton height={13} width={"100%"} mb={10} /><Skeleton height={13} width={"45%"} /></> : description}
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="another-account">
                    <Accordion.Control>
                        {isSkeleton ? <Skeleton height={20} width={"25%"} /> : "Reviews (0)"}
                    </Accordion.Control>
                    <Accordion.Panel>
                        {isSkeleton ? <><Skeleton height={13} width={"100%"} mb={10} /><Skeleton height={13} width={"45%"} /></> : description}
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="newsletter">
                    <Accordion.Control>
                        {isSkeleton ? <Skeleton height={20} width={"35%"} /> : "Seller Info"}
                    </Accordion.Control>
                    <Accordion.Panel>
                        {isSkeleton ? <><Skeleton height={13} width={"100%"} mb={10} /><Skeleton height={13} width={"45%"} /></> : description}
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

        </Box>
    );
}

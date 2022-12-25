import { ActionIcon, Box, Button, createStyles, Grid, Group, NativeSelect, Text, TextInput } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { useState } from "react";


const useStyles = createStyles((theme) => {
    return {
        viewElement: {
            width: "50%",
            [theme.fn.smallerThan("md")]: {
                width: "85%",
            },
        },
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
        },
        icon: {
            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            },
        },

        shippingSettings: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            borderRadius: theme.radius.md,
        },

        label: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            fontSize: theme.fontSizes.xs,
            fontWeight: 400,
        },
        data: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,
        },
    };
});

export default function ShippingInfoSettings(props) {

    const [firstName, setFirstName] = useState("mouayed");
    const [lastName, setLastName] = useState("keziz");
    const [wilaya, setWilaya] = useState("khenchela");
    const [zipCode, setZipCode] = useState("40000");
    const [shippingAddress, setShippingAddress] = useState("homeless");

    const { classes } = useStyles();

    return (
        <Box className={classes.viewElement}>
            <Group position="apart" className={classes.header}>
                <Group>
                    <ActionIcon className={classes.icon} radius="xl">
                        <IconChevronLeft size={24} />
                    </ActionIcon>

                    <h2>Change Shipping Informations</h2>
                </Group>
            </Group>
            <Box className={classes.shippingSettings}>
                <Box mb="xl" mt="sm">
                    <Grid>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">First Name</Text>
                            <TextInput onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        </Grid.Col>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">Last Name</Text>
                            <TextInput onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        </Grid.Col>
                    </Grid>
                    <Grid mb={"xs"}>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">Wilaya</Text>
                            <NativeSelect
                                value={wilaya}
                                onChange={(e) => setWilaya(e.target.value)}
                                data={WILAYAS_OF_ALGERIA}
                                placeholder="Pick one"
                            />
                        </Grid.Col>
                        <Grid.Col span={12} xs={6}>
                            <Text className={classes.label} size="xs">Zip Code</Text>
                            <TextInput onChange={(e) => setZipCode(e.target.value)} value={zipCode} />
                        </Grid.Col>
                    </Grid>
                    <Text className={classes.label} size="xs">Shipping Address</Text>
                    <TextInput onChange={(e) => setShippingAddress(e.target.value)} value={shippingAddress} />
                    <Group position="right" mt={"xl"} >
                        <Button variant="outline">cancel</Button>
                        <Button>apply</Button>
                    </Group>
                </Box>
            </Box>
        </Box>
    );
}




const WILAYAS_OF_ALGERIA = [
    "01-Adrar",
    "02-Chlef",
    "03-Laghouat",
    "04-Oum-El-Bouaghi",
    "05-Batna",
    "06-Béjaïa",
    "07-Biskra",
    "08-Béchar",
    "09-Blida",
    "10-Bouira",
    "11-Tamanrasset",
    "12-Tébessa",
    "13-Tlemcen",
    "14-Tiaret",
    "15-Tizi-Ouzou",
    "16-Alger",
    "17-Djelfa",
    "18-Jijel",
    "19-Sétif",
    "20-Saïda",
    "21-Skikda",
    "22-Sidi Bel Abbès",
    "23-Annaba",
    "24-Guelma",
    "25-Constantine",
    "26-Médéa",
    "27-Mostaganem",
    "28-M’sila",
    "29-Mascara",
    "30-Ouargla",
    "31-Oran	Said ",
    "32-El Bayadh",
    "33-Illizi",
    "34-Bordj Bou Arreridj",
    "35-Boumerdès",
    "36-El-Tarf",
    "37-Tindouf",
    "38-Tissemsilt",
    "39-El-Oued",
    "40-Khenchela",
    "41-Souk-Ahras",
    "42-Tipaza",
    "43-Mila",
    "44-Aïn-Defla",
    "45-Naâma",
    "46-Aïn-Témouchent",
    "47-Ghardaïa",
    "48-Relizane",
    "49-El M-Ghair",
    "50-El Meniaa",
    "51-Ouled Djellal",
    "52-Bordj Badji Mokhtar",
    "53-Béni Abbès",
    "54-Timimoun",
    "55-Touggourt",
    "56-Djanet",
    "57-In Salah",
    "58-In Guezz",
];
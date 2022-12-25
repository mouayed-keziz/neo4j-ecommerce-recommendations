import { ActionIcon, Avatar, Badge, Box, createStyles, Divider, Group, Indicator, InputBase, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { IconCheck, IconChevronLeft, IconDots, IconEdit } from "@tabler/icons";
import { useState } from "react";
import InputMask from 'react-input-mask';

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

        profileSettings: {
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

export default function ProfileInfoSettings() {

    const [displayName, setDisplayName] = useState("Hamoute9");
    const [email] = useState("email@email.com");
    const [phone, setPhone] = useState("07 99 99 99 99");
    const [displayNameEdit, setDisplayNameEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [phoneEdit, setPhoneEdit] = useState(false);

    const { classes } = useStyles();

    return (
        <Box className={classes.viewElement}>
            <Group position="apart" className={classes.header}>
                <Group>
                    <ActionIcon className={classes.icon} radius="xl">
                        <IconChevronLeft size={24} />
                    </ActionIcon>

                    <h2>My account</h2>
                </Group>
                <ActionIcon radius={"xl"}>
                    <IconDots size={24} />
                </ActionIcon>
            </Group>

            <Group position="left" className={classes.header}>
                <Indicator mr={"md"} color={"white"} label={<IconEdit color="black" size={15} />} dot inline size={18} offset={10} position="top-end" >
                    <Avatar color={"primay"} size="xl" radius="100%"
                        sx={theme => ({
                            border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]}`,
                        })}
                    >H</Avatar>
                </Indicator>
                <Stack>
                    <Text >{displayName}</Text>
                    <Badge >PRO</Badge>
                </Stack>
            </Group>

            <Box className={classes.profileSettings}>
                <Box mb="sm" mt="sm">
                    <Text className={classes.label} size="xs">Display Name</Text>
                    <Group position="apart">
                        {displayNameEdit ? (
                            <TextInput value={displayName} placeholder="displayName" onChange={(e) => setDisplayName(e.target.value)} />
                        ) : (
                            <Text className={classes.data} color={"white"}>{displayName}</Text>
                        )}
                        <Tooltip label="edit">
                            <ActionIcon radius={"xl"} onClick={() => setDisplayNameEdit(!displayNameEdit)}>
                                {displayNameEdit ? (
                                    <IconCheck size={24} />
                                ) : (
                                    <IconEdit size={24} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Box>
                <Divider />
                <Box mb="sm" mt="sm">
                    <Text className={classes.label} size="xs">Email</Text>
                    <Group position="apart">
                        <Text className={classes.data} color={"white"}>{email}</Text>
                        <Tooltip label="edit">
                            <ActionIcon disabled radius={"xl"} onClick={() => setEmailEdit(!emailEdit)}>
                                <IconEdit size={24} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Box>
                <Divider />
                <Box mb="sm" mt="sm">
                    <Text className={classes.label} size="xs">Phone</Text>
                    <Group position="apart">
                        {phoneEdit ? (
                            <InputBase
                                placeholder="Your phone"
                                component={InputMask}
                                mask="07 99 99 99 99"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        ) : (
                            <Text className={classes.data} color={"white"}>{phone}</Text>
                        )}
                        <Tooltip label="edit">
                            <ActionIcon radius={"xl"} onClick={() => setPhoneEdit(!phoneEdit)}>
                                {phoneEdit ? (
                                    <IconCheck size={24} />
                                ) : (
                                    <IconEdit size={24} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Box>
            </Box>
        </Box >
    );
}
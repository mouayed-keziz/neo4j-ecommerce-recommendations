import { ActionIcon, Box, Button, createStyles, Group, PasswordInput } from "@mantine/core";
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

        passwordSettings: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            borderRadius: theme.radius.md,
        },
    };
});

export default function PasswordInfoSettings() {

    const [oldPassword, setOldPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

    const { classes } = useStyles();

    const changePasswordHandeler = () => {
        if (newPassword !== confirmNewPassword) { setConfirmNewPasswordError("confirmed password not matching the new password") } else setConfirmNewPasswordError("");
        if (oldPassword === "") { setOldPasswordError("enter your old password") } else setOldPasswordError("");
        if (newPassword === "") { setNewPasswordError("enter your new password") } else setNewPasswordError("");
        if (confirmNewPassword === "") { setConfirmNewPasswordError("you should confirm your new password") } else setConfirmNewPasswordError("");
        if (newPassword !== confirmNewPassword) { setConfirmNewPasswordError("confirmed password not matching the new password") } else setConfirmNewPasswordError("");
        // here you can add your condition (if the password is actually true (use backend hh))
        // change password
    }

    return (
        <Box className={classes.viewElement}>
            <Group position="apart" className={classes.header}>
                <Group>
                    <ActionIcon className={classes.icon} radius="xl">
                        <IconChevronLeft size={24} />
                    </ActionIcon>

                    <h2>Change Password</h2>
                </Group>
            </Group>
            <Box className={classes.passwordSettings}>
                <Box mb="sm" mt="sm">
                    <PasswordInput my={"md"} value={oldPassword} error={oldPasswordError} onChange={(e) => { setOldPassword(e.target.value) }} placeholder="Old Password" />
                    <PasswordInput my={"md"} value={newPassword} error={newPasswordError} onChange={(e) => { setNewPassword(e.target.value) }} placeholder="New Password" />
                    <PasswordInput my={"md"} value={confirmNewPassword} error={confirmNewPasswordError} onChange={(e) => { setConfirmNewPassword(e.target.value) }} placeholder="Confirm New Password" />

                    <Group position="right" mt={"xl"} >
                        <Button variant="outline">cancel</Button>
                        <Button onClick={changePasswordHandeler}>apply</Button>
                    </Group>
                </Box>
            </Box>
        </Box>
    );
}
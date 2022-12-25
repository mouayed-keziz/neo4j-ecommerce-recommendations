import { ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

export default function ThemeSwitcher() {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    const toggleColorSchemeHandeler = () => {
        const theme = JSON.parse(localStorage.getItem("theme"));
        if (theme === "dark") {
            localStorage.setItem("theme", JSON.stringify("light"));
        } else {
            localStorage.setItem("theme", JSON.stringify("dark"));
        }
        toggleColorScheme();
    }

    return (
        <ThemeIcon
            variant="outline"
            color={"primary"}
            onClick={() => toggleColorSchemeHandeler()}
            title="Toggle color scheme"
            style={{ cursor: "pointer" }}
        >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ThemeIcon>
    );
}
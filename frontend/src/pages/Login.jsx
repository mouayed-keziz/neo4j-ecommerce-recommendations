import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Paper, Group, Button, Divider, Checkbox, Anchor, Stack, Container, } from '@mantine/core';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage = (props) => {

    const { currentUser, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [type, toggle] = useToggle(['login', 'register']);
    const [errorLoginOrRegister, setErrorLoginOrRegister] = useState(null);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
            name: (val) => type === "register" ? (val.length > 0 ? null : "Name is required") : null,
        },
    });


    const submitHandeler = async (form) => {
        console.log("submit handeler")
        console.log(form);
        if (type === "login") {
            console.log("login in progress");
            axios.post("http://localhost:5000/users/login", { email: form.email, password: form.password }).then((res) => {
                console.log("login successfull");
                dispatch({ type: "LOGIN", payload: res.data });
                navigate("/");
            }).catch((err) => {
                console.log(err)
                console.log("login error");
                if (err.response) {
                    setErrorLoginOrRegister(err.response.data.message);
                } else {
                    setErrorLoginOrRegister("backend is not responding");
                }
            }
            )
        }
        if (type === "register") {
            axios.post("http://localhost:5000/users/register", { email: form.email, password: form.password }).then((res) => {
                dispatch({ type: "LOGIN", payload: res.data });
                navigate("/");
            }).catch((err) => {
                if (err.response) {
                    setErrorLoginOrRegister(err.response.data.message);
                } else {
                    setErrorLoginOrRegister("backend is not responding");
                }
            }
            )
        }
    }


    return (
        <Container size={500} mt={70} mb={100}>
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" weight={500}>
                    {type.toLocaleUpperCase()}
                </Text>

                <Divider label={type === "login" ? "login with your email and password" : "register with youremail and password"} labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit((form) => submitHandeler(form))}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput {...form.getInputProps('name')}
                                label="Name"
                                placeholder="Your name"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            {...form.getInputProps('password')}
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit">{upperFirst(type)}</Button>
                    </Group>
                </form>
                <Text align='center'>{errorLoginOrRegister}</Text>
            </Paper>
        </Container>
    );
}


export default LoginPage;

// Path: src\pages\Login.jsx
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Paper, Group, Button, Divider, Checkbox, Anchor, Stack, Container, } from '@mantine/core';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore"

const LoginPage = (props) => {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
            name: (val) => type === "register" ? (val.length > 0 ? null : "Name is required") : null,
            terms: (val) => val ? null : "You must accept the terms and conditions",
        },
    });


    const submitHandeler = async (form) => {
        if (type === "login") {
            console.log("login");
            signInWithEmailAndPassword(auth, form.email, form.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    getDoc(doc(db, "users", user.uid)).then((docSnap) => {
                        if (docSnap.exists()) {
                            user.displayName = docSnap.data().displayName;
                            user.photoURL = docSnap.data().photoURL;
                            dispatch({ type: "LOGIN", payload: user });
                            navigate("/");
                        } else {
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                }).catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        }
        if (type === "register") {
            console.log("register" + form.email + form.password)
            createUserWithEmailAndPassword(auth, form.email, form.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setDoc(doc(db, "users", user.uid), {
                        displayName: form.name,
                        uid: user.uid,
                        email: user.email,
                        photoURL: user.photoURL,
                    });
                    user.displayName = form.name;
                    console.log(user);
                    dispatch({ type: "LOGIN", payload: user });
                    navigate("/");
                }).catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage)
                });
        }
    }

    const GoogleHandeler = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)  // signInWithRedirect(provider)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                });
                dispatch({ type: "LOGIN", payload: user });
                navigate("/");
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            }
            );
    }

    return (
        <Container size={500} mt={70} mb={100}>
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" weight={500}>
                    {type.toLocaleUpperCase()}
                </Text>

                <Group grow mb="md" mt="md">
                    <Button variant="outline" leftIcon={<IconBrandGoogle />} onClick={GoogleHandeler} radius="xl">Google</Button>
                    <Button variant="outline" leftIcon={<IconBrandFacebook />} radius="xl">Facebook</Button>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit((form) => submitHandeler(form))}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
            </Paper>
        </Container>
    );
}


export default LoginPage;

// Path: src\pages\Login.jsx
import {
    Text,
    Box,
    Flex,
    Button,
    TextInput,
    PasswordInput,
    Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import ArrowRightIcon from "@my-images/Arrow_Right_SM.svg";
import React from "react";
import { useMutation } from "react-query";
import { accountRegister } from "@/lib/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useStore from "@/lib/store";

export default function Register() {
    const store = useStore();

    const registerForm = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    value,
                )
                    ? null
                    : "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        },
    });

    const registerMutation = useMutation({
        mutationFn: accountRegister,
        onMutate: () => {
            store.setRequestLoading(true);
        },
        onSuccess: (data) => {
            reset();
            toast.success(data?.message);
        },
        onError: (e) => {
            store.setRequestLoading(false);
            if (e instanceof AxiosError) {
                toast.error(e?.response?.data?.message, {
                    position: "top-right",
                });
            }
        },
    });

    function reset() {
        registerForm.reset();
    }
    type registerFormType = {
        email: string;
        password: string;
    };

    const onSubmitHandler = (values: registerFormType) => {
        const register = {
            register: {
                email: values.email,
                password: values.password,
            },
        };
        registerMutation.mutate(register);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Paper
                shadow="xl"
                radius="md"
                p="lg"
                withBorder
                className="min-w-[48rem] group rounded-lg shadow-lg bg-white space-y-6 border-gray-200 dark:border-gray-700 "
            >
                <section>
                    <Text className="text-black-bold text-center font-bold text-3xl">
                        Register
                    </Text>
                    <Box className="text-center " mt="xs">
                        <Text>
                            Welcome to our
                            <Link href="/" className="text-blue-light">
                                &nbsp;Manito&nbsp;
                            </Link>
                            website.
                            <br /> Please fill in the form below to register.
                        </Text>
                    </Box>
                    <Flex
                        className="md:space-x-4"
                        direction={{ base: "column", md: "row" }}
                        justify={{ base: "start", md: "space-around" }}
                        gap="md"
                        align={{ base: "center", md: "center" }}
                    >
                        <form
                            className="h-auto min-w-[20rem]"
                            onSubmit={registerForm.onSubmit((values) => {
                                onSubmitHandler(values);
                            })}
                        >
                            <div className="space-y-2  mt-2">
                                <label htmlFor="email">Email: </label>
                                <TextInput
                                    id="email"
                                    placeholder="m@example.com"
                                    required
                                    type="email"
                                    withAsterisk
                                    {...registerForm.getInputProps("email")}
                                />
                            </div>
                            <div className="space-y-2 mt-2">
                                <label htmlFor="password">Password: </label>
                                <PasswordInput
                                    placeholder="m123456"
                                    required
                                    type="password"
                                    withAsterisk
                                    {...registerForm.getInputProps("password")}
                                />
                            </div>

                            <div className="space-y-2 mt-4 w-full">
                                <Button type="submit" className="w-full">
                                    Sign Up
                                </Button>
                            </div>

                            <div className="mt-3 text-left hover:translate-x-3">
                                <Link
                                    href="/auth/login"
                                    className="text-blue-light flex flex-row items-center"
                                >
                                    Go to Sign In
                                    <ArrowRightIcon className="ml-1 text-blue-light" />
                                </Link>
                            </div>
                        </form>
                    </Flex>
                </section>
            </Paper>
        </div>
    );
}

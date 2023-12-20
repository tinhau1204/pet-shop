import { accountLogin, googleLogin } from "@/lib/api";
import useCookie from "@/lib/hooks/useCookie/useCookie";
import useStore from "@/lib/store";
import {
    Text,
    Box,
    Flex,
    Button,
    PasswordInput,
    TextInput,
    Stack,
    Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
const Cookies = require("js-cookie");
import { API } from "@/lib/config/env";

export default function Login() {
    const router = useRouter();
    const store = useStore();
    const loginForm = useForm({
        initialValues: {
            email: "",
            password: "",
            //   termsOfService: false,
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) =>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    value,
                ) || "admin"
                    ? null
                    : "Minimum eight characters, at least one uppercase letter,\n one lowercase letter, one number and one special character",
        },
    });

    function reset() {
        loginForm.reset();
    }

    // const googleLoginQuery = useMutation({
    //     mutationKey: "login",
    //     mutationFn: googleLogin,
    //     onSuccess: (data) => {
    //         reset();
    //         toast.success(data?.message, {
    //             position: "bottom-right",
    //         });
    //         Cookies.set("accessToken", data?.data?.tokens?.accessToken);
    //         Cookies.set("refreshToken", data?.data?.tokens?.refreshToken);
    //         Cookies.set("user", data?.data?.user.id, {
    //             expires: Date.now() + 30 * 60 * 1000,
    //         });
    //         store.setAuthUser(data?.data?.user);
    //         //add toast
    //         router.push("/");
    //     },
    //     onError: (e) => {
    //         if (e instanceof AxiosError) {
    //             console.log("error", e);
    //             toast.error(e?.response?.data?.message, {
    //                 position: "bottom-right",
    //             });
    //         }
    //     },
    // });

    const onSubmitGoogleHandler = () => {
        router.push(`${API}/auth/signin/google`);
    };

    const loginMutation = useMutation({
        mutationKey: "login",
        mutationFn: accountLogin,
        onSuccess: (data) => {
            reset();
            toast.success(data?.message, {
                position: "bottom-right",
            });
            Cookies.set("accessToken", data?.data?.tokens?.accessToken);
            Cookies.set("refreshToken", data?.data?.tokens?.refreshToken);
            Cookies.set("user", data?.data?.user.id, {
                expires: Date.now() + 30 * 60 * 1000,
            });
            store.setAuthUser(data?.data?.user);
            //add toast
            router.push("/");
        },
        onError: (e) => {
            if (e instanceof AxiosError) {
                console.error("error", e);
                toast.error(e?.response?.data?.message, {
                    position: "bottom-right",
                });
                //add toast
            }
        },
    });

    type loginFormType = {
        email: string;
        password: string;
    };

    const onSubmitHandler = (values: loginFormType) => {
        const login = {
            login: {
                email: values.email,
                password: values.password,
            },
        };
        loginMutation.mutate(login);
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
                <section className="h-full w-full">
                    <Text className="text-black-bold text-center font-bold text-3xl">
                        Login
                    </Text>
                    <Box className="text-center" mt="xs">
                        <Text>
                            By logging in, you accept our
                            <Link href="#" className="text-blue-light">
                                &nbsp;terms&nbsp;
                            </Link>
                            and
                            <Link href="#" className="text-blue-light">
                                &nbsp;privacy policy
                            </Link>
                            .
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
                            onSubmit={loginForm.onSubmit((values) =>
                                onSubmitHandler(values),
                            )}
                            className="h-auto min-w-[20rem]"
                        >
                            <div className="space-y-2  mt-2">
                                <label htmlFor="email">Email: </label>
                                <TextInput
                                    id="email"
                                    placeholder="m@example.com"
                                    required
                                    type="email"
                                    withAsterisk
                                    {...loginForm.getInputProps("email")}
                                />
                            </div>
                            <div className="space-y-2 mt-2">
                                <label htmlFor="password">Password: </label>
                                <PasswordInput
                                    placeholder="m123456"
                                    required
                                    type="password"
                                    withAsterisk
                                    {...loginForm.getInputProps("password")}
                                />
                            </div>
                            <div className="w-full mt-2 text-end">
                                <Link
                                    href="#forgotpassword"
                                    className="text-blue-light text-sm italic"
                                >
                                    forgot password?
                                </Link>
                            </div>
                            <div className="space-y-2 mt-4 w-full">
                                <Button type="submit" className="w-full">
                                    Sign In
                                </Button>
                            </div>

                            <div className="mt-2 text-left hover:underline">
                                <Link
                                    href="/auth/register"
                                    className="text-blue-light"
                                >
                                    Do not have an account?
                                </Link>
                            </div>
                        </form>
                        <div className="flex flex-row gap-3 max-w-xs w-full h-full items-center justify-center md:rotate-90">
                            <hr className="flex-grow border-t border-black-light" />
                            <span className="text-black-light text-sm">OR</span>
                            <hr className="flex-grow border-black-light border-t" />
                        </div>

                        <Stack>
                            <Button
                                className="w-full text-white "
                                variant="outline"
                                onClick={onSubmitGoogleHandler}
                            >
                                <div className="flex items-center justify-center">
                                    <svg
                                        className=" w-5 h-5 mr-2"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="4" />
                                        <line
                                            x1="21.17"
                                            x2="12"
                                            y1="8"
                                            y2="8"
                                        />
                                        <line
                                            x1="3.95"
                                            x2="8.54"
                                            y1="6.06"
                                            y2="14"
                                        />
                                        <line
                                            x1="10.88"
                                            x2="15.46"
                                            y1="21.94"
                                            y2="14"
                                        />
                                    </svg>
                                    Continue with Google
                                </div>
                            </Button>
                            <Button
                                className="w-full  hover:bg-blue-light/75"
                                variant="filled"
                                disabled
                            >
                                <div className="flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M16 4C9.384 4 4 9.384 4 16s5.384 12 12 12s12-5.384 12-12S22.616 4 16 4zm0 2c5.535 0 10 4.465 10 10a9.977 9.977 0 0 1-8.512 9.879v-6.963h2.848l.447-2.893h-3.295v-1.58c0-1.2.395-2.267 1.518-2.267h1.805V9.652c-.317-.043-.988-.136-2.256-.136c-2.648 0-4.2 1.398-4.2 4.584v1.923h-2.722v2.893h2.722v6.938A9.975 9.975 0 0 1 6 16c0-5.535 4.465-10 10-10z"
                                        />
                                    </svg>
                                    Continue with Facebook
                                </div>
                            </Button>
                        </Stack>
                    </Flex>
                </section>
            </Paper>
        </div>
    );
}

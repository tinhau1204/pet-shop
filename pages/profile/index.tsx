import {
    Avatar,
    Flex,
    Grid,
    Paper,
    Text,
    TextInput,
    BackgroundImage,
    Button,
    Radio,
    Skeleton,
} from "@mantine/core";
import React from "react";
import EditIcon from "@my-images/icon/Edit_Pencil_Line_01.svg";
import SaveIcon from "@my-images/Cloud_Check.svg";
import BackGround from "@my-images/background.png";
import { useForm } from "@mantine/form";
import useStore from "@/lib/store";
import { useMutation, useQuery } from "react-query";
import { getUserById, updateUserById } from "@/lib/api";
import { IUser } from "@/lib/api/types";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

export default function Profile() {
    const store = useStore();
    const router = useRouter();
    const cookieUser = Cookies.get("user");
    const user = store.authUser;

    const form = useForm({
        initialValues: {
            name: user?.name,
            gender: user?.gender || "male",
            email: user?.email,
            phone: user?.phone,
            address: user?.address || "",
        },
    });

    const getUserQuery = useQuery({
        queryKey: ["getUserById", user?.id],
        queryFn: () => getUserById(parseInt(cookieUser)),
        onSuccess: (data: IUser) => {
            store.setAuthUser(data);
            form.setValues({
                name: data.name,
                gender: data.gender || "male",
                email: data.email,
                phone: data.phone,
                address: data.address || "",
            });
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
            router.push("/");
        },
    });

    const updateUserQuery = useMutation({
        mutationKey: ["updateUserById"],
        mutationFn: (variables: any) => {
            return updateUserById(variables?.id, variables?.update);
        },
        onSuccess: (data) => {
            const { message, data: _data } = data;
            toast.success(message);
            console.log("data :>> ", _data);
            store.setAuthUser(_data);
            form.setValues({
                name: _data?.name || "",
                gender: _data?.gender || "male",
                email: _data?.email || "",
                phone: _data?.phone || "",
                address: _data?.address || "",
            });
        },
        onError: (err) => {
            toast.error("Something went wrong");
        },
    });

    return (
        <Paper className="overflow-auto w-full" withBorder radius="md">
            <Flex direction={{ base: "column", md: "row" }}>
                <BackgroundImage src={BackGround.src}>
                    <div className="relative border-b border-black-light/20 flex flex-col justify-center items-center w-full h-full gap-3">
                        {user ? (
                            <Flex
                                direction={"column"}
                                gap={"20px"}
                                align={"center"}
                                className="mx-auto my-auto"
                            >
                                <Avatar
                                    size="xl"
                                    src={user?.avatar_url}
                                    className="bg-primary"
                                />
                                <Text fw={"bold"} className="tracking-wider">
                                    {user?.name}
                                </Text>
                            </Flex>
                        ) : (
                            <Skeleton
                                height={"122px"}
                                width={"200px"}
                                animate={false}
                            />
                        )}
                    </div>
                </BackgroundImage>
                <Flex
                    direction="column"
                    justify={{ base: "center", md: "center" }}
                    align={{ base: "cetner", md: "flex-start" }}
                    className="py-4 px-8 w-full min-h-fit overflow-y-auto"
                >
                    <Flex
                        direction="column"
                        align={{ base: "center", md: "flex-start" }}
                        className="w-full"
                    >
                        <Text className="text-lg font-bold text-left py-4">
                            Account Details
                        </Text>
                        <Text className="text-sm text-black-light">
                            Registered At:{" "}
                            {dayjs(user?.created_at).format("MMM DD , YYYY")}{" "}
                        </Text>
                    </Flex>
                    <form
                        onSubmit={form.onSubmit((values) =>
                            console.log(values),
                        )}
                    >
                        <Grid
                            className="w-full border-b border-black-light/30 py-4"
                            align="stretch"
                        >
                            <Grid.Col span={{ sm: 4, md: 6 }}>
                                <Flex className="gap-2" align="center">
                                    <TextInput
                                        variant="filled"
                                        w={{ base: "100%", md: "100%" }}
                                        label="Name"
                                        withAsterisk
                                        placeholder="Input your name"
                                        disabled={!user}
                                        {...form.getInputProps("name")}
                                    />
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ sm: 4, md: 6 }}>
                                <Flex className="gap-2" align="center">
                                    <TextInput
                                        variant="filled"
                                        w={{ base: "100%", md: "100%" }}
                                        label="Address"
                                        withAsterisk
                                        placeholder="Input your address"
                                        disabled={!user}
                                        {...form.getInputProps("address")}
                                    />
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ sm: 4, md: 6 }}>
                                <Flex className="gap-2" align="center">
                                    <TextInput
                                        type="email"
                                        w={{ base: "100%", md: "100%" }}
                                        variant="filled"
                                        label="Email"
                                        withAsterisk
                                        placeholder="Input your email"
                                        disabled={!user}
                                        {...form.getInputProps("email")}
                                    />
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ sm: 4, md: 6 }}>
                                <Flex className="gap-2" align="center">
                                    <TextInput
                                        type="number"
                                        w={{ base: "100%", md: "100%" }}
                                        variant="filled"
                                        label="Phone Number"
                                        withAsterisk
                                        placeholder="Input your phone"
                                        disabled={!user}
                                        {...form.getInputProps("phone")}
                                    />
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ sm: 4, md: 6 }} className="">
                                <Flex
                                    className="gap-2 h-full"
                                    direction={"column"}
                                >
                                    <Text className="font-normal text-black-light">
                                        Gender:
                                    </Text>
                                    <Flex className="gap-2" align="center">
                                        <Radio.Group
                                            name="gender"
                                            {...form.getInputProps("gender")}
                                        >
                                            <Flex gap={"10px"}>
                                                <Radio
                                                    value="male"
                                                    label="Nam"
                                                    labelPosition="left"
                                                    color="blue"
                                                    classNames={{
                                                        label: "font-semibold pr-2",
                                                    }}
                                                />

                                                <Radio
                                                    value="female"
                                                    label="Nữ"
                                                    labelPosition="left"
                                                    color="red"
                                                    classNames={{
                                                        label: "font-semibold pr-2",
                                                    }}
                                                />
                                            </Flex>
                                        </Radio.Group>
                                    </Flex>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12 }}>
                                <Flex
                                    className="mt-2 gap-4"
                                    justify={{
                                        base: "center",
                                        md: "flex-start",
                                    }}
                                    align={{ base: "center", md: "flex-start" }}
                                    direction="row"
                                >
                                    <Button
                                        leftSection={<EditIcon />}
                                        variant="outline"
                                        className="border-blue-medium text-blue-medium/70 hover:bg-blue-medium/20"
                                    >
                                        Edit Profile
                                    </Button>

                                    <Button
                                        leftSection={<SaveIcon />}
                                        type="submit"
                                        variant="outline"
                                        onClick={() => {
                                            if (user?.id && form.values) {
                                                updateUserQuery.mutate({
                                                    id: user.id,
                                                    update: form.values,
                                                });
                                            }
                                        }}
                                        className="border-green-normal text-green-normal/70 hover:bg-green-normal/20"
                                    >
                                        Save Profile
                                    </Button>
                                </Flex>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Flex>
            </Flex>
        </Paper>
    );
}

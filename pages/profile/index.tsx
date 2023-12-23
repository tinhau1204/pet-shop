import {
    ActionIcon,
    Avatar,
    Flex,
    Grid,
    Paper,
    Text,
    TextInput,
    Tooltip,
    BackgroundImage,
    Button,
    Radio,
    RadioGroup,
    Group,
} from "@mantine/core";
import Link from "next/link";
import React, { useEffect } from "react";
import HouseIcon from "@my-images/icon/House_01.svg";
import PhoneIcon from "@my-images/icon/Phone.svg";
import MailIcon from "@my-images/icon/Mail.svg";
import EditIcon from "@my-images/icon/Edit_Pencil_Line_01.svg";
import SaveIcon from "@my-images/Cloud_Check.svg";

import CardTotal from "./shards/TotalCard";

import BackGround from "@my-images/background.png";
import { useForm } from "@mantine/form";
import useStore from "@/lib/store";
import { useMutation, useQuery } from "react-query";
import { getUserById } from "@/lib/api";
import { IUser } from "@/lib/api/types";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

export default function Profile() {
    const [readOnly, setReadOnly] = React.useState(true);
    const store = useStore();
    const router = useRouter();
    const cookieUser = Cookies.get("user");
    console.log("check cookieUser", cookieUser);
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
        queryKey: ["getUserById", store.authUser?.id],
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
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        getUserQuery;
    }, [getUserQuery]);

    const dataTotal = [
        { totalName: "Total Bought", totalNum: 10 },
        { totalName: "Total Reviews", totalNum: 10 },
    ];

    return getUserQuery.data && store.authUser !== null ? (
        <Paper
            className={`h-screen overflow-auto w-full `}
            withBorder
            radius="md"
        >
            <BackgroundImage src={BackGround.src}>
                <div className="relative h-48 border-b border-black-light/20 flex flex-col justify-center items-center w-full gap-3">
                    <Avatar size="xl" src={user?.avatar_url} />
                    <h2 className="text-xl font-semibold text-center text-blue-normal">
                        {user?.name}
                    </h2>
                    <Text className="text-center text-sm text-black-light">
                        Registered:{" "}
                        {dayjs(user?.created_at).format("MMM DD , YYYY")}{" "}
                    </Text>
                </div>
            </BackgroundImage>

            <Flex
                direction="column"
                justify={{ base: "center", md: "flex-start" }}
                align={{ base: "center", md: "start" }}
                className="py-4 px-8 w-full min-h-fit overflow-y-auto"
            >
                <Text className="text-lg font-bold text-left py-4">
                    1. Total Bought
                </Text>
                <Grid
                    className="w-full border-b border-black-light/30 py-4"
                    justify="center"
                    align="center"
                >
                    {dataTotal.map((item, index) => (
                        <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                            <CardTotal
                                totalName={item.totalName}
                                totalNum={item.totalNum}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
                <Flex
                    direction="row"
                    justify="flex-start"
                    align="center"
                    className="w-full gap-1"
                >
                    <Text className="text-lg font-bold text-left py-4">
                        2. Account Details
                    </Text>
                </Flex>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Grid
                        className="w-full border-b border-black-light/30 py-4"
                        justify="center"
                        align="stretch"
                    >
                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Full Name:
                                </Text>
                                <TextInput
                                    name="name"
                                    variant="unstyled"
                                    placeholder={""}
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                    {...form.getInputProps("name")}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }} className="">
                            <Flex className="gap-2 h-full" align="center">
                                <Text className="font-normal text-black-light">
                                    Gender:
                                </Text>
                                <Flex className="gap-2" align="center">
                                    <Radio.Group
                                        name="gender"
                                        {...form.getInputProps("gender")}
                                    >
                                        <Group>
                                            <Radio
                                                value="male"
                                                label="Nam"
                                                labelPosition="left"
                                                color="blue"
                                                classNames={{
                                                    label: "font-semibold pr-2",
                                                }}
                                                disabled={readOnly}
                                            />

                                            <Radio
                                                value="female"
                                                label="Nữ"
                                                labelPosition="left"
                                                color="red"
                                                classNames={{
                                                    label: "font-semibold pr-2",
                                                }}
                                                disabled={readOnly}
                                            />
                                        </Group>
                                    </Radio.Group>
                                </Flex>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Email:
                                </Text>
                                <TextInput
                                    name="email"
                                    variant="unstyled"
                                    placeholder=""
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                    {...form.getInputProps("email")}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Phone Number:
                                </Text>
                                <TextInput
                                    name="phone"
                                    variant="unstyled"
                                    placeholder=""
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                    {...form.getInputProps("phone")}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Address:
                                </Text>
                                <TextInput
                                    name="address"
                                    variant="unstyled"
                                    placeholder=""
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                    {...form.getInputProps("address")}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}></Grid.Col>

                        <Grid.Col span={{ base: 12 }}>
                            <Flex
                                className="mt-2 gap-4"
                                justify={{ base: "center", md: "flex-start" }}
                                align={{ base: "center", md: "flex-start" }}
                                direction="row"
                            >
                                <Button
                                    leftSection={<EditIcon />}
                                    variant="outline"
                                    className="border-blue-medium text-blue-medium/70 hover:bg-blue-medium/20"
                                    onClick={() => setReadOnly(false)}
                                    disabled={!readOnly}
                                >
                                    Edit Profile
                                </Button>

                                <Button
                                    leftSection={<SaveIcon />}
                                    type="submit"
                                    variant="outline"
                                    className="border-green-normal text-green-normal/70 hover:bg-green-normal/20"
                                    // onClick={() => {
                                    //     setReadOnly(true)
                                    // }}
                                    disabled={readOnly}
                                >
                                    Save Profile
                                </Button>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </form>
            </Flex>
        </Paper>
    ) : (
        <div className="flex justify-center items-center h-screen">
            <Text className="text-2xl font-semibold text-center">
                Loading...
            </Text>
        </div>
    );
}

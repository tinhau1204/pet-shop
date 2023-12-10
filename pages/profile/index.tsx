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
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import HouseIcon from "@my-images/icon/House_01.svg";
import PhoneIcon from "@my-images/icon/Phone.svg";
import MailIcon from "@my-images/icon/Mail.svg";
import EditIcon from "@my-images/icon/Edit_Pencil_Line_01.svg";
import SaveIcon from "@my-images/Cloud_Check.svg";

import CardTotal from "./shards/TotalCard";

import BackGround from "@my-images/background.png";
import { useForm } from "@mantine/form";

export default function Profile() {
    const [readOnly, setReadOnly] = React.useState(true);
    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            gender: "male",
            email: "",
            phoneNumber: "",
            address: "",
        },
    });

    const dataTotal = [
        { totalName: "Total Bought", totalNum: 10 },
        { totalName: "Total Bought", totalNum: 10 },
    ];

    return (
        <Paper
            className={`h-screen overflow-auto w-full `}
            withBorder
            radius="md"
        >
            <BackgroundImage src={BackGround.src}>
                <div className="relative h-48 border-b border-black-light/20 flex flex-col justify-center items-center w-full gap-3">
                    <Avatar size="xl" />
                    <h2 className="text-xl font-semibold text-center text-blue-normal">
                        User Test
                    </h2>
                    <Text className="text-center text-sm text-black-light">
                        Registered: 30th Nov 2023{" "}
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
                                    First Name:
                                </Text>
                                <TextInput
                                    variant="unstyled"
                                    placeholder={"User"}
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Last Name:
                                </Text>
                                <TextInput
                                    variant="unstyled"
                                    placeholder={"Test"}
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Gender:
                                </Text>
                                <Flex className="gap-2" align="center">
                                    <Radio
                                        name="gender"
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
                                        name="gender"
                                        value="female"
                                        label="Nữ"
                                        labelPosition="left"
                                        color="red"
                                        classNames={{
                                            label: "font-semibold pr-2",
                                        }}
                                        disabled={readOnly}
                                    />
                                </Flex>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Email:
                                </Text>
                                <TextInput
                                    variant="unstyled"
                                    placeholder={"tinhau1204@gmail.com"}
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Phone Number:
                                </Text>
                                <TextInput
                                    variant="unstyled"
                                    placeholder={"0123456789"}
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                />
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, md: 4 }}>
                            <Flex className="gap-2" align="center">
                                <Text className="font-normal text-black-light">
                                    Address:
                                </Text>
                                <TextInput
                                    variant="unstyled"
                                    placeholder={
                                        "so 1 Vo Van Ngan, Linh Chieu Thu Duc"
                                    }
                                    className="font-semibold border-none"
                                    readOnly={readOnly}
                                    radius={0}
                                    classNames={{
                                        input: "border-0 focus:border-b focus:border-blue-medium/50 ",
                                    }}
                                />
                            </Flex>
                        </Grid.Col>

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
                                    variant="outline"
                                    className="border-green-normal text-green-normal/70 hover:bg-green-normal/20"
                                    onClick={() => setReadOnly(true)}
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
    );
}

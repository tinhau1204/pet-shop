import React from "react";

import { useRouter } from "next/router";
import { Button, Card, Text, Transition } from "@mantine/core";
import SuccessBackGround from "@my-images/thankyou/success.png";
import CheckedIcon from "@my-images/Wavy_Check.svg";
import Image from "next/image";

export default function VerifiedRegister() {
    const router = useRouter();

    function handleLogin() {
        router.push("/login");
    }

    return (
        <div className="h-screen flex flex-row items-center">
            <Card
                padding="lg"
                radius="md"
                withBorder
                shadow="lg"
                className="w-fit mx-auto"
                classNames={{
                    section: "relative",
                }}
            >
                <Card.Section>
                    <Image
                        src={SuccessBackGround.src}
                        alt="Success"
                        width={550}
                        height={150}
                        className="object-cover object-center"
                    />
                    <CheckedIcon className="absolute top-[28%] left-[32%] w-[200px] h-[200px] text-blue-medium z-10" />
                </Card.Section>
                <Text className="mt-5 text-2xl font-semibold text-blue-medium text-center">
                    Verified!
                </Text>

                <Text className="mt-2 text-base font-normal text-black-normal text-center">
                    Thank you for verifying your email. You can now login to
                    your account.
                </Text>

                <Button
                    onClick={handleLogin}
                    className="mt-2 rounded-lg bg-blue-medium"
                >
                    Continue
                </Button>
            </Card>
        </div>
    );
}

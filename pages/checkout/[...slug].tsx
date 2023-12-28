import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
//http://localhost:3000/checkout/success?orderId=INV-1703398510869
import { useRouter } from "next/router";
import { Button, Card, Text, Transition } from "@mantine/core";
import SuccessBackGround from "@my-images/thankyou/success.png";
import CheckedIcon from "@my-images/Wavy_Check.svg";
import Image from "next/image";
import FailedIcon from "@my-images/Failed.svg";

type PageProps = {
    [name: string]: any;
};

export default function Page(props: PageProps) {
    const router = useRouter();
    return props.slug && props.slug === "success" ? (
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
                    SUCCESSFULLY!
                </Text>

                <Text className="mt-2 text-base font-normal text-black-normal text-center">
                    Your OrderId:{" "}
                    <span className="font-bold">{props.params}</span> has been
                    placed.
                    <br />
                    Please waiting for our confirmation.
                </Text>

                <Button
                    onClick={() => router.push("/")}
                    className="mt-2 rounded-lg bg-blue-medium"
                >
                    Continue to Shopping
                </Button>
            </Card>
        </div>
    ) : (
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
                    <FailedIcon className="absolute top-[28%] left-[32%] w-[200px] h-[200px] text-red-normal z-10" />
                </Card.Section>
                <Text className="mt-5 text-2xl font-semibold text-red-normal text-center">
                    FAILED!
                </Text>

                <Text className="mt-2 text-base font-normal text-black-normal text-center">
                    Your OrderId: {props.params} has been canceled. Please try
                    again.
                </Text>

                <Button
                    onClick={() => router.push("/cart")}
                    className="mt-2 rounded-lg bg-blue-medium"
                >
                    Back to Cart Page
                </Button>
            </Card>
        </div>
    );
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const queryParams = context.query;
    // Pass data to the page via props
    return {
        props: {
            page: "checkout",
            slug:
                (queryParams?.slug &&
                    queryParams?.slug?.length > 0 &&
                    queryParams.slug[0]) ||
                "",
            params: queryParams?.orderId,
            message: queryParams?.message || "",
        },
    };
}

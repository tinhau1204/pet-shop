import { Flex, Text, Input, Stack, Button, Divider } from "@mantine/core";
import FacebookIcon from "@my-images/facebook.svg";
import TwitterIcon from "@my-images/twitter.svg";
import InstagramIcon from "@my-images/instagram.svg";
import YoutubeIcon from "@my-images/youtube.svg";
import MonitoLogo from "@my-images/monito.svg";
import Link from "next/link";

type FooterProps = {
    className?: string;
};

const HeaderLink = [
    { name: "Home", link: "/home" },
    { name: "Category", link: "/categories" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
];

const socialMedia = [
    { icon: <FacebookIcon />, link: "https://facebook.com" },
    { icon: <TwitterIcon />, link: "https://twitter.com" },
    { icon: <InstagramIcon />, link: "https://instagram.com" },
    { icon: <YoutubeIcon />, link: "https://youtube.com" },
];

function Footer({ className }: FooterProps) {
    return (
        <footer
            className={`${className} bg-yellow-light relative w-[100vw] left-[50%] right-[50%] mr-[-50vw] ml-[-50vw] sm:px-0 pt-10 md:pt-20 px-4 text-center rounded-t-2xl mt-10`}
        >
            <div className="base-container h-full">
                <Flex
                    className="bg-blue-bold h-full max-w-[24rem] w-full sm:max-w-full rounded-xl p-8 m-auto"
                    justify="center"
                    direction={{ base: "column", sm: "row" }}
                    align="center"
                    gap="xl"
                >
                    <Text
                        size="lg"
                        c="white"
                        className="sm:text-left font-semibold"
                    >
                        Register Now For more information on Our Programs
                    </Text>

                    <form className="flex flex-col sm:flex-row  w-full bg-primary rounded-lg p-3 gap-3">
                        <Input
                            placeholder="Enter your email address"
                            radius="sm"
                            className="max-w-full flex-1"
                        />

                        <Button variant="filled" className="bg-blue-bold">
                            Subcribe Now
                        </Button>
                    </form>
                </Flex>

                <Flex
                    justify="space-between"
                    align="center"
                    direction={{ base: "column", sm: "row" }}
                    className="max-w-[24rem] sm:max-w-full mx-auto mt-10"
                >
                    <Flex
                        justify="space-between"
                        align="center"
                        direction="row"
                        className="w-full sm:w-auto"
                        gap={{ base: "16px", sm: "60px" }}
                    >
                        {HeaderLink.map((link, index) => {
                            return (
                                <Link key={index} href={link.link}>
                                    <Text
                                        key={index}
                                        fw={800}
                                        size="md"
                                        className="text-black font-semibold hover:underline"
                                    >
                                        {link.name}
                                    </Text>
                                </Link>
                            );
                        })}
                    </Flex>

                    <Flex
                        justify="center"
                        align="center"
                        direction="row"
                        gap="40px"
                        className="mt-5 sm:mt-0"
                    >
                        {socialMedia.map((link, index) => {
                            return (
                                <Link
                                    href={link.link}
                                    key={index}
                                    target="_blank"
                                >
                                    {link.icon}
                                </Link>
                            );
                        })}
                    </Flex>
                </Flex>

                <Divider
                    my={{ base: "36px", sm: "40px" }}
                    size="xs"
                    className="border-gray-400"
                />

                <div className="grid place-content-center sm:grid-cols-12 items-center">
                    <div className="sm:col-span-3 w-full text-center sm:text-left order-3 sm:order-1">
                        <Text className="text-black-normal font-normal text-[10px] sm:text-sm">
                            © 2022 Monito. All rights reserved.
                        </Text>
                    </div>

                    <Flex
                        className="sm:col-span-6 w-auto order-1 sm:order-2 mb-7 sm:mb-0"
                        justify="center"
                        align="center"
                    >
                        <MonitoLogo />
                    </Flex>

                    <Flex
                        className="sm:col-span-3 w-full order-2 sm:order-3 mb-2 sm:mb-0"
                        justify={{ base: "center", sm: "flex-end" }}
                        align="center"
                        gap="xl"
                    >
                        <Text className="text-black-normal font-normal text-xs sm:text-sm">
                            Terms of Service
                        </Text>
                        <Text className="text-black-normal font-normal text-xs sm:text-sm">
                            Privacy Policy
                        </Text>
                    </Flex>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

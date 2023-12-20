import Monitosvg from "@my-images/monito.svg";
import VNFlagIcon from "@my-images/vnflag.svg";
import CHNFlagIcon from "@my-images/chnflag.svg";
import UKFlagIcon from "@my-images/UKflag.svg";
import USFlagIcon from "@my-images/usflag.svg";
import EURFlagIcon from "@my-images/eurflag.svg";
import SearchIcon from "@my-images/search.svg";
import React, { useEffect } from "react";
import {
    Burger,
    Button,
    Flex,
    Text,
    Drawer,
    Input,
    CloseButton,
    ActionIcon,
    Tooltip,
    Image,
    Menu,
    CloseIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Search from "../Search";
import Dropdown from "../Dropdown";
import type { DropdownDataProps } from "../Dropdown";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileIcon from "@my-images/profile.svg";
import CartIcon from "@my-images/Cart.svg";
import CartCheckedIcon from "@my-images/Cart_Checked.svg";
import SettingIcon from "@my-images/Settings.svg";
import SignOutIcon from "@my-images/Sign_out.svg";
import useStore from "@/lib/store";
import { IUser } from "@/lib/api/types";
const Cookies = require("js-cookie");

type HeaderProps = {
    [name: string]: any;
};

const HeaderLink = [
    { name: "Home", link: "/" },
    { name: "Category", link: "/categories" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
];

// const selectData: DropdownDataProps[] = [
//     { value: "VND", prefix: <VNFlagIcon /> },
//     { value: "CHN", prefix: <CHNFlagIcon width="20" height="20" /> },
//     { value: "GBP", prefix: <UKFlagIcon width="20" height="20" /> },
//     { value: "USD", prefix: <USFlagIcon width="20" height="20" /> },
//     { value: "EUR", prefix: <EURFlagIcon width="20" height="20" /> },
// ];

function Header(props: HeaderProps) {
    const [opened, { open, close }] = useDisclosure();
    const [isMobile, setIsMobile] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const store = useStore();
    const router = useRouter();
    const [user, setUser] = React.useState<IUser | null | string>(null);
    const authUser = store.authUser;
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        }, 200); // Adjust the interval time as needed

        if (authUser !== null) {
            setUser(authUser);
        } else {
            setUser(Cookies.get("user"));
        }
        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function handleClickSearch() {
        setIsSearch(!isSearch);
    }

    const headerLinkContent = HeaderLink.map((item, index) => (
        <Link key={index} href={item.link} onClick={close}>
            <Text
                key={index}
                fw={800}
                size="md"
                className="!text-blue-medium hover:underline"
            >
                {item.name}
            </Text>
        </Link>
    ));

    function handleHomePage() {
        router.push("/");
    }

    function handleLogout() {
        store.setAuthUser(null);
        Cookies.remove("accessToken");
        router.push("/auth/login");
    }

    return (
        <header className="w-full z-50 grid grid-cols-5 md:grid-cols-6 py-3 md:py-8 items-center">
            <Flex
                align="center"
                justify={{ base: "center", sm: "start" }}
                className="col-span-3 sm:col-span-1 order-2 sm:order-none"
            >
                <Monitosvg
                    onClick={handleHomePage}
                    className="min-w-[7.2rem] cursor-pointer"
                />
            </Flex>

            {!isMobile ? (
                <Flex
                    gap={{ base: "8px", sm: "16px", lg: "24px", xl: "48px" }}
                    justify="start"
                    align={{ base: "center", sm: "center" }}
                    direction={{ base: "column", sm: "row" }}
                    wrap="wrap"
                    className="h-full !min-w-full col-span-1 sm:col-span-3 md:col-span-2 order-1 sm:order-none"
                >
                    {headerLinkContent}
                </Flex>
            ) : (
                <>
                    <Drawer
                        opened={opened}
                        onClose={close}
                        withCloseButton={true}
                        title="Menu Sidebar"
                        size="xs"
                        className="h-full"
                        classNames={{
                            body: "h-full",
                            title: "!text-xl",
                        }}
                        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    >
                        {headerLinkContent}
                    </Drawer>

                    <Burger opened={opened} onClick={open} />
                </>
            )}

            <Flex
                gap={{ base: "8px", md: "14px" }}
                justify={{ base: "center", sm: "end" }}
                align={{ base: "end", sm: "center" }}
                direction={{ base: "column", sm: "row" }}
                className="!w-full !h-full col-span-1 md:col-span-3 order-3 sm:order-none"
            >
                <Search
                    className="md:max-w-[17.5rem] hidden sm:block sm:min-w-[10rem] border-0 w-full"
                    classNames={{
                        input: "!border-0 !rounded-full !bg-white !py-3 ",
                        section: "!gap-3",
                    }}
                />

                <Flex
                    gap={{ base: "sm" }}
                    justify="center"
                    align="center"
                    direction="row"
                    className="sm:!hidden"
                >
                    {isSearch ? (
                        <Search
                            leftSection={
                                <Tooltip label="Close Search bar">
                                    <Button
                                        className="!p-0"
                                        variant="transparent"
                                        onClick={() => setIsSearch(false)}
                                    >
                                        <SearchIcon />
                                    </Button>
                                </Tooltip>
                            }
                            className="min-w-full w-full"
                            classNames={{
                                input: "!border-0 !rounded-full !bg-white !py-3 ",
                                section: "!gap-3",
                            }}
                        />
                    ) : (
                        <Tooltip label="Open Search bar">
                            <Button
                                variant="transparent"
                                color="dark"
                                onClick={handleClickSearch}
                                className="block sm:!hidden"
                            >
                                <SearchIcon />
                            </Button>
                        </Tooltip>
                    )}
                </Flex>

                {user ? (
                    <Tooltip label="user">
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon
                                    className="border border-black-light/30"
                                    radius="xl"
                                    size="lg"
                                    variant="transparent"
                                >
                                    <Image
                                        className="p-1.5 rounded-full"
                                        src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
                                        alt="test"
                                    />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={() => router.push("/profile")}
                                    leftSection={
                                        <ProfileIcon className="w-4 h-4 text-black-bold/50" />
                                    }
                                    className="font-bold"
                                >
                                    Profile
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => router.push("/cart")}
                                    leftSection={
                                        <CartIcon className="w-5 h-5 text-black-medium/50" />
                                    }
                                >
                                    Cart
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <CartCheckedIcon className="w-4 h-4 text-black-medium/50" />
                                    }
                                >
                                    Cart History
                                </Menu.Item>

                                <Menu.Divider />
                                <Menu.Item
                                    color="red"
                                    leftSection={
                                        <SignOutIcon className="w-4 h-4 text-black-bold/50" />
                                    }
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Tooltip>
                ) : (
                    <Button
                        radius="xl"
                        variant="filled"
                        className="bg-blue-medium text-white block"
                        onClick={() => router.push("/auth/login")}
                    >
                        Join our community
                    </Button>
                )}
                {/* 
                <Dropdown
                    data={selectData}
                    leftSection={<VNFlagIcon />}
                    className=" hidden sm:block "
                    classNames={{ input: "!border-0 min-w-[100px]" }}
                /> */}
            </Flex>
        </header>
    );
}

export default Header;

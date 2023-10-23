import Monitosvg from '@my-images/monito.svg'
import VNFlagIcon from '@my-images/vnflag.svg'
import CHNFlagIcon from '@my-images/chnflag.svg'
import UKFlagIcon from '@my-images/UKflag.svg'
import USFlagIcon from '@my-images/usflag.svg'
import EURFlagIcon from '@my-images/eurflag.svg'
import SearchIcon from '@my-images/search.svg'
import React, { useEffect } from 'react';
import { Burger, Button, Flex, Text, Drawer, Input, CloseButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import Search from '../Search';
import Dropdown from '../Dropdown';
import type { DropdownDataProps } from '../Dropdown'
import Link from 'next/link'
type HeaderProps = {
    [name: string]: any;
};

const HeaderLink = [
    { name: 'Home', link: '/' },
    { name: 'Category', link: '/categories' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
]

const selectData: DropdownDataProps[] = [
    { value: 'VND', icon: <VNFlagIcon /> },
    { value: 'CHN', icon: <CHNFlagIcon width="20" height="20" /> },
    { value: 'GBP', icon: <UKFlagIcon width="20" height="20" /> },
    { value: 'USD', icon: <USFlagIcon width="20" height="20" /> },
    { value: 'EUR', icon: <EURFlagIcon width="20" height="20" /> },
]

function Header(props: HeaderProps) {

    const [opened, { open, close }] = useDisclosure();
    const [isMobile, setIsMobile] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        }, 200); // Adjust the interval time as needed

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function handleClickSearch() {
        setIsSearch(!isSearch);
    }

    const headerLinkContent = HeaderLink.map((item, index) => (
        <Link key={index} href={item.link}>
            <Text key={index} fw={800} size="md" className="!text-blue-medium">
                {item.name}
            </Text>
        </Link>

    ))
    return (
        <header className="grid grid-cols-5 md:grid-cols-6 py-3 md:py-8 items-center">
            <Flex
                align="center"
                justify={{ base: "center", sm: "start" }}
                className="col-span-3 sm:col-span-1 order-2 sm:order-none"
            >
                <Monitosvg className="min-w-[7.2rem]" />
            </Flex>

            {!isMobile ?
                <Flex
                    gap={{ base: "8px", sm: "16px", lg: "24px", xl: "48px" }}
                    justify="start"
                    align={{ base: "center", sm: "center" }}
                    direction={{ base: "column", sm: "row" }}
                    wrap="wrap"
                    className="h-full !min-w-full col-span-1 sm:col-span-3 md:col-span-2 order-1 sm:order-none"
                >
                    {headerLinkContent}
                </Flex> :
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
                            title: '!text-xl'
                        }}
                        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                    >
                        {headerLinkContent}
                    </Drawer>

                    <Burger opened={opened} onClick={open} />
                </>
            }

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
                        input: '!border-0 !rounded-full !bg-white !py-3 ',
                        section: "!gap-3"
                    }}
                />

                <Flex
                    gap={{ base: "sm" }}
                    justify="center"
                    align="center"
                    direction="row"
                    className="sm:!hidden"
                >
                    {isSearch ?
                        <Search
                            leftSection={
                                <Button className="!p-0" variant='transparent' onClick={() => setIsSearch(false)}>
                                    <SearchIcon />
                                </Button>
                            }
                            className="min-w-full w-full"
                            classNames={{
                                input: '!border-0 !rounded-full !bg-white !py-3 ',
                                section: "!gap-3"
                            }}
                        />
                        :
                        <Button
                            variant="transparent"
                            color="dark"
                            onClick={handleClickSearch}
                            className="block sm:!hidden"
                        >
                            <SearchIcon />
                        </Button>
                    }
                </Flex>

                <Button
                    radius='xl'
                    variant="filled"
                    className="!bg-blue-medium !text-white !hidden md:!block"

                >
                    Join the community
                </Button>

                <Dropdown
                    data={selectData}
                    className=" hidden sm:block "
                    classNames={{ input: '!border-0 min-w-[100px]' }}
                />
            </Flex>
        </header>
    );
}

export default Header;

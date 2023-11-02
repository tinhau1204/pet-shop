import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Carousel } from "@mantine/carousel";
import { Button, Group, Table, Text } from "@mantine/core";
import ChatIcon from "@my-images/Chat_Dots.svg";
import FacebookIcon from "@my-images/facebook.svg";
import TwitterIcon from "@my-images/twitter.svg";
import InstagramIcon from "@my-images/instagram.svg";
import YoutubeIcon from "@my-images/youtube.svg";
import ShareIcon from "@my-images/Share_Android.svg";
import Link from "next/link";
type PageProps = {
    [name: string]: any;
};

const socialMedia = [
    {
        icon: (
            <FacebookIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://facebook.com",
    },
    {
        icon: (
            <TwitterIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://twitter.com",
    },
    {
        icon: (
            <InstagramIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://instagram.com",
    },
    {
        icon: (
            <YoutubeIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://youtube.com",
    },
];

export default function Page(props: PageProps) {
    const guarantee = [
        { image: "", title: "100% health guarantee for pets" },
        { image: "", title: "100% guarantee of pet identification" },
    ];

    const elements = [
        { title: "SKU", content: ": #1000078" },
        { title: "Gender", content: ": Female" },
        { title: "Age", content: ": 2 months" },
        { title: "Size", content: ": Small" },
        { title: "Color", content: ": Appricot & Tan" },
        { title: "Vaccinated", content: ": Yes" },
        { title: "Dewormed", content: ": Yes" },
        { title: "Cert", content: ": Yes (MKA)" },
        { title: "Microchip", content: ": Yes" },
        { title: "Location", content: ": Vietnam" },
        { title: "Published Date", content: ": 12-Oct-2022" },
        {
            title: "Additional Information",
            content:
                ": Pure breed Shih Tzu. Good body structure. With MKA cert and Microchip. Father from champion lineage.",
        },
    ];

    const images = [
        {
            src: "https://www.thesprucepets.com/thmb/LEJXClitrdomUpi2OhbubOad2ac=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/portrait-if-a-spitz-pomeranian_t20_v3o29E-5ae9bbdca18d9e0037d95983.jpg",
            alt: "Shiba Inu Sepia",
        },
        {
            src: "https://www.thesprucepets.com/thmb/beGIs4BTQkN9HDR_34fM2vzEPaU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/yorkshire-terrier-583788122-581630e85f9b581c0b018a00.jpg",
            alt: "Shiba Inu Sepia 1",
        },
        {
            src: "https://www.thesprucepets.com/thmb/CvI8Zzy6b81_HGQxE4uhddUqnKQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/breed_profile_dachshund_1117959_recirc_2815-c1c8808983a5441cb940995c983ea7f7.jpg",
            alt: "Shiba Inu Sepia 2",
        },
        {
            src: "https://www.thesprucepets.com/thmb/3NFfIkrUMzXd22T5aIgo6Wz8PTA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/poodle-159757033-581632be5f9b581c0b01a3e4.jpg",
            alt: "Shiba Inu Sepia 3",
        },
        {
            src: "https://www.thesprucepets.com/thmb/eE3AqCYGNq5sNnEFOwKyC9wg938=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/breed_profile_shihtzu_1117999_recirc_1123-ceff2a1a86794a7f877587230817615d.jpg",
            alt: "Shiba Inu Sepia 4",
        },
        {
            src: "https://www.thesprucepets.com/thmb/0Gsr5EYtgDy5OTNDadZFsIzmc5k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/portrait-of-schnauzer-against-wall-568528767-581634ad5f9b581c0b01bd99.jpg",
            alt: "Shiba Inu Sepia 5",
        },
        {
            src: "https://www.thesprucepets.com/thmb/0Gsr5EYtgDy5OTNDadZFsIzmc5k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/portrait-of-schnauzer-against-wall-568528767-581634ad5f9b581c0b01bd99.jpg",
            alt: "Shiba Inu Sepia 6",
        },
        {
            src: "https://www.thesprucepets.com/thmb/9NL-1lSfjoVzBEJRab9dvW-9pw4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pug-lying-in-meadow-with-dandelions-sweden-europe-533734486-5816357a3df78cc2e891d21f.jpg",
            alt: "Shiba Inu Sepia 7",
        },
    ];

    const rows = elements.map((element, index) => (
        <Table.Tr key={element.title}>
            <Table.Td className="text-black-normal">{element.title}</Table.Td>
            <Table.Td className="text-black-normal">{element.content}</Table.Td>
        </Table.Tr>
    ));
    // Render data...
    return (
        <>
            <div className="flex flex-row items-start justify-center min-h-screen border border-black-light/50 px-5 py-[22px] gap-8 rounded-xl  bg-black-light/20">
                <div className="left w-full h-full">
                    <Carousel
                        withIndicators
                        height={476}
                        controlSize={40}
                        classNames={{ control: "bg-primary/30" }}
                        loop
                    >
                        {images.map((image, index) => (
                            <Carousel.Slide key={index}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </Carousel.Slide>
                        ))}
                    </Carousel>

                    <div className="bg-yellow-light flex flex-row items-center justify-around px-3 py-2 my-4 rounded-xl    ">
                        {guarantee.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-center justify-between gap-2"
                            >
                                <img
                                    src={item.image}
                                    alt="image"
                                    className="w-8 h-8"
                                />
                                <Text className="text-blue-medium font-bold text-sm">
                                    {item.title}
                                </Text>
                            </div>
                        ))}
                    </div>

                    <div className="px-2.5 py-1.5 flex flex-row gap-5 items-center">
                        <Link
                            href="/products/[id]"
                            className="flex flex-row gap-2 items-center justify-center w-fit"
                        >
                            <ShareIcon className="w-5 h-5" />
                            <Text className="text-black-bold text-sm font-bold mt-0.5">
                                Share:
                            </Text>
                        </Link>

                        <div className="flex flex-row items-center justify-center gap-4">
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
                        </div>
                    </div>
                </div>

                <div className="right w-full h-full">
                    <Text className="text-black-light text-sm">
                        SKU #1000078
                    </Text>
                    <Text className="text-black-bold text-2xl font-bold mt-0.5">
                        Shiba Inu Sepia
                    </Text>
                    <Text className="text-blue-medium text-xl font-bold mt-1.5">
                        34.000.000 VND
                    </Text>

                    <Group gap="lg" className="my-4">
                        <Button
                            px={28}
                            py={8}
                            variant="filled"
                            className="bg-blue-medium rounded-full"
                        >
                            Contact Us
                        </Button>
                        <Button
                            px={28}
                            py={8}
                            variant="outline"
                            className="text-blue-medium border-blue-medium rounded-full"
                            leftSection={<ChatIcon className="w-6 h-6" />}
                        >
                            Chat with Monito
                        </Button>
                    </Group>

                    <Table>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;

    // Pass data to the page via props
    return { props: { page: "product", slug: params?.slug || "" } };
}

import { Flex, Grid, Text } from "@mantine/core";
import Link from "next/link";
import BullDogImage from "@my-images/bulldog.png";
import Image from "next/image";
import PetImage from "@my-images/banner/banner_3.png"
import { Carousel } from "@mantine/carousel";

function CardImage({ image, alt }: { image: string; alt: string }) {
    return (
        <div className="w-[15.5rem] h-[15rem] rounded-xl overflow-hidden">
            <Image
                src={image}
                alt={alt}
                width={2506}
                height={1920}
                className="object-cover object-center rounded-xl"
                sizes="296px"
            />
        </div>
    );
}

const petCarousel = [
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Two-parrots-clients-of-our-in-home-small-pet-in-home-holiday-care-600x450.jpeg", alt: "pet_1"},
    // {image: "https://patspets.com.au/wp-content/uploads/2023/03/2-dogs-in-the-park-with-our-dog-walking-service-600x414.jpeg", alt: "pet_2"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/2-dogs-playing-in-the-park-while-out-with-Louise-and-her-dog-walking-service-600x450.jpeg", alt: "pet_3"},
    // {image: "https://patspets.com.au/wp-content/uploads/2023/03/Cat-ate-home-holiday-cat-care-service-600x476.jpeg", alt: "pet_4"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Cat-holiday-cat-care-service-600x450.jpeg", alt: "pet_5"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Dog-at-the-park-doggy-day-care-and-dog-walking-service-600x450.jpeg", alt: "pet_6"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Dog-enjoying-our-dog-walking-service-600x450.jpeg", alt: "pet_7"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/dog-holiday-care-service-600x450.jpeg", alt: "pet_8"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Rabbit-small-pet-holiday-care-service-600x450.jpeg", alt: "pet_9"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/DOg-with-ball-dog-walking-service-and-doggy-day-care-400x300.jpeg", alt: "pet_10"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Cat-enjoying-in-home-holiday-cat-care-600x450.jpeg", alt: "pet_11"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Dogs-in-a-car-on-their-way-to-the-park-with-our-dog-walking-and-doggy-day-care-service-600x450.jpeg", alt: "pet_12"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Dogs-in-the-van-dog-walking-service-600x450.jpeg", alt: "pet_13"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Lots-of-small-dogs-enjoying-our-dog-walking-service-400x287.jpeg", alt: "pet_14"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Cat-holiday-car-service-600x450.jpeg", alt: "pet_15"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Rabbit-at-home-holiday-pet-care-service-600x450.jpeg", alt: "pet_16"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Small-dogs-on-a-bench-enjoying-our-dog-walking-service-in-Bayside-and-Kingston-600x450.jpeg", alt: "pet_17"},
    {image: "https://patspets.com.au/wp-content/uploads/2023/03/Small-dog-playing-doggy-day-care-600x450.jpeg", alt: "pet_18"},
]

export default function About() {

    return (
        <>
            <Grid
                classNames={{
                    inner: "items-center"
                }}
                className="px-2 pt-8 py-8"
            >
                <Grid.Col
                    span={{ base: 12, sm: 6 }}
                    classNames={{
                        col: "place-items-center"
                    }}
                >
                    <Image width={600} height={300} src={PetImage.src} alt="banner3" />
                </Grid.Col >
                <Grid.Col span={{ base: 12, sm: 6 }}
                    classNames={{
                        col: "text-center"
                    }}
                >
                    <Text
                        className="text-yellow-bold text-4xl font-bold underline"
                    >
                        Our Monito Pet Shop
                    </Text>

                    <Text
                        className="text-blue-bold text-base font-normal mt-8"
                    >
                        Welcome to Monito Pet Shop – Where Pets Find their Perfect Match!
                        Discover a world of joy with our furry friends and premium accessories.
                        Your pet&apos;s happiness begins here at Monito Pet Shop –<Link href="/" className="underline text-blue-light font-semibold"> shop now!</Link>
                    </Text>
                </Grid.Col>
            </Grid>


            <div className="p-2 w-full flex-col flex items-center gap-4 py-8 bg-black-light/10">
                <Text className="text-yellow-bold text-4xl font-bold uppercase mb-8 text-center">
                    We provide the best for your pet
                </Text>
                <Grid>
                    <Grid.Col
                        span={{ base: 12, md: 4 }}
                        classNames={{
                            col: "place-items-center"
                        }}
                    >
                        <Flex
                            direction={{ base: "column", xs: "row", md: "column" }}
                            justify="center"
                            align="center"
                            className="gap-y-16 gap-x-4"
                        >
                            <div className="w-full text-center">
                                <Text className="text-blue-bold font-bold text-xl">
                                    Providing Products at Affordable Prices
                                </Text>
                                <Text className="text-blue-bold font-normal text-base mt-2">
                                    In addition to the factors of product quality,
                                    reputable and professional stores need to bring
                                    products at affordable prices to customers.
                                    You can attend...
                                </Text>
                            </div>

                            <div className="w-full text-center">
                                <Text className="text-blue-bold font-bold text-xl">
                                    Provide quality products
                                </Text>
                                <Text className="text-blue-bold font-normal text-base mt-2">
                                    One of the important criteria to evaluate a reputable pet
                                    food supplier is providing quality products.
                                    Products such as food, milk...
                                </Text>
                            </div>
                        </Flex>
                    </Grid.Col >

                    <Grid.Col
                        span={{ base: 12, md: 4 }}
                        classNames={{
                            col: "place-items-center justify-center flex flex-row"
                        }}
                    >
                        <Image width={400} height={400} src={BullDogImage.src} alt="background" />
                    </Grid.Col >

                    <Grid.Col
                        span={{ base: 12, md: 4 }}
                        classNames={{
                            col: "place-items-center"
                        }}
                    >
                        <Flex
                            direction={{ base: "column", xs: "row", md: "column" }}
                            justify="center"
                            align="center"
                            className="gap-y-16 gap-x-4"
                        >
                            <div className="w-full text-center">
                                <Text className="text-blue-bold font-bold text-xl">
                                    Enthusiastic consultants and knowledgeable about pets
                                </Text>
                                <Text className="text-blue-bold font-normal text-base mt-2">
                                    Besides the products provided to customers, you can base on
                                    the attitude of the staff to evaluate the store&apos;s reputation.
                                    Store employees need to have...
                                </Text>
                            </div>

                            <div className="w-full text-center">
                                <Text className="text-blue-bold font-bold text-xl">
                                    Providing diverse and rich products
                                </Text>
                                <Text className="text-blue-bold font-normal text-base mt-2">
                                    Each type of pet has its own unique characteristics and habits.
                                    Reputable dog and cat food suppliers need to provide
                                    a full range of products to meet the needs...
                                </Text>
                            </div>
                        </Flex>
                    </Grid.Col >
                </Grid>
            </div>

            <div className="w-full mt-6 mb-14 mr-4 pl-4">
                        <Text className="font-bold text-yellow-bold text-4xl mb-8 ml-2 uppercase">
                            Our lovely pets
                        </Text>

                        <Carousel
                            align="start"
                            slideGap="md"
                            withControls={false}
                            controlSize={30}
                            loop
                            dragFree
                            withIndicators
                            slideSize="12%"
                            className="w-full h-full overflow-hidden mt-3"
                        >
                            {petCarousel.map((image, index) => (
                                <Carousel.Slide key={index}>
                                    <CardImage
                                        image={image.image}
                                        alt={image.alt}
                                    />
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    </div>
        </>
    );
}
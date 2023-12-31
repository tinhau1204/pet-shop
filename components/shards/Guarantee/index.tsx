import { Text } from "@mantine/core";
import Image from "next/image";
import React from "react";


function CardImage({ src, alt, text }: { src: string, alt: string, text: string }) {

    const [isOverlay, setIsOverlay] = React.useState(false);

    const openOverlay = () => {
        setIsOverlay(true);
    }

    const closeOverlay = () => {
        setIsOverlay(false);
    }
    return (
        <>
            <div className="w-full h-full px-2.5 gap-4 flex flex-col items-center justify-center " onClick={openOverlay}>
                <div className="p-2 rounded-xl shadow-[0_15px_20px_-15px_#e0d500] bg-primary cursor-pointer group hover:scale-105">
                    <div className="max-w-[200px] max-h-[200px] overflow-hidden">
                        <Image
                            src={src}
                            alt={alt}
                            width={200}
                            height={200}
                            sizes="auto"
                            className="object-cover object-center h-[200px] w-[200px] aspect-auto"
                        />
                    </div>

                    <div className="py-4 text-center group-hover:underline group-hover:underline-offset-2">
                        {text}
                    </div>
                </div>
            </div>

            {isOverlay && (
                <div className="flex fixed top-0 left-0 w-full h-full bg-black-bold/70 justify-center items-center z-50" onClick={closeOverlay}>
                    <span
                        className="absolute top-3 right-3 cursor-pointer text-primary text-4xl hover:scale-110"
                        onClick={closeOverlay}
                    >
                        &times;
                    </span>
                    <Image
                        src={src}
                        alt={alt}
                        width={1000}
                        height={1000}
                        sizes="auto"
                        className=" max-w-[90%] max-h-[90%] object-contain"
                    />
                </div>
            )}
        </>

    )
}

const data = [
    { src: "https://azpet.com.vn/wp-content/uploads/2022/03/hop-dong-mua-ban.jpg", alt: "contract", text: "Sale Contract" },
    { src: "https://azpet.com.vn/wp-content/uploads/2022/03/cam-ket-bao-hanh.jpg", alt: "warranty", text: "Warranty Commitment" },
    { src: "https://azpet.com.vn/wp-content/uploads/2021/05/so-tiem-20201222141643.jpg", alt: "vaccination", text: "Vaccination Book" },
    { src: "https://azpet.com.vn/wp-content/uploads/2021/07/Cam-nang.png.webp", alt: "care manual", text: "Care Manual Book" },
]

export default function Guarantee() {

    return (
        <div className="bg-yellow-light relative w-[100vw] left-[50%] right-[50%] mr-[-50vw] ml-[-50vw] pt-[32px] px-[16px] sm:px-0">
            <div className="base-container h-full overflow-hidden text-center">
                <Text
                    className="text-blue-bold text-2xl font-bold uppercase"
                >
                    Guarantee
                </Text>
                <div className="flex flex-row justify-center items-center content-stretch my-2 gap-x-2">
                    <span className="bg-blue-bold h-[2px] w-16"></span>
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8.35 3c1.18-.17 2.43 1.12 2.79 2.9c.36 1.77-.29 3.35-1.47 3.53c-1.17.18-2.43-1.11-2.8-2.89c-.37-1.77.3-3.35 1.48-3.54m7.15 0c1.19.19 1.85 1.77 1.5 3.54c-.38 1.78-1.63 3.07-2.81 2.89c-1.19-.18-1.84-1.76-1.47-3.53c.36-1.78 1.61-3.07 2.78-2.9M3 7.6c1.14-.49 2.69.4 3.5 1.95c.76 1.58.5 3.24-.63 3.73c-1.13.49-2.67-.39-3.46-1.96C1.62 9.75 1.9 8.08 3 7.6m18 0c1.1.48 1.38 2.15.59 3.72c-.79 1.57-2.33 2.45-3.46 1.96c-1.13-.49-1.39-2.15-.63-3.73C18.31 8 19.86 7.11 21 7.6m-1.67 10.78c.04.94-.68 1.98-1.54 2.37c-1.79.82-3.91-.88-5.9-.88c-1.99 0-4.13 1.77-5.89.88c-1-.49-1.69-1.79-1.56-2.87c.18-1.49 1.97-2.29 3.03-3.38c1.41-1.41 2.41-4.06 4.42-4.06c2 0 3.06 2.61 4.41 4.06c1.11 1.22 2.96 2.25 3.03 3.88" />
                        </svg>
                    </span>
                    <span className="bg-blue-bold h-[2px] w-16"></span>
                </div>

                <div className="py-8 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 place-content-center gap-y-4">
                    {
                        data.map((item, index) => (
                            <CardImage
                                src={item.src}
                                alt={item.alt}
                                text={item.text}
                                key={index}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    );
}
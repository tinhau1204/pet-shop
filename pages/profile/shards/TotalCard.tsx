import { Text } from "@mantine/core";

type CardTotalProps = {
    totalName: React.ReactNode;
    totalNum: React.ReactNode;
};

export default function CardTotal({ totalName, totalNum }: CardTotalProps) {
    return (
        <div className="relative flex flex-col py-2.5 justify-center items-center bg-gradient-to-b from-blue-bold/90 to-black-light overflow-hidden">
            <div className="bg-primary w-14 h-14 absolute top-3 -left-[28px] rotate-45"></div>
            <div className="bg-primary w-14 h-14 absolute top-3 -right-[28px] rotate-45"></div>
            <Text className="text-lg text-primary">{totalName}</Text>
            <Text className="text-2xl font-semibold text-primary">
                {totalNum}
            </Text>
        </div>
    );
}

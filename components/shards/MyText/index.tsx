import { Text, TextProps } from "@mantine/core";

export type MyTextProps = {
    children?: any;
    styles?: Omit<TextProps, "fz">;
    type: "heading" | "body";
};

function MyText(props: MyTextProps) {
    const { children, styles, type } = props;
    let fz = null;
    if (type === "heading") {
        fz = {
            base: "20px",
            xs: "20px",
            sm: "24px",
            md: "28px",
            lg: "36px",
            xl: "46px",
        };
    } else {
        fz = {
            base: "12px",
            md: "14px",
            lg: "16px",
            xl: "20px",
        };
    }

    return (
        <Text {...styles} fz={{ ...fz }}>
            {children}
        </Text>
    );
}

export default MyText;

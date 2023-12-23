export const Size = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
};

export type UISize = keyof typeof Size;

export const openColor = {
    dark: "dark",
    gray: "gray",
    red: "red",
    pink: "pink",
    grape: "grape",
    violet: "violet",
    indigo: "indigo",
    blue: "blue",
    cyan: "cyan",
    teal: "teal",
    green: "green",
    lime: "lime",
    yellow: "yellow",
    orange: "orange",
    white: "white",
};

export type UIColor = keyof typeof openColor;

export const borderColorVariant = {
    dark: "border-black",
    gray: "border-gray-500",
    red: "border-red-500",
    pink: "border-pink-500",
    grape: "border-purple-500",
    violet: "border-violet-500",
    indigo: "border-indigo-500",
    blue: "border-blue-500",
    cyan: "border-cyan-500",
    teal: "border-teal-500",
    green: "border-green-500",
    lime: "border-lime-500",
    yellow: "border-yellow-500",
    orange: "border-orange-500",
    white: "border-white",
};

export const textColor = {
    dark: "text-black",
    gray: "text-gray-400",
    darkGray: "text-gray-700",
    red: "text-red-700",
    pink: "text-pink-700",
    grape: "text-purple-700",
    violet: "text-violet-700",
    indigo: "text-indigo-700",
    blue: "text-blue-500",
    cyan: "text-cyan-700",
    teal: "text-teal-600",
    green: "text-green-700",
    lime: "text-lime-700",
    yellow: "text-yellow-500",
    orange: "text-orange-600",
    white: "text-white",
};

export type UItextColor = keyof typeof textColor;

export type UIborderColorVariant = keyof typeof borderColorVariant;

export const Variant = {
    filled: "filled",
    light: "light",
    outline: "outline",
    default: "default",
    subtle: "subtle",
};

export type UIVariant = keyof typeof Variant;

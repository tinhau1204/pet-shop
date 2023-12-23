import { useState, useCallback } from "react";
const Cookies = require("js-cookie");
export default function useCookie(name: string, defaultValue?: string) {
    const [value, setValue] = useState(() => {
        const cookie = Cookies.get(name);
        if (cookie) {
            return cookie;
        }
        Cookies.set(name, defaultValue);
        return defaultValue;
    });

    const udpateCookie = useCallback(
        (newValue: string, options?: string) => {
            Cookies.set(name, newValue, options);
            setValue(newValue);
        },
        [name],
    );

    const deleteCookie = useCallback(() => {
        Cookies.remove(name);
        setValue(null);
    }, [name]);

    return [value, udpateCookie, deleteCookie];
}

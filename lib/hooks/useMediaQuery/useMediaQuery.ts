import { useState, useEffect } from "react";
import useEventListener, {
    eventListenerProps,
} from "../useEvenlistener/useEvenlistener";

export default function useMediaQuery(mediaQuery: string): boolean {
    const [isMatch, setIsMatch] = useState(false);
    const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
        null,
    );
    const eventListener: eventListenerProps = {
        eventType: "change",
        callback: (e: any) => setIsMatch(e.matches),
        element: mediaQueryList,
    };
    useEffect(() => {
        const list = window.matchMedia(mediaQuery);
        setMediaQueryList(list);
        setIsMatch(list.matches);
    }, [mediaQuery]);

    useEventListener(eventListener);

    return isMatch;
}

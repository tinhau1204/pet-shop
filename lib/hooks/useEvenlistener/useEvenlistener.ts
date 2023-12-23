import { useEffect, useRef } from "react";

export type eventListenerProps = {
    eventType: keyof WindowEventMap;
    callback: (e: Event) => void;
    element: any;
};

export default function useEventlistener({
    eventType,
    callback,
    element = window,
}: eventListenerProps) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (element == null) return;
        const handler = (e: any) => callbackRef.current(e);
        element.addEventListener(eventType, handler);

        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]);
}

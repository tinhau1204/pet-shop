import "@/styles/globals.scss";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import {
    MantineBreakpointsValues,
    MantineProvider,
    createTheme,
} from "@mantine/core";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "@redux/store";
import localFont from "next/font/local";
import Header from "@/components/shards/Header";
import Footer from "@/components/shards/Footer";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
import BreadCrumbs from "@/components/shards/BreadCrumbs";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";

const myFont = localFont({
    src: [
        {
            path: "../public/fonts/SVNGilroy-Light.woff",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/SVNGilroy-Bold.woff",
            weight: "700",
            style: "normal",
        },
    ],
});

const fullConfig = resolveConfig(tailwindConfig);

const breakpointsTailwind = fullConfig.theme
    ?.screens as MantineBreakpointsValues;

const theme = createTheme({
    fontFamily: myFont.style.fontFamily,
    breakpoints: breakpointsTailwind,
});

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

function MyApp({ Component, pageProps }: AppProps) {
    const [isLogin, setIsLogin] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log(" window.location :>> ", window.location);
        if (
            window.location.pathname == "/auth/login" ||
            window.location.pathname == "/auth/register" ||
            window.location.pathname == "/auth/verified" ||
            window.location.pathname == "/auth/verifiedRegister"
        )
            setIsLogin(true);

        return () => {
            setIsLogin(false);
        };
    }, [router.asPath]);

    return (
        <MantineProvider withCssVariables={false} theme={theme}>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ToastContainer />
                    {isLogin ? (
                        <LoginLayout>
                            <Component {...pageProps} />
                        </LoginLayout>
                    ) : (
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    )}
                </QueryClientProvider>
            </Provider>
        </MantineProvider>
    );
}

function Layout({ children }: any) {
    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
            <div className="base-container">
                <Header />
                <BreadCrumbs
                    homeElement={"Home"}
                    separator={
                        <span className="text-center px-2"> {">"} </span>
                    }
                    activeClasses="text-gray-500"
                    containerClasses="flex py-5 text-black-normal"
                    listClasses="hover:underline hover:text-blue-medium font-normal text-sm pt-0.5"
                    capitalizeLinks
                />
                {children}
                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
}

function LoginLayout({ children }: any) {
    return (
        <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
            <div className="base-container">{children}</div>
        </GoogleOAuthProvider>
    );
}
export default MyApp;

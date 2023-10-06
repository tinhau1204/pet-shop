import "@styles/globals.scss";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@redux/store";
import localFont from "next/font/local";
import Header from "@/components/shards/Header";
import Footer from "@/components/shards/Footer";

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

const theme = createTheme({
    fontFamily: myFont.style.fontFamily,
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme}>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </MantineProvider>
    );
}

function Layout({ children }: any) {
    return (
        <div className="base-container">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
export default MyApp;

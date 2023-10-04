import "@styles/globals.scss";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@redux/store";

const theme = createTheme({});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </MantineProvider>
    );
}
export default MyApp;

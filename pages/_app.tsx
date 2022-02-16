import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RuffleDataProvider } from "../hooks/RuffleDataContext";
import { enableMapSet } from "immer";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  enableMapSet();
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: "mantine", prepend: false }}
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <RuffleDataProvider>
          <Component {...pageProps} />
        </RuffleDataProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;

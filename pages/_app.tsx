import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RuffleDataProvider } from "../hooks/RuffleDataContext";
import { enableMapSet } from "immer";

function MyApp({ Component, pageProps }: AppProps) {
  enableMapSet();
  return (
    <RuffleDataProvider>
      <Component {...pageProps} />
    </RuffleDataProvider>
  );
}

export default MyApp;

import Document, { Html, Main, NextScript, Head } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="portal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="shortcut icon"
          href={process.env.NODE_ENV === 'production' ? "/ptice-ispita/favicon.ico" : "/favicon.ico"}
          type="image/x-icon"
          sizes="16x16"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

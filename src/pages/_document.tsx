import React from 'react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

// avoid CSS animation transition flashing
export const DISABLE_SSR_TRANSITION = 'disable-SSR-transition';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="no-js">
        <Head>
          <meta name="referrer" content="no-referrer" />
          <link rel="icon" href="/favicons/favicon.svg" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content="Web site created using mkn (with Next.js and typescript)" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <link rel="apple-touch-icon" href="/favicons/logo192.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Self hosted font */}
          <link rel="stylesheet" href="/fonts/Avenir/styles.css" />
          <link rel="stylesheet" href="/fonts/AzoSans/styles.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

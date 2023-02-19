import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import React, { Suspense } from "react";
import App from "next/app";

// @ts-ignore
import Layout from 'host/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Suspense>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

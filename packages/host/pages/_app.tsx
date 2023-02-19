import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

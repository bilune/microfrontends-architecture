import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";
import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from "@module-federation/nextjs-mf/utils";

class MyDocument extends Document<{ chunks: string[] }> {
  static async getInitialProps(ctx: DocumentContext) {
    const url = `${process.env.BASE_PATH}${ctx.req!.url!}`;

    if (process.env.NODE_ENV === "development" && !url.includes("_next")) {
      await revalidate().then((shouldReload) => {
        if (shouldReload) {
          ctx.res!.writeHead(302, { Location: url });
          ctx.res!.end();
        }
      });
    } else {
      ctx?.res?.on("finish", () => {
        revalidate();
      });
    }

    const chunks = await flushChunks();

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      chunks,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          <FlushedChunks chunks={this.props.chunks} />
        </Head>

        <body className="bg-background-grey">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

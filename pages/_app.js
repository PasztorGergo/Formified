import { Footer } from "../components";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="title" content="Formified | Professional Form editor" />
        <meta
          name="description"
          content="Create beautiful forms for your web pages with Formified! Add inputs, selections, headings, and many more."
        />
        <meta name="og:title" content="Formified | Professional Form editor" />
        <meta
          name="og:description"
          content="Create beautiful forms for your web pages with Formified! Add inputs, selections, headings, and many more."
        />
        <link rel="icon" href="/images/formified_logo.svg" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

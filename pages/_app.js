import "../styles/globals.scss";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Konwenty Północne</title>
        <link rel="shortcut icon" href="/icon.svg" />
        <meta name="description" content="Lista konwentów z pierwszej ręki!" />
        <meta
          name="keywords"
          content="konwenty,konwenty północne,konwenty-północne,konpoly,konpóły,anime,manga,madzian,mahjong,fantasy,confamilia,zabenka"
        ></meta>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://konwenty-polnocne.pl" />
        <meta property="og:title" content="Konwenty Północne" />
        <meta
          property="og:description"
          content="Lista konwentów z pierwszej ręki!"
        />
        <meta
          property="og:image"
          content="https://konwenty-polnocne.pl/icon.png"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

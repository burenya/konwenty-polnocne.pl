import Head from "next/head";
import Header from "../components/header";
import Foot from "../components/footer";
const data = require("../data/lista.json");

let konwenty = [];
data.konwenty.forEach((x) => {
  konwenty.push(
    <div className="konwent" href={x.link}>
      <div>
        <p className="data">{x.data}</p>
        <p className="miasto">{x.miasto}</p>
      </div>
      <p className="nazwa">{x.nazwa}</p>
      <p className="typ">{x.typ}</p>
    </div>
  );
});
export default function Home() {
  return (
    <>
      <Head>
        <title>Konwenty Północne</title>
        <link rel="shortcut icon" href="/icon.svg" />
        <meta name="description" content="Lista konwentów z pierwszej ręki!" />
        <meta name="keywords" content="konwenty,konwenty północne,konwenty-północne,konpoly,konpóły,anime,manga,madzian,mahjong,fantasy,confamilia,zabenka"></meta>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://konwenty-polnocne.pl" />
        <meta property="og:title" content="Konwenty Północne" />
        <meta property="og:description" content="Lista konwentów z pierwszej ręki!" />
        <meta property="og:image" content="https://konwenty-polnocne.pl/icon.png" />
      </Head>
      <Header />
      <section>{konwenty}</section>
      <Foot />
    </>
  );
}

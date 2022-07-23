import Head from "next/head";
import Header from "../components/header";
import Foot from "../components/footer";
const data = require("../data/example.json");

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
        <title>KonwentyPółnocne</title>
        <link rel="shortcut icon" href="/icon.svg" />
      </Head>
      <Header />
      <section>{konwenty}</section>
      <Foot />
    </>
  );
}

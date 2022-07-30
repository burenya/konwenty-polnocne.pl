import Header from "../components/header";
import Foot from "../components/footer";
import { Blob } from "../icons/icons";
const data = require("../data/lista.json");

let konwenty = [];
data.konwenty.forEach((x) => {
  konwenty.push(
    <div className="konwent">
      <h1>{x.nazwa}</h1>
      <div className="bottom">
        <p className="name_bottom">{x.nazwa}</p>
        <hr />
        <p className="data_bottom">{x.data}</p>
      </div>
      <div className=""></div>
      <Blob></Blob>
    </div>
  );
});
export default function Home() {
  return (
    <>
      <Header />
      <section>{konwenty}</section>
      <Foot />
    </>
  );
}

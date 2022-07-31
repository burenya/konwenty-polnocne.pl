import Header from "../components/header";
import Foot from "../components/footer";
import { Blob } from "../icons/icons";
const data = require("../data/lista.json");

let konwenty = [];
data.konwenty.forEach((x) => {
  konwenty.push(
    <div className="konwent">
      <div className="bottom">
        <p className="name_bottom">{x.nazwa.toLocaleLowerCase()}</p>
        <hr />
        <p className="data_bottom">{x.data}</p>
      </div>

      <div className="info">
        <div>{x.miasto}</div>
        <div>{x.typ}</div>
      </div>
      <Blob className="blob"></Blob>
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

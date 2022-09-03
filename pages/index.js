import Header from "../components/header";
import Foot from "../components/footer";
import { Blob } from "../icons/icons";
const colors = require("../data/config.json");
const data = require("../data/lista.json");

let jakie = [];
let gdzie = [];
let created = [];
let konwenty = [];
data.konwenty.forEach((x) => {
  if (!created.includes(x.typ)) {
    created.push(x.typ);
    jakie.push(
      <label className="checkbox">
        <input type="checkbox" />
        <div className="bubble">
          <p>{x.typ}</p>
        </div>
      </label>
    );
  }
  if (!created.includes(x.miasto)) {
    created.push(x.miasto);
    gdzie.push(
      <label className="checkbox">
        <input type="checkbox" />
        <div className="bubble">
          <p>{x.miasto}</p>
        </div>
      </label>
    );
  }
  let rng_color = Math.floor(Math.random() * 10);
  konwenty.push(
    <div
      className="konwent"
      style={{
        "background-color": colors.colors[rng_color].bg_color,
      }}
    >
      <h1>{x.nazwa.toLocaleUpperCase()}</h1>
      <div className="div_footer">
        <div className="bottom">
          <p className="name_bottom">{x.nazwa.toLocaleLowerCase()}</p>
          <hr />
          <p className="data_bottom">{x.data}</p>
        </div>

        <div className="info">
          <div>{x.miasto}</div>
          <div>{x.typ}</div>
        </div>
      </div>
      <Blob
        className="blob"
        style={{ color: colors.colors[rng_color].ac_color }}
      ></Blob>
    </div>
  );
});
export default function Home() {
  return (
    <>
      <Header />
      <nav>
        <p>Jakie</p>
        <div>{jakie}</div>
        <p>Kiedy</p>
        <div></div>
        <p>Gdzie</p>
        <div>{gdzie}</div>
      </nav>
      <section>{konwenty}</section>
      <Foot />
    </>
  );
}

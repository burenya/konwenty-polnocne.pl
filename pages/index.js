import Header from "../components/header";
import Foot from "../components/footer";
import { Blob, Glob, Stars } from "../icons/icons";
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
      <div className="hoverable"></div>
      <h1>{x.nazwa.toLocaleUpperCase()}</h1>
      <Blob
        className="blob"
        style={{ color: colors.colors[rng_color].ac_color }}
      ></Blob>
      <div className="menu">
        <a
          className="plan"
          style={{ "background-color": colors.colors[rng_color].ac_color }}
        >
          <p>
            Plan <br />
            konwentu
          </p>
        </a>
        <a
          className="link"
          style={{ "background-color": colors.colors[rng_color].ac_color }}
        >
          <p>
            Strona
            <br /> organizatora
          </p>
        </a>
        <a
          className="calendar"
          style={{ "background-color": colors.colors[rng_color].ac_color }}
        >
          <p>Dodaj do kalendarza</p>
        </a>
      </div>
      <div className="div_footer">
        <div className="bottom">
          <div>
            <p className="name_bottom">{x.nazwa.toLocaleLowerCase()}</p>
            <hr />
          </div>
          <div>
            <hr />
            <p className="data_bottom">{x.data}</p>
          </div>
        </div>

        <div className="info">
          <div>
            <Glob className="icon" />
            <p>{x.miasto}</p>
          </div>
          <div>
            <Stars className="icon" />
            <p>{x.typ}</p>
          </div>
        </div>
      </div>
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

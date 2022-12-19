import Header from "../components/header";
import Foot from "../components/footer";
import { Blob, Glob, Stars } from "../icons/icons";
const colors = require("../data/config.json");
const data = require("../data/lista.json");
const config = require("../assets/config.json");

<<<<<<< HEAD
let months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];
=======
let jakie = [];
let gdzie = [];
let created = [];
>>>>>>> dc412369a0e387237b6ada4f47db0eac58aa7c07
let konwenty = [];
let city = [];
let month = [];
let year = [];
let type = [];
function banner(konwent) {
  let current = config.filter(function (e) {
    return e.name == konwent.nazwa;
  });
  let img = [];
  if (current[0] != undefined) {
    for (let i = 0; i < current[0].count; i++) {
      img.push(<img src={current[0].name.replaceAll(" ", "_") + i + ".svg"} />);
    }
    console.log(img);
    return img;
  }
}

data.konwenty.forEach((x) => {
<<<<<<< HEAD
  const date = x.data.split(/[.]/g);

  konwenty.push(
    <div
      className={
        "konwent" +
        " " +
        x.typ +
        " " +
        x.miasto +
        " " +
        months[Number(date[1]) + 1] +
        " " +
        date[2]
      }
    >
      <div className="banner">{banner(x)}</div>
      <div className="content">
        <div className="bottom">
          <p className="name_bottom">{x.nazwa.toLocaleLowerCase()}</p>
          <hr />
          <p className="data_bottom">{x.data}</p>
        </div>
        <div className="info">
          <div>{x.miasto}</div>
          <div>{x.typ}</div>
=======
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
      <div className="hoverable">
        <h1 className="fit">{x.nazwa.toLocaleUpperCase()}</h1>
      </div>
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
>>>>>>> dc412369a0e387237b6ada4f47db0eac58aa7c07
        </div>
      </div>
    </div>
  );
});
export default function Home() {
  return (
    <>
      <Header />
<<<<<<< HEAD
      <nav></nav>
=======
      <nav>
        <p>Jakie</p>
        <div>{jakie}</div>
        <p>Kiedy</p>
        <div></div>
        <p>Gdzie</p>
        <div>{gdzie}</div>
      </nav>
>>>>>>> dc412369a0e387237b6ada4f47db0eac58aa7c07
      <section>{konwenty}</section>
      <Foot />
    </>
  );
}

import Header from "../components/header";
import Foot from "../components/footer";
import { Blob } from "../icons/icons";
const data = require("../data/lista.json");
const config = require("../assets/config.json");

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
        </div>
      </div>
      <Blob className="blob"></Blob>
    </div>
  );
});
export default function Home() {
  return (
    <>
      <Header />
      <nav></nav>
      <section>{konwenty}</section>
      <Foot />
    </>
  );
}

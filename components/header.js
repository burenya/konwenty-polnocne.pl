import { Zabenka } from "../icons/icons";

export default function Home() {
  return (
    <header>
      <div className="bubble">
        <Zabenka className="icon"></Zabenka>
        <p>Konwenty Północne</p>
      </div>
      <input className="bubble" type="text"></input>
    </header>
  );
}

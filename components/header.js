import { Zabenka, Search } from "../icons/icons";

export default function Home() {
  return (
    <header>
      <div className="bubble">
        <Zabenka className="icon"></Zabenka>
        <p>Konwenty Północne</p>
      </div>
      <form className="bubble">
        <Search className="icon"></Search>
        <input type="search" placeholder="Szukaj" />
      </form>
    </header>
  );
}

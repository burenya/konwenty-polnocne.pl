import { Zabenka, Search } from "../icons/icons";

export default function Home() {
  return (
    <header>
      <div className="bubble">
        <Zabenka className="icon"></Zabenka>
        <p>Konwenty Północne</p>
      </div>
<<<<<<< HEAD
      <input className="bubble" type="text"></input>
=======
      <form className="bubble">
        <Search className="icon"></Search>
        <input type="search" placeholder="Szukaj" />
      </form>
>>>>>>> dc412369a0e387237b6ada4f47db0eac58aa7c07
    </header>
  );
}

export const WelcomePage = () => {
  return (
    <div className="App">
      <h1 className={"primary"}>Zagraj z innymi w newonce.play</h1>
      <p className={"primary"}>
        Tu jest taki piękny opis co ta gra robi, dla kogo jest i co można w
        ogóle w niej zrobić :P
      </p>
      <h2 className="label">Podaj imię</h2>
      <input id="name" placeholder="Twoje imię"/>
      <button className="primary">lecimy</button>
    </div>
  );
}
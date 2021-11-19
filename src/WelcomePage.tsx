import { useState, useRef } from "react";

export const WelcomePage = () => {

  // const [username, setUsername] = useState("")
  const username = useRef(null);

  const login = () => {
    const name = username.current!
    const uname = name['value']
    console.log(uname)

    fetch("https://api.newoncequiz.pl/api/users",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: uname})
    })
  }


  return (
    <div>
      <h1 className={"primary"}>Zagraj z innymi w newonce.play</h1>
      <p className={"primary"}>
        Tu jest taki piękny opis co ta gra robi, dla kogo jest i co można w
        ogóle w niej zrobić :P
      </p>
      <h2 className="label">Podaj imię</h2>
      <input id="name" placeholder="Twoje imię" ref={username}/>
      <button onClick={login} className="primary">lecimy</button>
    </div>
  );
}
import { useRef } from "react";
import { useNavigate } from "react-router";


export const WelcomePage = () => {

  const username = useRef(null);
  const nav = useNavigate()

  const login = async () => {
    const name = username.current!
    const uname = name['value']

    const data = await fetch("https://api.newoncequiz.pl/api/users",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: uname})
    })

    const user = await data.json()

    nav(`/categories?userId=${user.id}`);
    
  }


  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <h1 className={"primary"}>Zagraj z innymi w newonce quiz</h1>
      <p className={"primary"}>
        Tu jest taki piękny opis co ta gra robi, dla kogo jest i co można w
        ogóle w niej zrobić :P
      </p>
      <h2 className="label">Podaj imię</h2>
      <input id="name" placeholder="Twoje imię" ref={username}/>
      <button onClick={login} className="primary">lecimy</button>
      <div style={{flex: 1}}></div>
      <div style={{height: 100}}>
        <img src="/logo.png" height="41" width="112"/>
      </div>
    </div>
  );
}
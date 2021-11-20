import { useRef } from "react";
import { useNavigate } from "react-router";
import { API_ADDRESS } from "./constants";


export const WelcomePage = () => {

  const username = useRef(null);
  const nav = useNavigate()

  const login = async () => {
    const name = username.current!
    const uname = name['value']

    const data = await fetch(`${API_ADDRESS}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: uname }),
    });

    const user = await data.json()

    nav(`/categories?userId=${user.id}`);
    
  }

  return (
    <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
      <h1 className={"primary"}>Zagraj z innymi w newonce quiz</h1>
      <p className={"primary"}>
        Dla członków newonce.club rywalizuj z innymi o nagrody i sprawdźjak bardzo znasz niuanse!
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
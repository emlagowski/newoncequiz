import { useRef } from "react";
import { useNavigate } from "react-router";


export const WelcomePage = () => {

  const username = useRef(null);
  const nav = useNavigate()

  const login = async () => {
    const name = username.current!
    const uname = name['value']
    console.log(uname)

    const data = await fetch("https://api.newoncequiz.pl/api/users",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: uname})
    })

    const user = await data.json()

    nav(`/categories?userSlug=${user.slug}`)
    
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

      <button onClick={() => nav('/rank')} className="primary">wyniki (do skasowania)</button>
    </div>
  );
}
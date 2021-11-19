import { useLocation, useParams } from "react-router";
import useFetch from "use-http";

interface GameResponse {
  game: Game;
}

interface Game {
  id: string;
  questions: Question[]
}

interface Question {
  number: number;
  article: string;
  coverUri: string;
  randomSong: string;
  answer: string;
  possibleAnswers: string[];
  resultImageUri: string;
}

export const GamePage = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search)
  const categoryId = searchParams.get("categoryId");
  const userSlug = searchParams.get("userSlug");
  const { loading, data = null } = useFetch<GameResponse>(
    `https://api.newoncequiz.pl/api/games`,
    {
      method: "POST",
      body: {
        userId: userSlug,
        categoryId: categoryId,
      },
    },
    []
  );
  return (
    <div>
      <h1>Gra {data?.game.id}</h1>
    </div>
  );
}

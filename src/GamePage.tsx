import { useCallback, useState } from "react";
import { useLocation, useParams } from "react-router";
import useFetch from "use-http";
import { Loading } from "./components/Loading";
import { QuestionPage } from "./QuestionPage";

interface GameResponse {
  game: Game;
}

interface Game {
  id: string;
  questions: Question[]
}

export interface Question {
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


  const [gameResult, setGameResult] = useState(0);
  const [questionId, setQuestionId] = useState(0);

  const onSuccess = useCallback(
    (points: number) => {
      console.log("success");
      setGameResult(gameResult + points);
    },
    [gameResult]
  );

  const onFailure = useCallback(() => {
    console.log("failure");
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <QuestionPage question={data?.game.questions[questionId]!} onSuccess={onSuccess} onFailure={onFailure}/>
    </div>
  );
}

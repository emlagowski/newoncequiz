import { useCallback, useState } from "react";
import { useLocation, useParams } from "react-router";
import useFetch from "use-http";
import { Loading } from "./components/Loading";
import { QuestionPage } from "./QuestionPage";
import { QuestionSummaryPage } from "./QuestionSummaryPage";

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

  const [showQuestionSummary, setShowQuestionSummary] = useState<boolean | null>(null)

  const onNextQuestion = useCallback(() => {
    setQuestionId(questionId + 1);
    setShowQuestionSummary(null)
  }, [])

  const onSuccess = useCallback(
    (points: number) => {
      console.log("success");
      setGameResult(gameResult + points);
      setShowQuestionSummary(true);
    },
    [gameResult]
  );

  const onFailure = useCallback(() => {
    console.log("failure");
    setShowQuestionSummary(false)
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {showQuestionSummary === null ?
        <QuestionPage
          question={data?.game.questions[questionId]!}
          onSuccess={onSuccess}
          onFailure={onFailure}
        /> : <QuestionSummaryPage success={showQuestionSummary!} question={data?.game.questions[questionId]!} onNextQuestion={onNextQuestion} />
      }
    </div>
  );
}

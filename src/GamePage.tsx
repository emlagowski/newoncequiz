import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useFetch, { CachePolicies } from "use-http";
import { Loading } from "./components/Loading";
import { API_ADDRESS } from "./constants";
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
  const navigate = useNavigate();
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const categoryId = searchParams.get("categoryId");
  const userId = searchParams.get("userId");
  const { loading, data = null } = useFetch<GameResponse>(
    `${API_ADDRESS}/api/games`,
    {
      method: "POST",
      cache: "no-cache",
      cachePolicy: CachePolicies.NETWORK_ONLY,
      body: {
        userId: userId,
        categoryId: categoryId,
      }
    },
    []
  );

  const { post: postGameResults } = useFetch(
    `${API_ADDRESS}/api/games/results`,
    {
      method: "POST",
      cache: "no-cache",
      cachePolicy: CachePolicies.NETWORK_ONLY,
    }
  );

  const [gameResult, setGameResult] = useState(0);
  const [questionId, setQuestionId] = useState(0);

  // best hax ever
  // positive value = has result, show summary, success
  // negative value = has result, show summary, failure
  // null value = no result, show question
  const [showQuestionSummary, setShowQuestionSummary] = useState<number | null>(null)

  const onNextQuestion = useCallback(() => {
    if (questionId + 1 < data?.game.questions.length!) {
      console.log("next question " + questionId + 1);
      setQuestionId(questionId + 1);
      setShowQuestionSummary(null);
    } else {
      console.log("no more questions. go to results " + questionId);
      postGameResults({
        gameId: data?.game.id,
        score: gameResult.toString(),
      }).then(() => {
        navigate(`/game/result?gameId=${data?.game.id}&userId=${userId}`);
      });
    }
  }, [data, questionId, gameResult, userId, setShowQuestionSummary, navigate, postGameResults]);

  const onSuccess = useCallback(
    (points: number) => {
      console.log("success");
      setGameResult(gameResult + points);
      setShowQuestionSummary(points);
    },
    [gameResult]
  );

  const onFailure = useCallback(() => {
    console.log("failure");
    setShowQuestionSummary(-1)
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {showQuestionSummary === null ? (
        <QuestionPage
          question={data?.game.questions[questionId]!}
          questionsCount={data?.game.questions.length!}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      ) : (
        <QuestionSummaryPage
          questionPoints={showQuestionSummary}
          success={showQuestionSummary > 0}
          question={data?.game.questions[questionId]!}
          onNextQuestion={onNextQuestion}
        />
      )}
    </div>
  );
}

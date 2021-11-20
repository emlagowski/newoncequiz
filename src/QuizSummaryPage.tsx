import { useLocation } from "react-router-dom";
import useFetch from "use-http";
import { Loading } from "./components/Loading";
import { QuestionImageCover } from "./components/questionImageCover/QuestionImageCover";
import { RankItem } from "./components/rankItem/RankItem";
import { Question } from "./GamePage";


interface Rankings {
  rankings: Ranking[]
}

interface Ranking {
  place: number;
  name: string;
  slug: string;
  score: number
}

export const QuizSummaryPage = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const gameId = searchParams.get("gameId");
  const userId = searchParams.get("userId");
  const { loading, data = null } = useFetch<Rankings>(`https://api.newoncequiz.pl/api/rankings/game/${gameId}`, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="primary">W rankingu dziennym zajmujesz:</h2>
      {data?.rankings.map((ranking, index) => {
        return <div key={ranking.slug} style={{ width: `${100-index*10}%` }}>
          <RankItem
            active={ranking.name === userId}
            name={ranking.name}
            place={ranking.place}
            points={ranking.score}
          />
        </div>;
      })}
    </div>
  );
};

import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch, { CachePolicies } from "use-http";
import { Loading } from "./components/Loading";
import { RankItem } from "./components/rankItem/RankItem";
import { API_ADDRESS } from "./constants";


interface Rankings {
  rankings: Ranking[]
}

interface Ranking {
  place: number;
  name: string;
  slug: string;
  score: number;
  thisUser: boolean;
}

export const QuizSummaryPage = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const gameId = searchParams.get("gameId");
  const userId = searchParams.get("userId");
  const { loading, data = null } = useFetch<Rankings>(
    `${API_ADDRESS}/api/rankings/game/${gameId}`,
    { cache: "no-cache", cachePolicy: CachePolicies.NETWORK_ONLY }, []
  );
  const link = window.location.href + `?gameId=${gameId}&userId=${userId}`;
  const navigate = useNavigate();
  
  const onGoToCategories = useCallback(() => {
    navigate(`/categories?userId=${userId}`);
  }, [])
  
  const onShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: `Sprawdź mój wynik w newonce quiz!`,
          text: `prawdź mój wynik w newonce quiz!`,
          url: link,
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the blog", error);
        });
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="primary">W rankingu dziennym zajmujesz:</h2>
      {data?.rankings.map((ranking, index) => {
        return (
          <div key={ranking.slug} style={{ width: `${100 - index * 10}%` }}>
            <RankItem
              active={ranking.thisUser}
              name={ranking.slug}
              place={ranking.place}
              points={ranking.score}
            />
          </div>
        );
      })}
      <button className="primary" style={{ marginTop: "64px" }} onClick={onShare}>
        UDOSTĘPNIJ!
      </button>
      <button style={{ marginTop: "24px" }} onClick={onGoToCategories}>
        ZAGRAJ JESZCZE RAZ
      </button>
    </div>
  );
};

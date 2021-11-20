import "./categories.css";
import { Loading } from "./components/Loading";
import { useLocation, useNavigate } from "react-router";
import { API_ADDRESS } from "./constants";
import useFetch, { CachePolicies } from "use-http";

interface Category {
  id: string;
  type: string;
  typeName: string;
  playedUsersCount: number;
  leftTriesCount: number;
  maxTriesCount: number;
}

interface Categories {
  categories: Category[]
}

export const CategoryPage = () => {
  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("userId");
  const navigate = useNavigate();
  const { loading, data = null } = useFetch<Categories>(
    `${API_ADDRESS}/api/quiz-categories?userId=${userId}`, { cache: "no-cache", cachePolicy: CachePolicies.NETWORK_ONLY }, []
  );

  if (loading) {
    return <Loading />;
  }

  const onOpenCategory = (category: Category) => {
    console.log(category);
    navigate(`/game?categoryId=${category.id}&userId=${userId}`);
  };

  return (
    <div>
      <h1>Wybierz kategorię</h1>
      {data?.categories.map((category) => (
        <div key={category.type} className="category-item">
          <button
            style={{ marginBottom: "7px" }}
            onClick={() => onOpenCategory(category)}
          >
            {category.typeName}
          </button>
          <div className="hstack">
            <div className="primary" style={{ fontFamily: "HelveticaNowText" }}>
              próby  {category.leftTriesCount}/{category.maxTriesCount}
            </div>
            <div className="primary" style={{ fontFamily: "HelveticaNowText" }}>
              zagrano {category.playedUsersCount} razy
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

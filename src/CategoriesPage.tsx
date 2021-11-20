import "./categories.css";
import useFetch from "use-http";
import { Loading } from "./components/Loading";
import { useLocation, useNavigate, useParams } from "react-router";

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
  const userSlug = new URLSearchParams(search).get("categorySlug");
  const navigate = useNavigate();
  const { loading, data = null } = useFetch<Categories>(
    `https://api.newoncequiz.pl/api/quiz-categories?userId=${userSlug}`,
    []
  );

  if (loading) {
    return <Loading />;
  }

  const onOpenCategory = (category: Category) => {
    console.log(category);
    navigate(`/game?categoryId=${category.id}&userSlug=${userSlug}`);
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
            <div className="primary">
              zostało {category.leftTriesCount}/{category.maxTriesCount}
            </div>
            <div className="primary">gra {category.playedUsersCount} osób</div>
          </div>
        </div>
      ))}
    </div>
  );
};

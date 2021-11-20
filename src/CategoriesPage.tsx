import "./categories.css";
import useFetch from "use-http";
import { Loading } from "./components/Loading";

interface Category {
  typeName: string;
  playedUsersCount: number;
  leftTriesCount: number;
  maxTriesCount: number;
}

interface Categories {
  categories: Category[]
}

export const CategoryPage = () => {
  const { loading, data = null } = useFetch<Categories>(
    "https://api.newoncequiz.pl/api/quiz-categories?userId=m", []);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h1>Wybierz kategorię</h1>
      {data?.categories.map((category) => (
        <div className="category-item">
          <button style={{ marginBottom: "7px" }}>{category.typeName}</button>
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
}

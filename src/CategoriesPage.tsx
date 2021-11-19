import { useState } from "react";
import "./categories.css";
import useFetch from "use-http";

interface Category {
  typeName: string;
  playedUsersCount: number;
  leftTriesCount: number;
  maxTriesCount: number;
}

export const CategoryPage = () => {
  // const [] = useFetch("http")
  const [categories, setCategories] = useState<Category[]>([
      {
        typeName: "Muzyka",
        playedUsersCount: 100,
        leftTriesCount: 1,
        maxTriesCount: 2,
      },
      {
        typeName: "Film",
        playedUsersCount: 100,
        leftTriesCount: 1,
        maxTriesCount: 2,
      },
      {
        typeName: "Sport",
        playedUsersCount: 100,
        leftTriesCount: 1,
        maxTriesCount: 2,
      },
    ]);
  return (
    <div>
      <h1>Wybierz kategorię</h1>
      {categories.map((category) => (
        <div className="category-item">
          <button style={{marginBottom: "7px"}}>{category.typeName}</button>
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

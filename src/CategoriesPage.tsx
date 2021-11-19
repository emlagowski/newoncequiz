import { useState } from "react";
import "./categories.css";
import useFetch from "use-http";
import { Loading } from "./components/Loading";

interface Category {
  typeName: string;
  playedUsersCount: number;
  leftTriesCount: number;
  maxTriesCount: number;
}

export const CategoryPage = () => {
  const {
    loading,
    data = [],
  } = useFetch<Category[]>("https://api.newoncequiz.pl/api/categories", []);

  if (loading) {
    return <Loading/>
  }

  return (
    <div>
      <h1>Wybierz kategorię</h1>
      {data.map((category) => (
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

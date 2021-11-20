import { useLocation, useParams } from "react-router";

export const GamePage = () => {
  const search = useLocation().search;
  const categorySlug = new URLSearchParams(search).get("categorySlug");
  return (
    <div>
      <h1>Gra {categorySlug}</h1>
    </div>
  );
}

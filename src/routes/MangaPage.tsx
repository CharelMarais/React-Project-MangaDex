import { useLocation } from "react-router-dom";

export function MangaPage() {
  const location = useLocation();
  const test = location.state;

  console.log(test); // just here to test data for now

  return <h1>hi</h1>;
}

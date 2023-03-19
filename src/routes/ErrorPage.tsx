import { useRouteError } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import { Header } from "./Header";

export default function ErrorPage() {
  return (
    <div id="error-page" className="h-full w-full flex">
      <Header />
      <ErrorComponent />
    </div>
  );
}

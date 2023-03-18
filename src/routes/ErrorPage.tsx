import { useRouteError } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import { Header } from "./Header";

export default function ErrorPage() {
  // const error: any = useRouteError();
  // console.error(error);

  return (
    <div id="error-page" className="100% h-full">
      <Header />
      <ErrorComponent />
    </div>
  );
}

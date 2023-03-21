import { ErrorComponent } from "../components/ErrorComponent";
import { Header } from "./Header";

export default function ErrorPage() {
  return (
    <div id="error-page" className="flex h-full w-full">
      <Header />
      <ErrorComponent />
    </div>
  );
}

import { ErrorComponent } from "../components/ErrorComponent";
import { Header } from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div id="error-page" className="flex h-full w-full">
      <Header />
      <ErrorComponent />
    </div>
  );
}

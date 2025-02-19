import { Link } from "react-router-dom";
import { DropDownSelector } from "../components/DropDownSelector";
import logo from '../assets/img/logo.png';
import { useMatch } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigationHistory } from "../services/historyHook";

export function Header() {
  const { handleBack } = useNavigationHistory();
  const isHomePage = useMatch("/");

  return (
    <>
      <div className="fixed mb-2 flex w-full border-b-2 border-primary bg-accents h-[52px] justify-between shadow-md shadow-primary-accent z-10">
        {!isHomePage && (
          <button
            onClick={handleBack}
            className={`transform transition-all duration-300 ease-out ${
              isHomePage 
                ? "opacity-0 translate-x-[-20px] cursor-default" 
                : "opacity-100 translate-x-0 hover:text-primary-accent"
            }`}
            aria-label="Go back"
          >
            <IoIosArrowRoundBack className="h-full w-12 pb-[1px] text-3xl font-bold text-primary" />
          </button>
        )}
        {isHomePage && (
          <div className="w-16"></div>
        )}

        <Link to="/" className={`absolute transform transition-all duration-300 ease-out ${
            isHomePage 
              ? "left-0 -ml-0" 
              : "left-1/2 -ml-6"
          }`}>
          <img
            className="m-0 w-12 p-1 "
            src={logo}
            alt="logo"
          />
        </Link>

        {isHomePage && (
          <h1 className={`transform transition-all duration-500 ease-out origin-left flex items-center font-mono text-3xl font-bold uppercase text-primary antialiased justify-start${
            isHomePage 
              ? "scale-100 opacity-100" 
              : "scale-50 opacity-0"
          }`}>
            K<span className="text-lg">ame</span> H
            <span className="text-lg">ouse</span>
          </h1>
        )}
        <div className="flex items-center justify-center">
          <DropDownSelector />
        </div>
      </div>
    </>
  );
}
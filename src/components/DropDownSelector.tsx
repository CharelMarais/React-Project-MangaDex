import { useState, useRef, useEffect } from "react";
import { TbListSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import SearchManga from "./SearchManga";

export function DropDownSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        className="inline-flex items-center rounded-lg px-1 py-0 text-center focus:outline-none"
        type="button"
        aria-label="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <TbListSearch className="h-full w-full px-2 pb-[1px] text-3xl font-bold text-primary" />
      </button>

      <div
        ref={menuRef}
        id="dropdown-menu"
        className={`absolute z-50 mt-2 right-0 top-[42px] w-44 divide-y divide-gray-100 rounded-bl-lg border-l-2 border-b-2 border-primary bg-accents shadow-md shadow-primary-accent
          transform transition-all duration-200 ease-out origin-top-right
          ${isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"}`}
      >
        <ul className="text-sm text-primary" role="menu">
          <li className="">
            <SearchManga />
          </li>
          <li className="rounded text-lg hover:bg-secondary/40" onClick={() => setIsOpen(false)}>
            <Link className="block h-full w-full px-4 py-1" to="mangalist/createdAt">New Release</Link>
          </li>
          <li className="rounded text-lg hover:bg-secondary/40" onClick={() => setIsOpen(false)}>
            <Link className="block h-full w-full px-4 py-1" to="./mangalist/rating">Top Rated</Link>
          </li>
          <li className="rounded text-lg hover:bg-secondary/40" onClick={() => setIsOpen(false)}>
            <Link className="block h-full w-full px-4 py-1" to="./mangalist/followedCount">Most Popular</Link>
          </li>
          <li className="rounded text-lg hover:bg-secondary/40" onClick={() => setIsOpen(false)}>
            <Link className="block h-full w-full px-4 py-1" to="./mangalist/latestUploadedChapter">Latest</Link>
          </li>
          <li className="rounded text-lg hover:bg-secondary/40" onClick={() => setIsOpen(false)}>
            <Link className="block h-full w-full px-4 py-1" to="./favourites/">Favourites</Link>
          </li>
          <li className="rounded text-lg hover:bg-secondary/40" onClick={() => setIsOpen(false)}>
            <Link className="block h-full w-full px-4 py-1" to="./suspage/">Sus Page</Link>
          </li>
          {showInstallButton && (
            <li  className="rounded px-4 py-1 text-lg hover:bg-secondary/40" onClick={handleInstallClick}>
              Download App
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
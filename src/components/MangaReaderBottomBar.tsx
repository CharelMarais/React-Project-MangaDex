import { useState } from "react";
import AutoScrollSlider from "./AutoScrollSlider";
import { FaChevronDown } from "react-icons/fa";
import { useCurrentChapter } from "../store/currentChapterStore";
import { useNavigate } from "react-router-dom";

export function MangaReaderBottomBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const chapterStore = useCurrentChapter();

    // Check if previous chapter exists
    const hasPreviousChapter = chapterStore.hasPreviousChapter();

    const handleNextChapter = (e: React.MouseEvent) => {
        e.preventDefault();
        const nextChapter = chapterStore.goToNextChapter();
        const mangaId = chapterStore.currentMangaId;
        if (nextChapter) {
            navigate(`../manga/chapter/${nextChapter.id}`, { state: { mangaId } });
        }
    };

    const handlePrevChapter = (e: React.MouseEvent) => {
        e.preventDefault();
        const prevChapter = chapterStore.goToPreviousChapter();
        const mangaId = chapterStore.currentMangaId;
        if (prevChapter) {
            navigate(`../manga/chapter/${prevChapter.id}`, { state: { mangaId } });
        }
    };

    return (
        <div
            className={`bg-accents/90 fixed flex flex-col p-3 pb-1 rounded-t-2xl transition-all duration-200 ease-out ${
                isOpen ? "bottom-0" : "-bottom-[65px]"
            }`}
        >
            <div
                className="absolute h-8 bg-accents/90 rounded-t-full w-14 -top-8 left-1/2 -ml-7 flex justify-center items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaChevronDown
                    className={`text-primary h-10 w-5 -mb-1 transform transition-all duration-200 ease-out ${
                        isOpen ? "rotate-0" : "rotate-180"
                    }`}
                />
            </div>
            <AutoScrollSlider />
            <div className="navigation-buttons flex w-64 justify-between font-semibold">
                <button 
                    onClick={handlePrevChapter} 
                    className="block w-full"
                    disabled={!hasPreviousChapter}
                >
                    <div className={`flex py-1 ${
                        hasPreviousChapter 
                            ? "text-primary cursor-pointer" 
                            : "text-gray-500 cursor-not-allowed"
                    }`}>
                        <p className="w-full">Prev</p>
                    </div>
                </button>
                <button onClick={handleNextChapter} className="block w-full">
                    <div className="flex cursor-pointer py-1 text-primary">
                        <p className="w-full">Next</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
import { useState } from "react";
import AutoScrollSlider from "./AutoScrollSlider";
import { FaChevronDown } from "react-icons/fa";
import { useCurrentChapter } from "../store/currentChapterStore";
import { useNavigate } from "react-router-dom";

export function MangaReaderBottomBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const chapterStore = useCurrentChapter();

    const handleNextChapter = (e: React.MouseEvent) => {
        e.preventDefault();
        const nextChapter = chapterStore.goToNextChapter();
        if (nextChapter) {
            navigate(`../manga/chapter/${nextChapter.id}`);
        }
    };

    const handlePrevChapter = (e: React.MouseEvent) => {
        e.preventDefault();
        const prevChapter = chapterStore.goToPreviousChapter();
        if (prevChapter) {
            navigate(`../manga/chapter/${prevChapter.id}`);
        }
    };

    return (
        <div
            className={`bg-stone-800/80 fixed flex flex-col p-3 pb-1 rounded-t-2xl transition-all duration-200 ease-out ${
                isOpen ? "bottom-0" : "-bottom-[65px]"
            }`}
        >
            <div
                className="absolute h-8 bg-stone-800/80 rounded-t-full w-14 -top-8 left-1/2 -ml-7 flex justify-center items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaChevronDown
                    className={`text-amber-500 h-10 w-5 -mb-1 transform transition-all duration-200 ease-out ${
                        isOpen ? "rotate-0" : "rotate-180"
                    }`}
                />
            </div>
            <AutoScrollSlider />
            <div className="navigation-buttons flex w-64 justify-between">
                <button onClick={handlePrevChapter} className="block w-full">
                    <div className="flex cursor-pointer py-1 text-amber-500">
                        <p className="w-full">Prev</p>
                    </div>
                </button>
                <button onClick={handleNextChapter} className="block w-full">
                    <div className="flex cursor-pointer py-1  text-amber-500">
                        <p className="w-full">Next</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
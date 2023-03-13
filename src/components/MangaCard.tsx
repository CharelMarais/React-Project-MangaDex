import { useQuery } from "@tanstack/react-query";
import { IMangaCardProp } from "../props/coverProp";
import { getCoverById } from "../services/apicalls";
import { CoverData } from "../models/cover";
import { Link } from "react-router-dom";

export function MangaCard(props: IMangaCardProp) {
  const { managId, coverId, title, contentRating, mangaData } = props;

  const coverQuery = useQuery<CoverData, Error>(["coverQuery", coverId], () =>
    getCoverById(coverId)
  );

  const mangaListIsLoading = coverQuery.isLoading;
  const mangaListIsSuccess = coverQuery.isSuccess;

  if (!coverQuery.data?.attributes.fileName) return <></>;

  return (
    <Link to="">
      <div
        className={`border-2 border-amber-500 shadow-amber-500 shadow-inner overflow-hidden w-52 h-72 bg-no-repeat bg-cover bg-center rounded m-1 flex flex-col-reverse`}
        style={{
          backgroundImage: `url('https://uploads.mangadex.org/covers/${managId}/${coverQuery.data?.attributes.fileName}.512.jpg')`,
        }}
      >
        <div className="w-full h-2/3 text-white bg-gradient-to-t from-black flex justify-end flex-col ">
          <h2 className="font-bold px-2"> {title}</h2>
          <p className="mx-2 mb-2 mt-1 rounded-full bg-stone-600 w-fit px-2 text-[0.6rem] font-semibold uppercase">
            {contentRating}
          </p>
        </div>
      </div>
    </Link>
  );
}

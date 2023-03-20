import { useQuery } from "@tanstack/react-query";
import { IMangaCardProp } from "../props/coverProp";
import { getCoverById } from "../services/apicalls";
import { ICoverData } from "../models/cover";
import { Link } from "react-router-dom";
import { ErrorComponent } from "./ErrorComponent";
import Loading from "./Loading";

export function MangaCard(props: IMangaCardProp) {
  const { managId, coverId, title, contentRating, mangaData } = props;

  const { data, isLoading, isSuccess, isError } = useQuery<ICoverData, Error>(
    ["coverQuery", coverId],
    () => getCoverById(coverId)
  );

  return (
    <div>
      {isError && <ErrorComponent />}
      {isLoading && <Loading />}
      {isSuccess && (
        <Link
          to={`../manga/${managId}`}
          state={[mangaData, data?.attributes.fileName]}
        >
          <div
            className={`m-1 flex h-72 w-52 flex-col-reverse overflow-hidden rounded-lg border-2 border-stone-900 bg-cover bg-center bg-no-repeat shadow-inner shadow-amber-500 duration-300 ease-in-out hover:border-amber-500`}
            style={{
              backgroundImage: `url('https://uploads.mangadex.org/covers/${managId}/${data?.attributes.fileName}.512.jpg')`,
            }}
          >
            <div className="flex h-2/3 w-full flex-col justify-end bg-gradient-to-t from-black text-white ">
              <h2 className="px-2 font-bold"> {title}</h2>
              <p className="mx-2 mb-2 mt-1 w-fit rounded-full bg-stone-600 px-2 text-[0.6rem] font-semibold uppercase">
                {contentRating}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

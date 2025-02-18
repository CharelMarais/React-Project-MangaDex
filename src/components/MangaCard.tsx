import { useQuery } from "@tanstack/react-query";
import { IMangaCardProp } from "../props/coverProp";
import { getCoverById } from "../services/apicalls";
import { ICoverData } from "../models/cover";
import { Link } from "react-router-dom";
import { ErrorComponent } from "./ErrorComponent";
import Loading from "./Loading";

const getProxiedImageUrl = (mangaId: string, filename: string): string => {
  const imagePath = `https://uploads.mangadex.org/covers/${mangaId}/${filename}.512.jpg`;
  
  if (import.meta.env.DEV) {
    return imagePath;
  }

  const encodedUrl = encodeURIComponent(imagePath);
  return `https://kame-house-manga.web.app/image?url=${encodedUrl}`;
};

export function MangaCard(props: IMangaCardProp) {
  const { mangaId, coverId, title, contentRating, mangaData } = props;

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
          to={`../manga/${mangaId}`}
          state={[mangaData, data?.attributes.fileName]}
        >
          <div
            className={`m-1 flex h-72 w-52 flex-col-reverse overflow-hidden rounded-lg border-2 border-secondary bg-cover bg-center bg-no-repeat shadow-inner shadow-primary duration-300 ease-in-out hover:border-primary`}
            style={{
              backgroundImage: `url(${getProxiedImageUrl(mangaId, data?.attributes.fileName)})`,
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

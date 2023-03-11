import { useQuery } from "react-query";
import { mangaCardProp } from "../props/coverProp";
import { getCoverById } from "../services/apicalls";
import { CoverData } from "../models/cover";

export function MangaCard(props: mangaCardProp) {
  const { managId, coverId, title, contentRating } = props;

  const coverQuery = useQuery<CoverData, Error>(["coverQuery"], () =>
    getCoverById(coverId)
  );

  coverQuery.refetch();

  const coverData = coverQuery.data;

  return (
    <a href={""}>
      <div
        className={`border-2 border-amber-500 shadow-amber-500 shadow-inner overflow-hidden w-72 h-96 bg-no-repeat bg-cover bg-center rounded m-1 flex flex-col-reverse`}
        style={{
          backgroundImage: `url('https://uploads.mangadex.org/covers/${managId}/${coverData?.attributes.fileName}.512.jpg')`,
        }}
      >
        <div className="w-full h-2/3 text-white bg-gradient-to-t from-black flex justify-end flex-col ">
          <h2 className="font-bold px-1"> {title}</h2>
          <p className="m-1 rounded-full bg-stone-600 w-fit px-2 text-[0.6rem] font-semibold uppercase">
            {contentRating}
          </p>
        </div>
      </div>
    </a>
  );
}

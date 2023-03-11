import { useState } from "react";
import { mangaCardProp } from "../props/coverProp";
import { getCoverById } from "../services/apicalls";

export function MangaCard(props: mangaCardProp) {
  const [coverFile, setCoverFile] = useState("");

  const { title, managId, coverId, contentRating } = props;

  getCoverById(coverId).then((res) => {
    setCoverFile(res.attributes.fileName);
  });

  if (!coverFile) return <></>;

  return (
    <div
      className={`border-2 border-amber-500 shadow-amber-500 shadow-inner overflow-hidden w-72 h-96 bg-no-repeat bg-cover bg-center rounded m-1 flex flex-col-reverse`}
      style={{
        backgroundImage: `url('https://uploads.mangadex.org/covers/${managId}/${coverFile}.512.jpg')`,
      }}
    >
      <div className="w-full h-2/3 text-white bg-gradient-to-t from-black flex justify-end flex-col ">
        <h2 className="font-bold px-1"> {title}</h2>
        <p className="m-1 rounded-full bg-stone-600 w-fit px-2 text-[0.6rem] font-semibold uppercase">
          {contentRating}
        </p>
      </div>
    </div>
  );
}

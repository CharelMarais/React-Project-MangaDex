import { useState } from "react";
import { mangaCardProp } from "../props/coverProp";
import { getCoverById } from "../services/apicalls";

export function MangaCard(props: mangaCardProp) {
  const [coverFile, setCoverFile] = useState("");

  getCoverById(
    props.data.relationships.find((items) => items.type === "cover_art")!.id
  ).then((res) => {
    setCoverFile(res.attributes.fileName);
  });

  if (!coverFile) return <></>;

  return (
    <div
      className={`border-2 border-amber-500 overflow-hidden w-72 h-96 bg-no-repeat bg-cover bg-center rounded m-1 flex flex-col-reverse`}
      style={{
        backgroundImage: `url('https://uploads.mangadex.org/covers/${props.data.id}/${coverFile}.512.jpg')`,
      }}
    >
      <div className="w-full h-2/3 text-white bg-gradient-to-t from-black flex justify-end flex-col ">
        <h2 className="font-bold px-1"> {props.data.attributes.title.en}</h2>
        <p className="m-1 rounded-full bg-stone-600 w-fit px-2 text-[0.6rem] font-semibold uppercase">
          {props.data.attributes.contentRating}
        </p>
      </div>
    </div>
  );
}

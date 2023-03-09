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
      className={`w-64 h-[22rem] bg-no-repeat bg-cover bg-center`}
      style={{
        backgroundImage: `url('https://uploads.mangadex.org/covers/${props.data.id}/${coverFile}.256.jpg')`,
      }}
    >
      <p> {props.data.attributes.title.en}</p>
    </div>
  );
}

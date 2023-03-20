function Loading() {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
      <div className=" grid h-44 w-44 content-center justify-center ">
        <img
          className="col-start-1 row-start-1 animate-pulse"
          src="/src/assets/img/aura.png"
          alt="aura"
        />
        <img
          className=" relative top-16 right-1 col-start-1 row-start-1"
          src="/src/assets/img/goku.png"
          alt="aura"
        />
      </div>
    </div>
  );
}

export default Loading;

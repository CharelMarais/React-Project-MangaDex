export function LandingPage() {
  return (
    <div className="flex max-h-full flex-grow flex-col justify-center items-center text-center text-neutral-200 px-6 pt-14 m-auto">
      <p className="font-semibold text-4xl sm:text-5xl text-center items-center flex flex-col pt-2">
        WELCOME TO
        <span className="text-amber-500 flex antialiased flex-auto items-center font-mono uppercase text-center sm:text-3xl md:text-5xl">
          K<span className="text-lg sm:text-xl md:text-2xl">ame</span> H
          <span className="text-lg sm:text-xl md:text-2xl">ouse</span>
        </span>
      </p>
      <p className="text-sm py-4 sm:text-lg sm:w-2/3">
        Welcome to the world of manga, where stories come to life through vivid
        artwork and exciting plots. We've got plenty of manga titles that will
        satisfy your cravings for epic battles, transformations, and
        unforgettable characters.
      </p>
      <img
        className="w-full aspect-auto max-w-md"
        src="src/assets/img/roshi.png"
        alt="master roshi"
      />
    </div>
  );
}

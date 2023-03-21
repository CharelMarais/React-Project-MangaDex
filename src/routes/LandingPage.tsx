import "animate.css";

export function LandingPage() {
  return (
    <div className="m-auto flex h-full flex-grow flex-col items-center justify-center px-6 pt-14 text-center text-neutral-200">
      <p className="animate__animated animate__zoomInDown flex flex-col items-center pt-2 text-center text-4xl font-semibold sm:text-5xl">
        WELCOME TO
        <span className="flex flex-auto items-center text-center font-mono uppercase text-amber-500 antialiased sm:text-3xl md:text-5xl">
          K<span className="text-lg sm:text-xl md:text-2xl">ame</span> H
          <span className="text-lg sm:text-xl md:text-2xl">ouse</span>
        </span>
      </p>
      <p className="py-4 text-sm sm:w-2/3 sm:text-lg">
        Welcome to the world of manga, where stories come to life through vivid
        artwork and exciting plots. We've got plenty of manga titles that will
        satisfy your cravings for epic battles, transformations, and
        unforgettable characters.
      </p>
      <img
        className="aspect-auto w-full max-w-md"
        src="src/assets/img/roshi.png"
        alt="master roshi"
      />
    </div>
  );
}

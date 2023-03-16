export function LandingPage() {
  return (
    <div className="flex h-full flex-grow flex-col justify-center items-center text-center text-neutral-200 pt-14">
      <p className="font-semibold text-4xl text-center items-center flex flex-col pt-2">
        Welcome To
        <span className="text-amber-500 flex antialiased flex-auto items-center font-mono uppercase text-center">
          K<span className="text-lg">ame</span> H
          <span className="text-lg">ouse</span>
        </span>
      </p>
      <p className="text-sm p-4">
        Welcome to the world of manga, where stories come to life through vivid
        artwork and exciting plots. We've got plenty of manga titles that will
        satisfy your cravings for epic battles, transformations, and
        unforgettable characters.
      </p>
      <img
        className="w-full px-6 aspect-auto"
        src="src/assets/img/roshi.png"
        alt=""
      />
    </div>
  );
}

export function ErrorComponent() {
  return (
    <div className="w-full flex justify-center items-center flex-col h-full text-neutral-200 align-middle">
      <h2 className="text-6xl font-semibold">404</h2>
      <img className="-my-4 max-w-md" src="/src/assets/img/yamcha.png" alt="" />
      <p>Sorry, an unexpected error has occurred.</p>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

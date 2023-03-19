export function ErrorComponent() {
  return (
    <div className="pt-14 flex justify-center items-center flex-col h-full text-neutral-200">
      <h2 className="text-6xl font-semibold">404</h2>
      <img className="-my-4" src="/src/assets/img/yamcha.png" alt="" />
      <p>Sorry, an unexpected error has occurred.</p>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

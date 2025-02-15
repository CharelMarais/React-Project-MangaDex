import yamchaImage from '../assets/img/yamcha.png' 

export function ErrorComponent() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center align-middle text-text">
      <h2 className="text-6xl font-semibold">404</h2>
      <img className="-my-4" src={yamchaImage} alt="" />
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Redirecting to homepage in 5 seconds...</p>
    </div>
  );
}

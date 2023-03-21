import { CSSTransition, TransitionGroup } from "react-transition-group";
import { RouterProvider, BrowserRouter, Router } from "react-router-dom";

function App({ router }: { router: Router }) {
  return (
    <TransitionGroup>
      <CSSTransition key={location.hash} classNames="fade" timeout={300}>
        <RouterProvider router={router} />
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;

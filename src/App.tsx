import Loading from "./components/loading-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MangaCardContainer } from "./components/MangaCardContainer";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <MangaCardContainer />
      </QueryClientProvider>
    </>
    // <Loading></Loading>
  );
}

export default App;

import Loading from "./components/loading-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MangaCardContainer } from "./components/MangaCardContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MangaCardContainer />
    </QueryClientProvider>
    // <Loading></Loading>
  );
}

export default App;
